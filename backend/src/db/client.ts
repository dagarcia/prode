import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema.js";

function requireEnv(name: string): string {
    const v = process.env[name];
    if (v === undefined || v === "") {
        throw new Error(`Variable de entorno requerida: ${name}`);
    }
    return v;
}

const host = process.env.MYSQL_HOST ?? "127.0.0.1";
const rawPort = Number(process.env.MYSQL_PORT ?? 3306);
const port = Number.isFinite(rawPort) && rawPort > 0 ? rawPort : 3306;
const user = requireEnv("MYSQL_USER");
const password = process.env.MYSQL_PASSWORD ?? "";
const database = requireEnv("MYSQL_DATABASE");

export const pool = mysql.createPool({
    host,
    port,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
});
export const db = drizzle(pool, { schema, mode: "default" });
export async function closePool(): Promise<void> {
    await pool.end();
}