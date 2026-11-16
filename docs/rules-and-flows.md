# Tezga: Business rules and flows (part 6)

> This file is the source of truth for v1 behaviour. When code and this file disagree, fix one of them on purpose.

## Users and roles

| Role | Who | Can | Cannot |
|---|---|---|---|
| **Customer** | Anyone who opens a shop link | Browse products, add to cart, place a cash-on-delivery order, track an order with order number + phone, choose sq/mk/en | Create an account (not needed in v1); see other customers' orders |
| **Shop Owner** | The person who signs up and pays | Everything in their own shop: products, prices, stock, orders, coupons, delivery prices, shop settings, staff, billing, export data, delete the shop | See or change any other shop |
| **Shop Staff** | Invited by the owner (max 2 in v1) | Manage products and orders, change order status | Billing, settings, delete products in bulk, invite staff, delete the shop |
| **Tezga Admin** | Me (the platform operator) | See all shops, suspend/unsuspend a shop, extend trials, help with setup (only when the owner asks) | Change a shop's prices or orders without the owner's request; read customer data for any other purpose |

## Flow 1: Seller signs up and opens a shop

1. Seller opens `tezga.shop` and taps **"Hap dyqanin / Отвори продавница"**.
2. Enters: shop name, phone, email, password, country (Kosovo / North Macedonia).
3. Picks a shop address: `name.tezga.shop`. The system checks it is free and valid.
4. Gets a confirmation email and verifies it (the shop can be edited before verification, but **not published**).
5. Setup wizard (≈10 minutes): logo → currency (auto: € for Kosovo, MKD for North Macedonia) → delivery prices per city → first products (photo, name, price, stock) → Telegram alerts.
6. Taps **Publish**. The shop is live and the 14-day free trial starts.
7. Gets a "share your shop" screen with ready text for the Instagram bio and WhatsApp status.

## Flow 2: Customer places an order (cash on delivery)

1. Customer opens the shop link from Instagram/WhatsApp. Language is auto-detected and can be changed.
2. Browses, filters, opens a product, picks a variant (size/colour) and quantity → **Add to cart**.
3. Opens the cart: sees products, subtotal, optional coupon field.
4. Taps **Order**: enters first name, last name, phone, city, address, optional note.
5. The system calculates delivery (by city), applies the coupon, shows the **final total to pay at the door**.
6. Customer confirms. The system re-checks stock, reserves it and creates the order with status **New** and a number (e.g. `TZ-1042`).
7. The customer sees a confirmation page (number + "we'll call you to confirm"), and gets an email if they gave one.
8. The owner instantly receives a Telegram message with the order summary and a link to it.

## Flow 3: Owner handles the order (confirm → ship → complete / cancel)

1. Owner opens the order from the alert or the **Orders** list.
2. Calls the customer → taps **Confirm** (status: *Confirmed*) or **Cancel** with a reason.
3. Hands the package to the courier → enters the courier name and tracking code (optional) → **Shipped**.
4. Courier delivers and collects cash → owner taps **Completed**. The sale counts in statistics.
5. If the customer refuses the package → **Returned**. Stock goes back and the phone number gets a "refused" mark.
6. The customer can check the status at any time on `/porosia` with order number + phone.

## Business rules

1. **Cash on delivery is the only payment method in v1.** The price the customer sees before confirming is the exact amount they pay at the door.
2. **Stock is reserved when an order is placed**, and returned to stock automatically if the order is *Cancelled* or *Returned*.
3. **A customer cannot order more than the available stock.** Products with 0 stock show "Out of stock" and cannot be added to the cart.
4. **A customer can cancel an order themselves only while it is *New*** (not yet confirmed). After that, only the shop can cancel it.
5. **Orders not confirmed within 72 hours are cancelled automatically** and the stock is released. The owner gets a reminder at 24 h.
6. **Phone numbers must be valid for Kosovo (+383) or North Macedonia (+389)** in v1. Each phone can have at most 3 open (*New/Confirmed*) orders per shop, to block fake or spam orders.
7. **A phone number with 2 refused deliveries in the same shop is flagged** to the owner as "risky" (the owner decides; it is never blocked automatically).
8. **Delivery price comes from the shop's city list.** Cities not on the list use the "other cities" price. Delivery is free when the subtotal reaches the shop's free-delivery threshold.
9. **One coupon per order.** It must be active, not expired, under its usage limit and above its minimum order value. A coupon can never make the total negative.
10. **Prices are stored in the shop's currency (EUR or MKD)** and shown with that currency only. No conversion in v1.
11. **Free trial = 14 days.** After it ends with no payment, the shop is **paused**: customers see "temporarily closed" and the owner keeps full access to their data. Nothing is deleted.
12. **A paused or unpaid shop is deleted only after 90 days**, with email reminders at 30, 60 and 83 days. The owner can export products and orders as CSV at any time.
13. **Subscription payment in v1 is manual** (bank transfer or cash to me) and is recorded by the Tezga Admin. Monthly plans can be cancelled any time and stay active until the end of the paid month. No refunds for partial months.
14. **Shop addresses (`name.tezga.shop`)** are 3–30 characters, letters/numbers/hyphens only, unique, and cannot be changed more than once per 30 days.
15. **Customer data belongs to the shop.** Tezga never contacts a shop's customers for marketing and never shares their data between shops.
16. **Age-restricted categories** (e.g. vapes, alcohol) require the shop to turn on the 18+ confirmation screen. Selling illegal products gets the shop suspended.

## What version 1 will NOT do

- ❌ **No online card payments** (no Stripe/PayPal/bank card). COD only.
- ❌ No customer accounts, wishlists or reviews.
- ❌ No courier API integration (no automatic labels or tracking sync). The owner types the tracking code.
- ❌ No SMS and no WhatsApp Business API messages. Alerts go through Telegram + email only.
- ❌ No custom domains (`myshop.com`). Only `name.tezga.shop`.
- ❌ No multi-currency, no shipping abroad, no diaspora pricing.
- ❌ No marketplace / shared catalogue between shops.
- ❌ No native mobile app. The admin panel is a mobile-friendly web page.
- ❌ No fiscal receipts / tax integration (ATK, UJP). The seller stays responsible for this.
- ❌ No AI features in the first release (AI product descriptions come after the first 10 shops).
