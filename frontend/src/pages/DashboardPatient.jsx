// ...existing code...
import React, { useEffect, useState } from 'react';
import { api } from '../../api';

export default function DashboardPatient() {
  const token = localStorage.getItem('token');
  const [records, setRecords] = useState([]);

  useEffect(()=>{
    api('/patients/me/records', { token }).then(setRecords).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Patient Dashboard</h2>
      <h3>My Reports</h3>
      <ul>
        {records.map(r => (
          <li key={r.id}>
            {new Date(r.created_at).toLocaleString()} — Notes: {r.doctor_notes}
          </li>
        ))}
      </ul>
    </div>
  );
}
