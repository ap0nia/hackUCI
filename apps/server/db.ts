import { PrismaClient } from '@prisma/client'

/**
 * db is the database connection; use it to get data from the database
 */
const db = new PrismaClient()

export default db