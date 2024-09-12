
USE cmsystem;
CREATE TABLE Student(
       student_id INT PRIMARY KEY AUTO_INCREMENT, 
       student_name VARCHAR(60), 
       student_age INT
);
INSERT INTO Student(
       student_name, 
       student_age) 
VALUES(
       "Shubham verma", 
        21
);
INSERT INTO Student(
       student_name, 
       student_age) 
VALUES(
       "Utkarsh verma", 
        23
);


ALTER USER 'root' IDENTIFIED WITH caching_sha2_password BY 'password'; 
flush privileges;