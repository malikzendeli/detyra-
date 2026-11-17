/** Someone who logs in: shop owner, shop staff or the Tezga admin. Customers have no account in v1. */
export const User = {
  name: 'User',
  table: 'users',
  fields: {
    id: 'integer, primary key',
    email: 'text, unique (case-insensitive)',
    password_hash: 'text',
    full_name: 'text',
    phone: 'text?',
    is_tezga_admin: 'boolean',
    email_verified_at: 'datetime?',
    created_at: 'datetime',
  },
  hasMany: { memberships: 'ShopMember.user_id', paymentsRecorded: 'Payment.recorded_by' },
}
