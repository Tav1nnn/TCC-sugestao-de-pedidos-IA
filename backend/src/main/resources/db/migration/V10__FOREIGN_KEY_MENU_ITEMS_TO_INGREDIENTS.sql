ALTER TABLE `menu_items_ingredients` ADD FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`id`);

ALTER TABLE `menu_items_ingredients` ADD FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`);