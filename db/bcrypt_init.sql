CREATE TABLE users_bcrypt_demo (
  id SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE,
  password VARCHAR
);