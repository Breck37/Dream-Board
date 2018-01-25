CREATE TABLE IF NOT EXISTS users (
id SERIAL PRIMARY KEY,
Auth0_id TEXT,
name Text NOT NULL,
email Text UNIQUE,
social TEXT
);

CREATE TABLE IF NOT EXISTS dream_images (
id SERIAL,
user_id INT NOT NULL REFERENCES users,
image_url TEXT,
image_text TEXT,
category INT references dream_category(id)
);

CREATE TABLE IF NOT EXISTS dream_category (
id SERIAL PRIMARY KEY,
category_name TEXT
);