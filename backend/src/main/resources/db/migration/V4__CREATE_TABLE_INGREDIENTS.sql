CREATE TABLE `ingredients` (
    `id` CHAR(36) PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `is_global` BOOLEAN NOT NULL DEFAULT true,
    `restaurant_id` CHAR(36),
    `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
    `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);