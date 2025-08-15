import express from 'express';
import { getInvoices, getInvoice, addInvoice } from '../models/invoice.js';
import { getInvoiceItems } from '../models/invoiceItem.js';
import { generateInvoicePDF } from '../utils/pdf.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const invoices = await getInvoices();
  res.json(invoices);
});

router.get('/:id', async (req, res) => {
  const invoice = await getInvoice(req.params.id);
  const items = await getInvoiceItems(req.params.id);
  res.json({ ...invoice, items });
});

router.post('/', async (req, res) => {
  const { invoice, items } = req.body;
  const id = await addInvoice(invoice, items);
  res.json({ id });
});

router.get('/:id/pdf', async (req, res) => {
  const invoice = await getInvoice(req.params.id);
  const items = await getInvoiceItems(req.params.id);
  const pdfBuffer = await generateInvoicePDF(invoice, items);
  res.setHeader('Content-Type', 'application/pdf');
  res.send(pdfBuffer);
});

export default router;
