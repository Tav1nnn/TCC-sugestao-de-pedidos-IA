CREATE TABLE `restaurants` (
   `id` VARCHAR(36) PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `description` longtext NOT NULL,
    `address` VARCHAR(255) UNIQUE NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `cnpj` VARCHAR(14) UNIQUE NOT NULL,
    `ie` varchar(9) UNIQUE NOT NULL,
    `image_url` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
    `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);