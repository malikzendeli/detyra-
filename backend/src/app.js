import express from 'express'
import { db } from './db.js'

export const app = express()

app.use(express.json())

// Health check: the server is up and the database answers.
app.get('/health', (req, res) => {
  try {
    db.prepare('SELECT 1').get()
    const { count } = db
      .prepare(
        "SELECT COUNT(*) AS count FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' AND name != 'schema_migrations'",
      )
      .get()
    res.json({ status: 'ok', database: 'ok', tables: count })
  } catch (err) {
    res.status(503).json({ status: 'error', database: 'unreachable', error: err.message })
  }
})
