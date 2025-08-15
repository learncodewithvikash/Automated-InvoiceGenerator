CREATE TABLE clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  address TEXT
);

CREATE TABLE invoices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT,
  date DATE,
  total DECIMAL(10,2),
  tax DECIMAL(10,2),
  status VARCHAR(20),
  pdf_url VARCHAR(255),
  FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE TABLE invoice_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  invoice_id INT,
  description VARCHAR(255),
  quantity INT,
  price DECIMAL(10,2),
  FOREIGN KEY (invoice_id) REFERENCES invoices(id)
);
