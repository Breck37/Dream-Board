INSERT INTO users (auth0_id, name, email, social) VALUES ($1, $2, $3, $4)
RETURNING *;