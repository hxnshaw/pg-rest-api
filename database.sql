CREATE DATABASE todo_database;

--\c into todo database

CREATE TABLE todo(
     todo_id SERIAL PRIMARY KEY,
     description VARCHAR(255)
);