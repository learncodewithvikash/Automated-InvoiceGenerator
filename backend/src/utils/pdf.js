import PDFDocument from 'pdfkit';

export function generateInvoicePDF(invoice, items) {
  return new Promise((resolve) => {
    const doc = new PDFDocument();
    const buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      resolve(Buffer.concat(buffers));
    });
    doc.fontSize(20).text('Invoice', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Invoice ID: ${invoice.id}`);
    doc.text(`Date: ${invoice.date}`);
    doc.text(`Client: ${invoice.client_id}`);
    doc.text(`Status: ${invoice.status}`);
    doc.moveDown();
    doc.text('Items:');
    items.forEach(item => {
      doc.text(`${item.description} - ${item.quantity} x $${item.price}`);
    });
    doc.moveDown();
    doc.text(`Tax: $${invoice.tax}`);
    doc.text(`Total: $${invoice.total}`);
    doc.end();
  });
}
