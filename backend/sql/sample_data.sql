INSERT INTO clients (name, email, address) VALUES
('Acme Corp', 'acme@example.com', '123 Main St'),
('Beta LLC', 'beta@example.com', '456 Market Ave'),
('Gamma Inc', 'gamma@example.com', '789 Broadway');

INSERT INTO invoices (client_id, date, total, tax, status) VALUES
(1, '2025-08-01', 1200.00, 120.00, 'Paid'),
(2, '2025-08-05', 800.00, 80.00, 'Unpaid'),
(3, '2025-08-10', 500.00, 50.00, 'Paid');

INSERT INTO invoice_items (invoice_id, description, quantity, price) VALUES
(1, 'Consulting Services', 10, 100.00),
(1, 'Software License', 1, 200.00),
(2, 'Design Work', 8, 100.00),
(3, 'Maintenance', 5, 100.00);
