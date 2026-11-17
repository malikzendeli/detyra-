/** Discount code, one per order (rule 9). */
export const Coupon = {
  name: 'Coupon',
  table: 'coupons',
  fields: {
    id: 'integer, primary key',
    shop_id: 'Shop',
    code: 'text, unique per shop',
    discount_type: "'percent' | 'fixed'",
    discount_value: 'integer (percent 1-100, or money)',
    min_order_total: 'money',
    usage_limit: 'integer? (null = unlimited)',
    used_count: 'integer',
    starts_at: 'datetime?',
    expires_at: 'datetime?',
    is_active: 'boolean',
    created_at: 'datetime',
  },
  belongsTo: { shop: 'Shop' },
  hasMany: { orders: 'Order.coupon_id' },
}
