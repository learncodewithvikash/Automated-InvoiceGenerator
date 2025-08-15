import { pool } from './db.js';

export async function getInvoiceItems(invoice_id) {
  const [rows] = await pool.query('SELECT * FROM invoice_items WHERE invoice_id = ?', [invoice_id]);
  return rows;
}
