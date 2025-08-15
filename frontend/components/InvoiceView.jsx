import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getInvoice, downloadInvoicePDF } from "../api";

export default function InvoiceView({ id }) {
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    getInvoice(id)
      .then(setInvoice)
      .catch(error => {
        console.error('Error fetching invoice:', error);
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function handleDownload() {
    setDownloading(true);
    try {
      const blob = await downloadInvoicePDF(id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `healthcare-invoice-${id}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    } finally {
      setDownloading(false);
    }
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <div className="text-center">
          <div className="loading-spinner mb-3"></div>
          <p className="text-muted">Loading invoice details...</p>
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="glass-card p-5 text-center">
        <i className="fas fa-exclamation-triangle fs-1 text-warning mb-3 d-block"></i>
        <h4 className="text-muted">Invoice Not Found</h4>
        <p className="text-muted mb-4">The requested invoice could not be found.</p>
        <Link to="/" className="btn btn-modern">
          <i className="fas fa-arrow-left me-2"></i>Back to Dashboard
        </Link>
      </div>
    );
  }

  const subtotal = invoice.items?.reduce((sum, item) => sum + (item.quantity * item.price), 0) || 0;

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="glass-card p-4 mb-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <button 
              className="btn btn-outline-secondary me-3" 
              onClick={() => navigate('/')}
            >
              <i className="fas fa-arrow-left me-2"></i>Back
            </button>
            <span className="text-muted">Invoice Details</span>
          </div>
          <div className="col-md-6 text-md-end">
            <button 
              className="btn btn-modern" 
              onClick={handleDownload}
              disabled={downloading}
            >
              {downloading ? (
                <>
                  <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                  Downloading...
                </>
              ) : (
                <>
                  <i className="fas fa-download me-2"></i>Download PDF
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Invoice Header */}
        <div className="col-lg-8">
          <div className="glass-card p-5 mb-4 slide-up">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-4">
                  <h1 className="display-6 fw-bold text-primary mb-3">
                    <i className="fas fa-file-invoice me-3"></i>
                    Invoice #{invoice.id}
                  </h1>
                  <div className="mb-2">
                    <span className={`status-badge ${invoice.status === 'Paid' ? 'status-paid' : 'status-unpaid'}`}>
                      <i className={`fas ${invoice.status === 'Paid' ? 'fa-check-circle' : 'fa-clock'} me-1`}></i>
                      {invoice.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-6 text-md-end">
                <div className="glass-card p-3 bg-light">
                  <h6 className="text-muted mb-1">Healthcare Management System</h6>
                  <small className="text-muted">Professional Healthcare Services</small>
                </div>
              </div>
            </div>

            <hr className="my-4" />

            <div className="row">
              <div className="col-md-6">
                <h6 className="fw-bold text-primary mb-3">
                  <i className="fas fa-user me-2"></i>Bill To:
                </h6>
                <div className="glass-card p-3">
                  <h6 className="fw-bold">{invoice.client_id}</h6>
                  <small className="text-muted">Client ID: {invoice.client_id}</small>
                </div>
              </div>
              <div className="col-md-6">
                <h6 className="fw-bold text-primary mb-3">
                  <i className="fas fa-info-circle me-2"></i>Invoice Details:
                </h6>
                <div className="glass-card p-3">
                  <div className="row">
                    <div className="col-6">
                      <small className="text-muted">Invoice Date:</small>
                      <div className="fw-medium">{new Date(invoice.date).toLocaleDateString()}</div>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Due Date:</small>
                      <div className="fw-medium">{new Date(new Date(invoice.date).getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="glass-card overflow-hidden mb-4 bounce-in">
            <div className="p-4 border-bottom">
              <h5 className="mb-0 fw-bold text-primary">
                <i className="fas fa-list me-2"></i>Services & Items
              </h5>
            </div>
            
            <div className="table-responsive">
              <table className="table table-modern mb-0">
                <thead>
                  <tr>
                    <th className="border-0 fw-bold">Description</th>
                    <th className="border-0 fw-bold text-center">Quantity</th>
                    <th className="border-0 fw-bold text-end">Unit Price</th>
                    <th className="border-0 fw-bold text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items?.map((item, i) => (
                    <tr key={i} className="fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                      <td className="fw-medium">{item.description}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-end">${parseFloat(item.price || 0).toFixed(2)}</td>
                      <td className="text-end fw-bold text-primary">${(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Invoice Summary */}
        <div className="col-lg-4">
          <div className="glass-card p-4 sticky-top slide-up" style={{ top: '120px', animationDelay: '0.3s' }}>
            <h5 className="fw-bold text-primary mb-4">
              <i className="fas fa-calculator me-2"></i>Invoice Summary
            </h5>
            
            <div className="mb-3">
              <div className="d-flex justify-content-between py-2 border-bottom">
                <span>Subtotal:</span>
                <span className="fw-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between py-2 border-bottom">
                <span>Tax/GST:</span>
                <span className="fw-medium">${parseFloat(invoice.tax || 0).toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between py-3 fs-5 border-bottom">
                <span className="fw-bold">Total Amount:</span>
                <span className="fw-bold text-primary">${parseFloat(invoice.total || 0).toFixed(2)}</span>
              </div>
            </div>

            <div className="text-center">
              <div className="glass-card p-3 mb-3">
                <small className="text-muted d-block">Payment Status</small>
                <span className={`status-badge ${invoice.status === 'Paid' ? 'status-paid' : 'status-unpaid'} mt-2`}>
                  <i className={`fas ${invoice.status === 'Paid' ? 'fa-check-circle' : 'fa-clock'} me-1`}></i>
                  {invoice.status}
                </span>
              </div>
              
              <div className="d-grid gap-2">
                <button 
                  className="btn btn-modern" 
                  onClick={handleDownload}
                  disabled={downloading}
                >
                  {downloading ? (
                    <>
                      <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-download me-2"></i>Download PDF
                    </>
                  )}
                </button>
                
                <Link to="/" className="btn btn-outline-secondary">
                  <i className="fas fa-list me-2"></i>View All Invoices
                </Link>
              </div>
            </div>

            <hr className="my-4" />

            <div className="text-center">
              <small className="text-muted">
                <i className="fas fa-info-circle me-1"></i>
                Need help? Contact support
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
