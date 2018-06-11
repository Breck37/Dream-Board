CREATE TABLE users_bcrypt (
id SERIAL PRIMARY KEY,
name TEXT,
email TEXT UNIQUE,
username TEXT UNIQUE,
password varchar
);