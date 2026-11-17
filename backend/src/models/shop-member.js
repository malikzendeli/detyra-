/** Links a User to a Shop as 'owner' (exactly one) or 'staff' (max 2, checked in the app). */
export const ShopMember = {
  name: 'ShopMember',
  table: 'shop_members',
  fields: {
    id: 'integer, primary key',
    shop_id: 'Shop',
    user_id: 'User',
    role: "'owner' | 'staff'",
    created_at: 'datetime',
  },
  belongsTo: { shop: 'Shop', user: 'User' },
}
