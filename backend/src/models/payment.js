/** A subscription payment, recorded by hand by the Tezga admin (rule 13). Always EUR. */
export const Payment = {
  name: 'Payment',
  table: 'payments',
  fields: {
    id: 'integer, primary key',
    shop_id: 'Shop',
    recorded_by: 'User (Tezga admin)',
    plan: "'monthly' | 'yearly' | 'founding' | 'setup'",
    amount: 'money (EUR cents)',
    method: "'bank_transfer' | 'cash'",
    period_start: 'datetime?',
    period_end: 'datetime?',
    note: 'text?',
    created_at: 'datetime',
  },
  belongsTo: { shop: 'Shop', recordedBy: 'User' },
}
