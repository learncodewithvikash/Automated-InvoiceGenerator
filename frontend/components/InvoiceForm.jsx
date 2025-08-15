import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addInvoice } from "../api";

export default function InvoiceForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    client_name: "", 
    date: new Date().toISOString().split('T')[0], 
    tax: 0, 
    status: "Unpaid" 
  });
  const [items, setItems] = useState([{ description: "", quantity: 1, price: 0 }]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleItemChange(i, e) {
    const newItems = [...items];
    const value = e.target.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
    newItems[i][e.target.name] = value;
    setItems(newItems);
  }

  function addItem() {
    setItems([...items, { description: "", quantity: 1, price: 0 }]);
  }

  function removeItem(i) {
    if (items.length > 1) {
      setItems(items.filter((_, idx) => idx !== i));
    }
  }

  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const total = subtotal + Number(form.tax);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await addInvoice({ ...form, total }, items);
      setSuccess(true);
      
      setTimeout(() => {
        navigate(`/view-invoice/${response.id}`);
      }, 2000);
    } catch (error) {
      console.error('Error creating invoice:', error);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="glass-card p-5 text-center bounce-in">
        <div className="text-success mb-4">
          <i className="fas fa-check-circle fs-1"></i>
        </div>
        <h3 className="text-success fw-bold mb-3">Invoice Created Successfully!</h3>
        <p className="text-muted mb-4">Redirecting to invoice view...</p>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="glass-card p-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-primary mb-3">
            <i className="fas fa-file-invoice-dollar me-3"></i>
            Create New Invoice
          </h2>
          <p className="text-muted">Fill in the details below to generate a professional invoice</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Client Information */}
            <div className="col-lg-6 mb-4">
              <div className="glass-card p-4 h-100">
                <h5 className="fw-bold text-primary mb-3">
                  <i className="fas fa-user me-2"></i>Client Information
                </h5>
                
                <div className="mb-3">
                  <label className="form-label fw-medium">
                    <i className="fas fa-user me-2 text-muted"></i>Client Name
                  </label>
                  <input 
                    className="form-control-modern" 
                    name="client_name" 
                    value={form.client_name} 
                    onChange={handleChange} 
                    placeholder="Enter client name"
                    required 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-medium">
                    <i className="fas fa-calendar me-2 text-muted"></i>Invoice Date
                  </label>
                  <input 
                    type="date" 
                    className="form-control-modern" 
                    name="date" 
                    value={form.date} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-medium">
                      <i className="fas fa-percentage me-2 text-muted"></i>Tax/GST ($)
                    </label>
                    <input 
                      type="number" 
                      step="0.01"
                      className="form-control-modern" 
                      name="tax" 
                      value={form.tax} 
                      onChange={handleChange} 
                      placeholder="0.00"
                      min="0"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-medium">
                      <i className="fas fa-info-circle me-2 text-muted"></i>Status
                    </label>
                    <select 
                      className="form-control-modern" 
                      name="status" 
                      value={form.status} 
                      onChange={handleChange}
                    >
                      <option value="Unpaid">Unpaid</option>
                      <option value="Paid">Paid</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Summary */}
            <div className="col-lg-6 mb-4">
              <div className="glass-card p-4 h-100">
                <h5 className="fw-bold text-primary mb-3">
                  <i className="fas fa-calculator me-2"></i>Invoice Summary
                </h5>
                
                <div className="d-flex justify-content-between py-2 border-bottom">
                  <span>Subtotal:</span>
                  <span className="fw-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between py-2 border-bottom">
                  <span>Tax/GST:</span>
                  <span className="fw-bold">${Number(form.tax).toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between py-3 fs-5">
                  <span className="fw-bold">Total:</span>
                  <span className="fw-bold text-primary">${total.toFixed(2)}</span>
                </div>

                <div className="text-center mt-4">
                  <div className="p-3 bg-light rounded-3">
                    <small className="text-muted">Total Items: {items.length}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div className="glass-card p-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold text-primary mb-0">
                <i className="fas fa-list me-2"></i>Invoice Items
              </h5>
              <button 
                type="button" 
                className="btn btn-secondary-modern" 
                onClick={addItem}
              >
                <i className="fas fa-plus me-2"></i>Add Item
              </button>
            </div>

            {items.map((item, i) => (
              <div className="glass-card p-3 mb-3 slide-up" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="row align-items-center">
                  <div className="col-md-5 mb-3 mb-md-0">
                    <label className="form-label fw-medium small">Description</label>
                    <input 
                      className="form-control-modern" 
                      name="description" 
                      placeholder="Service or product description" 
                      value={item.description} 
                      onChange={e => handleItemChange(i, e)} 
                      required 
                    />
                  </div>
                  <div className="col-md-2 mb-3 mb-md-0">
                    <label className="form-label fw-medium small">Quantity</label>
                    <input 
                      type="number" 
                      className="form-control-modern" 
                      name="quantity" 
                      placeholder="1" 
                      value={item.quantity} 
                      onChange={e => handleItemChange(i, e)} 
                      min="1"
                      required 
                    />
                  </div>
                  <div className="col-md-2 mb-3 mb-md-0">
                    <label className="form-label fw-medium small">Price ($)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      className="form-control-modern" 
                      name="price" 
                      placeholder="0.00" 
                      value={item.price} 
                      onChange={e => handleItemChange(i, e)} 
                      min="0"
                      required 
                    />
                  </div>
                  <div className="col-md-2 mb-3 mb-md-0">
                    <label className="form-label fw-medium small">Total</label>
                    <div className="form-control-modern bg-light fw-bold text-primary">
                      ${(item.quantity * item.price).toFixed(2)}
                    </div>
                  </div>
                  <div className="col-md-1">
                    <label className="form-label fw-medium small">&nbsp;</label>
                    <button 
                      type="button" 
                      className="btn btn-outline-danger w-100" 
                      onClick={() => removeItem(i)}
                      disabled={items.length === 1}
                      title="Remove item"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="text-center">
            <button 
              type="button" 
              className="btn btn-outline-secondary me-3" 
              onClick={() => navigate('/')}
            >
              <i className="fas fa-arrow-left me-2"></i>Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-modern px-5" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                  Creating...
                </>
              ) : (
                <>
                  <i className="fas fa-check me-2"></i>Create Invoice
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
