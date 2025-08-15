import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function onSubmit(e){
    e.preventDefault();
    try {
      const res = await api('/auth/login', { method:'POST', body:{ email, password }});
      localStorage.setItem('token', res.token);
      localStorage.setItem('role', res.role);
      localStorage.setItem('name', res.name);
      navigate('/');
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-4">
        <div className="card shadow mt-5">
          <div className="card-body">
            <h2 className="card-title text-primary mb-4 text-center">Login</h2>
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="text" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
              {error && <div style={{ color:'crimson' }}>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
