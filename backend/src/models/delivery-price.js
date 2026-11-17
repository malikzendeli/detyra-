/** Delivery price for one city (rule 8). */
export const DeliveryPrice = {
  name: 'DeliveryPrice',
  table: 'delivery_prices',
  fields: {
    id: 'integer, primary key',
    shop_id: 'Shop',
    city: 'text, unique per shop',
    price: 'money',
  },
  belongsTo: { shop: 'Shop' },
}
