INSERT INTO users_bcrypt (username, password) VALUES ($1, $2)
RETURNING *;