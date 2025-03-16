ALTER TABLE `users` ADD `profile` TEXT;
ALTER TABLE `users` ADD `role` VARCHAR(50);
ALTER TABLE `users` DROP FOREIGN KEY `users_ibfk_1`;
ALTER TABLE `users` DROP COLUMN `role_id`;