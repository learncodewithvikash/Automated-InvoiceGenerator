import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getInvoices } from "../api";

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    getInvoices()
      .then(setInvoices)
      .finally(() => setLoading(false));
  }, []);

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.client_id?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id?.toString().includes(searchTerm);
    const matchesStatus = statusFilter === "all" || invoice.status?.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalAmount = invoices.reduce((sum, inv) => sum + (parseFloat(inv.total) || 0), 0);
  const paidAmount = invoices.filter(inv => inv.status === "Paid").reduce((sum, inv) => sum + (parseFloat(inv.total) || 0), 0);
  const unpaidAmount = totalAmount - paidAmount;

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <div className="text-center">
          <div className="loading-spinner mb-3"></div>
          <p className="text-muted">Loading invoices...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <div className="hero-section glass-card mb-5">
        <div className="hero-content">
          <h1 className="display-4 fw-bold mb-3">
            <i className="fas fa-file-invoice-dollar me-3"></i>
            Invoice Dashboard
          </h1>
          <p className="lead mb-4">Manage all your healthcare invoices in one place</p>
          <Link to="/create-invoice" className="btn btn-light btn-lg rounded-pill px-4 py-3">
            <i className="fas fa-plus me-2"></i>Create New Invoice
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-5">
        <div className="col-md-4 mb-3">
          <div className="glass-card p-4 text-center slide-up">
            <div className="text-primary mb-2">
              <i className="fas fa-file-invoice fs-1"></i>
            </div>
            <h3 className="fw-bold text-primary">{invoices.length}</h3>
            <p className="text-muted mb-0">Total Invoices</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="glass-card p-4 text-center slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="text-success mb-2">
              <i className="fas fa-dollar-sign fs-1"></i>
            </div>
            <h3 className="fw-bold text-success">${paidAmount.toFixed(2)}</h3>
            <p className="text-muted mb-0">Paid Amount</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="glass-card p-4 text-center slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-warning mb-2">
              <i className="fas fa-clock fs-1"></i>
            </div>
            <h3 className="fw-bold text-warning">${unpaidAmount.toFixed(2)}</h3>
            <p className="text-muted mb-0">Pending Amount</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 mb-4 bounce-in">
        <div className="row align-items-center">
          <div className="col-md-6 mb-3 mb-md-0">
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0">
                <i className="fas fa-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control-modern border-start-0"
                placeholder="Search by invoice ID or client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <select
              className="form-control-modern"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="glass-card overflow-hidden bounce-in">
        <div className="p-4 border-bottom">
          <h4 className="mb-0 d-flex align-items-center">
            <i className="fas fa-list me-2 text-primary"></i>
            Recent Invoices
            <span className="badge bg-primary ms-2">{filteredInvoices.length}</span>
          </h4>
        </div>
        
        {filteredInvoices.length === 0 ? (
          <div className="text-center py-5">
            <i className="fas fa-inbox fs-1 text-muted mb-3 d-block"></i>
            <h5 className="text-muted">No invoices found</h5>
            <p className="text-muted">Create your first invoice to get started</p>
            <Link to="/create-invoice" className="btn btn-modern">
              <i className="fas fa-plus me-2"></i>Create Invoice
            </Link>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-modern mb-0">
              <thead>
                <tr>
                  <th className="border-0 fw-bold">
                    <i className="fas fa-hashtag me-2"></i>ID
                  </th>
                  <th className="border-0 fw-bold">
                    <i className="fas fa-user me-2"></i>Client
                  </th>
                  <th className="border-0 fw-bold">
                    <i className="fas fa-calendar me-2"></i>Date
                  </th>
                  <th className="border-0 fw-bold">
                    <i className="fas fa-dollar-sign me-2"></i>Total
                  </th>
                  <th className="border-0 fw-bold">
                    <i className="fas fa-info-circle me-2"></i>Status
                  </th>
                  <th className="border-0 fw-bold">
                    <i className="fas fa-cogs me-2"></i>Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((inv, index) => (
                  <tr key={inv.id} style={{ animationDelay: `${index * 0.05}s` }} className="fade-in">
                    <td className="fw-bold text-primary">#{inv.id}</td>
                    <td>{inv.client_id}</td>
                    <td>{new Date(inv.date).toLocaleDateString()}</td>
                    <td className="fw-bold">${parseFloat(inv.total || 0).toFixed(2)}</td>
                    <td>
                      <span className={`status-badge ${inv.status === 'Paid' ? 'status-paid' : 'status-unpaid'}`}>
                        <i className={`fas ${inv.status === 'Paid' ? 'fa-check-circle' : 'fa-clock'} me-1`}></i>
                        {inv.status}
                      </span>
                    </td>
                    <td>
                      <Link to={`/view-invoice/${inv.id}`} className="btn btn-sm btn-modern me-2">
                        <i className="fas fa-eye me-1"></i>View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <Link to="/create-invoice" className="floating-action">
        <i className="fas fa-plus"></i>
      </Link>
    </div>
  );
}
