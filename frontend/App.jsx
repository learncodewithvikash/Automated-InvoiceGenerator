import React from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import ClientForm from "./components/ClientForm";
import InvoiceForm from "./components/InvoiceForm";
import InvoiceList from "./components/InvoiceList";
import InvoiceView from "./components/InvoiceView";

function InvoiceViewWrapper() {
  const { id } = useParams();
  return <InvoiceView id={id} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main style={{ paddingTop: '100px', paddingBottom: '50px' }}>
          <div className="container">
            <Routes>
              <Route path="/" element={<InvoiceList />} />
              <Route path="/add-client" element={<ClientForm />} />
              <Route path="/create-invoice" element={<InvoiceForm />} />
              <Route path="/view-invoice/:id" element={<InvoiceViewWrapper />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}
