import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addClient } from "../api";

export default function ClientForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await addClient(form);
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error adding client:', error);
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
        <h3 className="text-success fw-bold mb-3">Client Added Successfully!</h3>
        <p className="text-muted mb-4">Redirecting to dashboard...</p>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="glass-card p-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-primary mb-3">
            <i className="fas fa-user-plus me-3"></i>
            Add New Client
          </h2>
          <p className="text-muted">Register a new client to start creating invoices</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <form onSubmit={handleSubmit}>
              <div className="glass-card p-4 mb-4">
                <h5 className="fw-bold text-primary mb-4">
                  <i className="fas fa-user me-2"></i>Client Information
                </h5>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-medium">
                      <i className="fas fa-user me-2 text-muted"></i>Full Name
                    </label>
                    <input 
                      className="form-control-modern" 
                      name="name" 
                      value={form.name} 
                      onChange={handleChange} 
                      placeholder="Enter client's full name"
                      required 
                    />
                  </div>

                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-medium">
                      <i className="fas fa-envelope me-2 text-muted"></i>Email Address
                    </label>
                    <input 
                      type="email"
                      className="form-control-modern" 
                      name="email" 
                      value={form.email} 
                      onChange={handleChange} 
                      placeholder="client@example.com"
                      required 
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-medium">
                    <i className="fas fa-map-marker-alt me-2 text-muted"></i>Address
                  </label>
                  <textarea 
                    className="form-control-modern" 
                    name="address" 
                    value={form.address} 
                    onChange={handleChange} 
                    placeholder="Enter complete address"
                    rows="3"
                    required 
                  />
                </div>
              </div>

              {/* Preview Card */}
              <div className="glass-card p-4 mb-4 slide-up">
                <h6 className="fw-bold text-primary mb-3">
                  <i className="fas fa-eye me-2"></i>Client Preview
                </h6>
                <div className="row">
                  <div className="col-md-4">
                    <div className="text-center p-3">
                      <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-2" style={{width: '60px', height: '60px'}}>
                        <i className="fas fa-user fs-4"></i>
                      </div>
                      <h6 className="fw-bold">{form.name || 'Client Name'}</h6>
                      <small className="text-muted">{form.email || 'Email Address'}</small>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="p-3">
                      <h6 className="fw-bold mb-2">Contact Information</h6>
                      <p className="text-muted mb-1">
                        <i className="fas fa-envelope me-2"></i>
                        {form.email || 'No email provided'}
                      </p>
                      <p className="text-muted mb-0">
                        <i className="fas fa-map-marker-alt me-2"></i>
                        {form.address || 'No address provided'}
                      </p>
                    </div>
                  </div>
                </div>
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
                      Adding Client...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-user-plus me-2"></i>Add Client
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
