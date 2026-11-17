/** A customer phone number as seen by one shop. Rule 6 (max 3 open orders) and rule 7 (risky after 2 refusals). */
export const CustomerPhone = {
  name: 'CustomerPhone',
  table: 'customer_phones',
  fields: {
    id: 'integer, primary key',
    shop_id: 'Shop',
    phone: 'text, +383... or +389..., unique per shop',
    refused_count: 'integer',
    created_at: 'datetime',
  },
  belongsTo: { shop: 'Shop' },
  hasMany: { orders: 'Order.customer_phone_id' },
}
