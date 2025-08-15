import { pool } from './db.js';

export async function getClients() {
  const [rows] = await pool.query('SELECT * FROM clients');
  return rows;
}

export async function addClient(client) {
  const { name, email, address } = client;
  const [result] = await pool.query('INSERT INTO clients (name, email, address) VALUES (?, ?, ?)', [name, email, address]);
  return result.insertId;
}
