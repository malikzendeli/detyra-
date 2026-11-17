-- 001_init: first Tezga schema. Source: docs/rules-and-flows.md, drawn in docs/data-model.md.
-- Conventions:
--   * money = INTEGER in minor units (EUR cents, MKD deni: 15.00 € = 1500). Currency comes from the shop.
--   * dates = TEXT, ISO 8601 UTC ("2026-11-17T10:00:00Z")
--   * booleans = INTEGER 0/1
--   * texts shown to customers have one column per language: _sq, _mk, _en

-- People who log in: shop owners, staff, and the Tezga admin. Customers have no account (v1).
CREATE TABLE users (
  id                INTEGER PRIMARY KEY,
  email             TEXT    NOT NULL UNIQUE COLLATE NOCASE,
  password_hash     TEXT    NOT NULL,
  full_name         TEXT    NOT NULL,
  phone             TEXT,
  is_tezga_admin    INTEGER NOT NULL DEFAULT 0 CHECK (is_tezga_admin IN (0, 1)),
  email_verified_at TEXT,
  created_at        TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

-- One online shop at name.tezga.shop (rule 14 for the slug, rules 11–12 for status).
CREATE TABLE shops (
  id                          INTEGER PRIMARY KEY,
  slug                        TEXT    NOT NULL UNIQUE
                                CHECK (length(slug) BETWEEN 3 AND 30
                                       AND slug NOT GLOB '*[^a-z0-9-]*'),
  slug_changed_at             TEXT,
  name                        TEXT    NOT NULL,
  country                     TEXT    NOT NULL CHECK (country IN ('XK', 'MK')),
  currency                    TEXT    NOT NULL CHECK (currency IN ('EUR', 'MKD')),
  phone                       TEXT,
  logo_url                    TEXT,
  default_language            TEXT    NOT NULL DEFAULT 'sq' CHECK (default_language IN ('sq', 'mk', 'en')),
  status                      TEXT    NOT NULL DEFAULT 'draft'
                                CHECK (status IN ('draft', 'trial', 'active', 'paused', 'suspended')),
  published_at                TEXT,
  trial_ends_at               TEXT,
  paid_until                  TEXT,
  paused_at                   TEXT,
  other_cities_delivery_price INTEGER NOT NULL DEFAULT 0 CHECK (other_cities_delivery_price >= 0),
  free_delivery_threshold     INTEGER CHECK (free_delivery_threshold >= 0),
  telegram_chat_id            TEXT,
  age_check_enabled           INTEGER NOT NULL DEFAULT 0 CHECK (age_check_enabled IN (0, 1)),
  created_at                  TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

-- Who can manage a shop: exactly one owner, at most 2 staff (limit enforced in the app).
CREATE TABLE shop_members (
  id         INTEGER PRIMARY KEY,
  shop_id    INTEGER NOT NULL REFERENCES shops (id) ON DELETE CASCADE,
  user_id    INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  role       TEXT    NOT NULL CHECK (role IN ('owner', 'staff')),
  created_at TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  UNIQUE (shop_id, user_id)
);
CREATE UNIQUE INDEX one_owner_per_shop ON shop_members (shop_id) WHERE role = 'owner';
CREATE INDEX shop_members_user ON shop_members (user_id);

CREATE TABLE categories (
  id         INTEGER PRIMARY KEY,
  shop_id    INTEGER NOT NULL REFERENCES shops (id) ON DELETE CASCADE,
  name_sq    TEXT    NOT NULL,
  name_mk    TEXT,
  name_en    TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX categories_shop ON categories (shop_id);

CREATE TABLE products (
  id             INTEGER PRIMARY KEY,
  shop_id        INTEGER NOT NULL REFERENCES shops (id) ON DELETE CASCADE,
  category_id    INTEGER REFERENCES categories (id) ON DELETE SET NULL,
  name_sq        TEXT    NOT NULL,
  name_mk        TEXT,
  name_en        TEXT,
  description_sq TEXT,
  description_mk TEXT,
  description_en TEXT,
  price          INTEGER NOT NULL CHECK (price >= 0),
  is_active      INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1)),
  created_at     TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  updated_at     TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);
CREATE INDEX products_shop ON products (shop_id);
CREATE INDEX products_category ON products (category_id);

CREATE TABLE product_images (
  id         INTEGER PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products (id) ON DELETE CASCADE,
  url        TEXT    NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX product_images_product ON product_images (product_id);

-- Size/colour option. Stock lives here (rules 2–3). Every product has at least one variant.
CREATE TABLE product_variants (
  id         INTEGER PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products (id) ON DELETE CASCADE,
  size       TEXT,
  color      TEXT,
  sku        TEXT,
  stock      INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  price      INTEGER CHECK (price >= 0) -- NULL = use the product price
);
CREATE INDEX product_variants_product ON product_variants (product_id);

-- Delivery price per city (rule 8). Cities not listed use shops.other_cities_delivery_price.
CREATE TABLE delivery_prices (
  id      INTEGER PRIMARY KEY,
  shop_id INTEGER NOT NULL REFERENCES shops (id) ON DELETE CASCADE,
  city    TEXT    NOT NULL COLLATE NOCASE,
  price   INTEGER NOT NULL CHECK (price >= 0),
  UNIQUE (shop_id, city)
);

-- Rule 9: one coupon per order, active, not expired, under limit, above minimum.
CREATE TABLE coupons (
  id              INTEGER PRIMARY KEY,
  shop_id         INTEGER NOT NULL REFERENCES shops (id) ON DELETE CASCADE,
  code            TEXT    NOT NULL COLLATE NOCASE,
  discount_type   TEXT    NOT NULL CHECK (discount_type IN ('percent', 'fixed')),
  discount_value  INTEGER NOT NULL CHECK (discount_value > 0),
  min_order_total INTEGER NOT NULL DEFAULT 0 CHECK (min_order_total >= 0),
  usage_limit     INTEGER CHECK (usage_limit > 0), -- NULL = unlimited
  used_count      INTEGER NOT NULL DEFAULT 0 CHECK (used_count >= 0),
  starts_at       TEXT,
  expires_at      TEXT,
  is_active       INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1)),
  created_at      TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  UNIQUE (shop_id, code),
  CHECK (discount_type <> 'percent' OR discount_value <= 100)
);

