/** One line of an order. Name and price are copied, so editing a product never changes old orders. */
export const OrderItem = {
  name: 'OrderItem',
  table: 'order_items',
  fields: {
    id: 'integer, primary key',
    order_id: 'Order',
    product_id: 'Product?',
    variant_id: 'ProductVariant?',
    product_name: 'text',
    variant_label: 'text?',
    unit_price: 'money',
    quantity: 'integer > 0',
    line_total: 'money = unit_price x quantity',
  },
  belongsTo: { order: 'Order', product: 'Product', variant: 'ProductVariant' },
}
