import { pool } from './db.js';

export async function getInvoices() {
  const [rows] = await pool.query('SELECT * FROM invoices');
  return rows;
}

export async function getInvoice(id) {
  const [rows] = await pool.query('SELECT * FROM invoices WHERE id = ?', [id]);
  return rows[0];
}

export async function addInvoice(invoice, items) {
  const { client_id, date, total, tax, status } = invoice;
  const [result] = await pool.query('INSERT INTO invoices (client_id, date, total, tax, status) VALUES (?, ?, ?, ?, ?)', [client_id, date, total, tax, status]);
  const invoiceId = result.insertId;
  for (const item of items) {
    await pool.query('INSERT INTO invoice_items (invoice_id, description, quantity, price) VALUES (?, ?, ?, ?)', [invoiceId, item.description, item.quantity, item.price]);
  }
  return invoiceId;
}
