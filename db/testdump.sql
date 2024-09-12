CREATE DATABASE IF NOT EXISTS cmsystem;

USE cmsystem;

-- Create the user table
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the contact table
CREATE TABLE IF NOT EXISTS contact (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    address VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the phone table
CREATE TABLE IF NOT EXISTS phone (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contact_id INT NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    FOREIGN KEY (contact_id) REFERENCES contact(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the tag table
CREATE TABLE IF NOT EXISTS tag (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contact_id INT NOT NULL,
    tag VARCHAR(100) NOT NULL,
    FOREIGN KEY (contact_id) REFERENCES contact(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert dummy users
INSERT INTO user (name, email, phone, hashed_password)
VALUES 
('John Doe', 'john@example.com', '1234567890', '$2a$10$KfTi1N7LMeqbgVZs5UdY5uHyFbzD8a68AFw2jP4CG2l6k.zHjNqvK'),  -- password: password123
('Jane Smith', 'jane@example.com', '0987654321', '$2a$10$KfTi1N7LMeqbgVZs5UdY5uHyFbzD8a68AFw2jP4CG2l6k.zHjNqvK'); -- password: password123

-- Insert dummy contacts
INSERT INTO contact (first_name, last_name, address, email, user_id)
VALUES
('Alice', 'Johnson', '123 Maple Street', 'alice@example.com', 1),
('Bob', 'Williams', '456 Oak Street', 'bob@example.com', 1),
('Charlie', 'Brown', '789 Pine Street', 'charlie@example.com', 2);

-- Insert dummy phone numbers
INSERT INTO phone (contact_id, phone_number)
VALUES
(1, '555-1111'),
(1, '555-2222'),
(2, '555-3333'),
(3, '555-4444');

-- Insert dummy tags
INSERT INTO tag (contact_id, tag)
VALUES
(1, 'Friend'),
(2, 'Colleague'),
(3, 'Family');

ALTER USER 'root' IDENTIFIED WITH caching_sha2_password BY 'password'; 
flush privileges;