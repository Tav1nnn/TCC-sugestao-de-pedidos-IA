CREATE TABLE `menu_items` (
    `id` CHAR(36) PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,
    `price` DECIMAL(10,2) NOT NULL,
    `image_url` VARCHAR(255),
    `category_id` CHAR(36) NOT NULL,
    `restaurant_id` CHAR(36) NOT NULL,
    `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
    `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);