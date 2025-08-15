import React, { useEffect, useState } from 'react';
import { api } from '../../api';

export default function DashboardDoctor() {
  const token = localStorage.getItem('token');
  const [appts, setAppts] = useState([]);
  const [note, setNote] = useState('');

  useEffect(()=>{
    api('/appointments', { token }).then(setAppts).catch(console.error);
  }, []);

  async function addNotes(id){
    await api(`/appointments/${id}/notes`, { method:'POST', token, body:{ notes: note }});
    setNote('');
    alert('Notes saved');
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="card shadow mb-4">
          <div className="card-body">
            <h2 className="card-title text-primary mb-3">Doctor Dashboard</h2>
            <p className="card-text">Welcome, Doctor! View your appointments, add notes, and manage your schedule.</p>
            <h3>My Appointments</h3>
            <ul>
              {appts.map(a => (
                <li key={a.id}>
                  {new Date(a.start_time).toLocaleString()} — Patient: {a.patient_name} — Status: {a.status}
                  <div style={{display:'flex', gap:8, marginTop:4}}>
                    <input placeholder='Add notes' value={note} onChange={e=>setNote(e.target.value)} />
                    <button onClick={()=>addNotes(a.id)}>Save Notes</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