-- A customer's phone number as seen by one shop (rules 6–7: max 3 open orders, "risky" after 2 refusals).
CREATE TABLE customer_phones (
  id            INTEGER PRIMARY KEY,
  shop_id       INTEGER NOT NULL REFERENCES shops (id) ON DELETE CASCADE,
  phone         TEXT    NOT NULL CHECK (phone GLOB '+383*' OR phone GLOB '+389*'),
  refused_count INTEGER NOT NULL DEFAULT 0 CHECK (refused_count >= 0),
  created_at    TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  UNIQUE (shop_id, phone)
);

-- A cash-on-delivery order (flows 2 and 3). Totals are frozen at order time.
CREATE TABLE orders (
  id                INTEGER PRIMARY KEY,
  shop_id           INTEGER NOT NULL REFERENCES shops (id) ON DELETE CASCADE,
  customer_phone_id INTEGER NOT NULL REFERENCES customer_phones (id),
  coupon_id         INTEGER REFERENCES coupons (id) ON DELETE SET NULL,
  number            TEXT    NOT NULL, -- e.g. TZ-1042
  status            TEXT    NOT NULL DEFAULT 'new'
                      CHECK (status IN ('new', 'confirmed', 'shipped', 'completed', 'cancelled', 'returned')),
  first_name        TEXT    NOT NULL,
  last_name         TEXT    NOT NULL,
  phone             TEXT    NOT NULL,
  email             TEXT,
  city              TEXT    NOT NULL,
  address           TEXT    NOT NULL,
  note              TEXT,
  language          TEXT    NOT NULL DEFAULT 'sq' CHECK (language IN ('sq', 'mk', 'en')),
  subtotal          INTEGER NOT NULL CHECK (subtotal >= 0),
  delivery_price    INTEGER NOT NULL DEFAULT 0 CHECK (delivery_price >= 0),
  discount          INTEGER NOT NULL DEFAULT 0 CHECK (discount >= 0),
  total             INTEGER NOT NULL CHECK (total >= 0),
  courier_name      TEXT,
  tracking_code     TEXT,
  cancel_reason     TEXT,
  cancelled_by      TEXT CHECK (cancelled_by IN ('customer', 'shop', 'system')),
  reminder_sent_at  TEXT,
  created_at        TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  confirmed_at      TEXT,
  shipped_at        TEXT,
  completed_at      TEXT,
  cancelled_at      TEXT,
  returned_at       TEXT,
  UNIQUE (shop_id, number),
  CHECK (total = subtotal + delivery_price - discount)
);
CREATE INDEX orders_shop_status ON orders (shop_id, status);
CREATE INDEX orders_customer_phone ON orders (customer_phone_id);

-- Order lines keep a copy of name and price so later product edits do not change old orders.
CREATE TABLE order_items (
  id            INTEGER PRIMARY KEY,
  order_id      INTEGER NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
  product_id    INTEGER REFERENCES products (id) ON DELETE SET NULL,
  variant_id    INTEGER REFERENCES product_variants (id) ON DELETE SET NULL,
  product_name  TEXT    NOT NULL,
  variant_label TEXT,
  unit_price    INTEGER NOT NULL CHECK (unit_price >= 0),
  quantity      INTEGER NOT NULL CHECK (quantity > 0),
  line_total    INTEGER NOT NULL CHECK (line_total = unit_price * quantity)
);
CREATE INDEX order_items_order ON order_items (order_id);

-- Subscription payments, recorded by hand by the Tezga admin (rule 13). Always in EUR.
CREATE TABLE payments (
  id           INTEGER PRIMARY KEY,
  shop_id      INTEGER NOT NULL REFERENCES shops (id) ON DELETE CASCADE,
  recorded_by  INTEGER NOT NULL REFERENCES users (id),
  plan         TEXT    NOT NULL CHECK (plan IN ('monthly', 'yearly', 'founding', 'setup')),
  amount       INTEGER NOT NULL CHECK (amount > 0),
  method       TEXT    NOT NULL CHECK (method IN ('bank_transfer', 'cash')),
  period_start TEXT,
  period_end   TEXT,
  note         TEXT,
  created_at   TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);
CREATE INDEX payments_shop ON payments (shop_id);
