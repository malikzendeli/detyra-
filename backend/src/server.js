import { app } from './app.js'
import { DB_PATH } from './db.js'

const PORT = Number(process.env.PORT) || 3001

app.listen(PORT, () => {
  console.log(`Tezga API on http://localhost:${PORT}  (health: /health, db: ${DB_PATH})`)
})
