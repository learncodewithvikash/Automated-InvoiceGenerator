import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-modern fixed-top fade-in">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
          <i className="fas fa-heartbeat text-primary me-2 fs-4"></i>
          <span className="text-primary">Healthcare</span>
          <span className="text-secondary ms-1">Management</span>
        </Link>
        
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-primary`}></i>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item mx-1">
              <Link 
                className={`nav-link px-3 py-2 rounded-pill transition ${isActive('/') ? 'bg-primary text-white' : 'text-dark'}`} 
                to="/"
                onClick={() => setIsOpen(false)}
              >
                <i className="fas fa-home me-2"></i>Dashboard
              </Link>
            </li>
            <li className="nav-item mx-1">
              <Link 
                className={`nav-link px-3 py-2 rounded-pill transition ${isActive('/create-invoice') ? 'bg-primary text-white' : 'text-dark'}`} 
                to="/create-invoice"
                onClick={() => setIsOpen(false)}
              >
                <i className="fas fa-plus-circle me-2"></i>Create Invoice
              </Link>
            </li>
            <li className="nav-item mx-1">
              <Link 
                className={`nav-link px-3 py-2 rounded-pill transition ${isActive('/add-client') ? 'bg-primary text-white' : 'text-dark'}`} 
                to="/add-client"
                onClick={() => setIsOpen(false)}
              >
                <i className="fas fa-user-plus me-2"></i>Add Client
              </Link>
            </li>
          </ul>
          
          <div className="d-flex align-items-center">
            <div className="nav-item dropdown">
              <a className="nav-link dropdown-toggle d-flex align-items-center text-dark" href="#" role="button" data-bs-toggle="dropdown">
                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2" style={{width: '32px', height: '32px'}}>
                  <i className="fas fa-user-md"></i>
                </div>
                <span className="fw-medium">Dr. Admin</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end glass-card border-0 mt-2">
                <li><a className="dropdown-item" href="#"><i className="fas fa-user me-2"></i>Profile</a></li>
                <li><a className="dropdown-item" href="#"><i className="fas fa-cog me-2"></i>Settings</a></li>
                <li><hr className="dropdown-divider"/></li>
                <li><a className="dropdown-item text-danger" href="#"><i className="fas fa-sign-out-alt me-2"></i>Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
