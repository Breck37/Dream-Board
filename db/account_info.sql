SELECT users.name, users.email, dream_images.image_url, dream_images.image_text, dream_images.category_id, dream_category.category_name FROM users INNER JOIN dream_images ON (users.id = dream_images.user_id) INNER JOIN dream_category ON(dream_images.category_id = dream_category.id) WHERE users.id = $1;

-- SELECT users.email, users.name, dream_images.image_url, dream_images.image_text FROM users inner JOIN dream_images ON (users.id = dream_images.user_id) WHERE users.id = $1;

