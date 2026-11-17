export const Category = {
  name: 'Category',
  table: 'categories',
  fields: {
    id: 'integer, primary key',
    shop_id: 'Shop',
    name_sq: 'text',
    name_mk: 'text?',
    name_en: 'text?',
    sort_order: 'integer',
  },
  belongsTo: { shop: 'Shop' },
  hasMany: { products: 'Product.category_id' },
}
