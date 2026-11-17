export const ProductImage = {
  name: 'ProductImage',
  table: 'product_images',
  fields: {
    id: 'integer, primary key',
    product_id: 'Product',
    url: 'text',
    sort_order: 'integer',
  },
  belongsTo: { product: 'Product' },
}
