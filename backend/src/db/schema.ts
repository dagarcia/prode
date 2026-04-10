import { mysqlTable, int, varchar, timestamp, uniqueIndex } from "drizzle-orm/mysql-core";

export const ejemplo = mysqlTable(
  "usuario", {
    id: int("id").primaryKey().autoincrement(),
    nombreUsuario: varchar("nombre_usuario", { length: 255 }).notNull(),
    email: varchar("email", { length: 320 }).notNull(),
    passwordHash: varchar("password_hash", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),

}, (table) => ({
    emailUnique: uniqueIndex("ix_email_unique").on(table.email),
    nombreUsuarioUnique: uniqueIndex("ix_nombre_usuario_unique").on(table.nombreUsuario),
  })
);