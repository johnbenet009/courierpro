CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE deliveries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tracking_number VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(50) NOT NULL,
    pickup_address TEXT NOT NULL,
    delivery_address TEXT NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    estimated_delivery DATETIME NOT NULL,
    courier_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (courier_id) REFERENCES users(id)
);

INSERT INTO users (name, email, password_hash, role) VALUES
('Demo User', 'demo@example.com', 'demo-hash', 'courier');

INSERT INTO deliveries (tracking_number, status, pickup_address, delivery_address, customer_name, estimated_delivery, courier_id)
VALUES
('TRK123456', 'In Transit', '123 Main St, City', '456 Oak Ave, Town', 'John Doe', '2024-03-25 14:30:00', 1),
('TRK789012', 'Pending', '789 Pine St, Village', '321 Elm St, Borough', 'Jane Smith', '2024-03-26 10:00:00', 1);