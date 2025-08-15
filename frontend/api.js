const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export async function getClients() {
  const res = await fetch(`${API_BASE}/clients`);
  return res.json();
}

export async function addClient(client) {
  const res = await fetch(`${API_BASE}/clients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(client)
  });
  return res.json();
}

export async function getInvoices() {
  const res = await fetch(`${API_BASE}/invoices`);
  return res.json();
}

export async function addInvoice(invoice, items) {
  const res = await fetch(`${API_BASE}/invoices`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ invoice, items })
  });
  return res.json();
}

export async function getInvoice(id) {
  const res = await fetch(`${API_BASE}/invoices/${id}`);
  return res.json();
}

export async function downloadInvoicePDF(id) {
  const res = await fetch(`${API_BASE}/invoices/${id}/pdf`);
  return res.blob();
}

