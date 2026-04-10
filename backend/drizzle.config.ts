import { fileURLToPath } from "url"
import { config } from "dotenv"
import { resolve } from "path"
import { defineConfig } from "drizzle-kit"

const __dirname = fileURLToPath(import.meta.url)

config({ path: resolve(__dirname, "..", ".env") })
config({ path: resolve(__dirname, ".env") })

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})