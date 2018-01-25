INSERT INTO dream_images (user_id, image_url, image_text, category_id) VALUES ($1, $2, $3, $4);
SELECT * FROM dream_images WHERE user_id = $1;