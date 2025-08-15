import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from './routes/clients.js';
import invoiceRoutes from './routes/invoices.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/clients', clientRoutes);
app.use('/api/invoices', invoiceRoutes);

app.get('/', (req, res) => res.send('Invoice Generator API running'));

app.listen(PORT, () => {
  console.log(`Invoice backend running on http://localhost:${PORT}`);
});
