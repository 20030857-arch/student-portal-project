DROP DATABASE IF EXISTS student_portal;
CREATE DATABASE student_portal;
USE student_portal;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'admin') NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    department VARCHAR(100),
    enrollment_date DATE,
    bio TEXT
);

CREATE TABLE assessments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    subject VARCHAR(100) NOT NULL,
    due_date DATETIME NOT NULL,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    assessment_id INT NOT NULL,
    student_id INT NOT NULL,
    submission_text TEXT,
    file_url VARCHAR(255),
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('submitted', 'graded') DEFAULT 'submitted',
    marks INT DEFAULT NULL,
    feedback TEXT DEFAULT NULL,
    FOREIGN KEY (assessment_id) REFERENCES assessments(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@test.com', 'admin123', 'admin'),
('Student User', 'student@test.com', 'student123', 'student');

INSERT INTO assessments (title, description, subject, due_date, created_by) VALUES
('Database Design Project', 'Design a comprehensive database for a student management system', 'ICT', '2026-04-20 23:59:00', 1),
('Cloud Report', 'Write a detailed report on cloud computing technologies', 'Cloud Computing', '2026-04-25 23:59:00', 1),
('AI Assignment', 'Build a simple ML model', 'Artificial Intelligence', '2026-04-30 23:59:00', 1);

INSERT INTO submissions (assessment_id, student_id, submission_text, status)
VALUES
(1, 2, 'My submission for database project', 'submitted');