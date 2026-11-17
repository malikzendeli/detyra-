// Applies every migrations/NNN_name.sql that has not run yet, in order, each in a transaction.
// Then checks that every model in src/models matches its table, so the two never drift apart.
import { readdirSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { db, DB_PATH } from './db.js'
import { models } from './models/index.js'

const migrationsDir = resolve(dirname(fileURLToPath(import.meta.url)), '../migrations')

db.exec(`CREATE TABLE IF NOT EXISTS schema_migrations (
  name       TEXT PRIMARY KEY,
  applied_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
)`)

const applied = new Set(
  db.prepare('SELECT name FROM schema_migrations').all().map((row) => row.name),
)
const files = readdirSync(migrationsDir).filter((f) => f.endsWith('.sql')).sort()

let ran = 0
for (const file of files) {
  if (applied.has(file)) continue
  const sql = readFileSync(resolve(migrationsDir, file), 'utf8')
  db.exec('BEGIN')
  try {
    db.exec(sql)
    db.prepare('INSERT INTO schema_migrations (name) VALUES (?)').run(file)
    db.exec('COMMIT')
    console.log(`  applied ${file}`)
    ran++
  } catch (err) {
    db.exec('ROLLBACK')
    console.error(`  FAILED ${file}: ${err.message}`)
    process.exit(1)
  }
}
console.log(ran ? `${ran} migration(s) applied.` : 'Database is up to date.')

// Model ↔ table check
let problems = 0
for (const model of models) {
  const columns = db.prepare(`PRAGMA table_info(${model.table})`).all().map((c) => c.name)
  if (columns.length === 0) {
    console.error(`  model ${model.name}: table "${model.table}" is missing`)
    problems++
    continue
  }
  const fields = Object.keys(model.fields)
  const missing = fields.filter((f) => !columns.includes(f))
  const extra = columns.filter((c) => !fields.includes(c))
  if (missing.length || extra.length) {
    console.error(
      `  model ${model.name}: missing in DB [${missing}] / missing in model [${extra}]`,
    )
    problems++
  }
}
if (problems) {
  console.error(`${problems} model(s) do not match the database.`)
  process.exit(1)
}
console.log(`${models.length} models match the tables in ${DB_PATH}`)
