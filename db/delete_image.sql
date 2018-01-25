DELETE FROM dream_images WHERE id = $1;
SELECT * FROM dream_images WHERE user_id = $2;