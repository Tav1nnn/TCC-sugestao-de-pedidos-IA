CREATE TABLE `categories` (
    `id` VARCHAR(36) PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
    `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
    `restaurant_id` VARCHAR(36)
);