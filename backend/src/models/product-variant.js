/** Size/colour option of a product. Stock lives here (rules 2-3). */
export const ProductVariant = {
  name: 'ProductVariant',
  table: 'product_variants',
  fields: {
    id: 'integer, primary key',
    product_id: 'Product',
    size: 'text?',
    color: 'text?',
    sku: 'text?',
    stock: 'integer >= 0',
    price: 'money? (null = product price)',
  },
  belongsTo: { product: 'Product' },
  hasMany: { orderItems: 'OrderItem.variant_id' },
}
