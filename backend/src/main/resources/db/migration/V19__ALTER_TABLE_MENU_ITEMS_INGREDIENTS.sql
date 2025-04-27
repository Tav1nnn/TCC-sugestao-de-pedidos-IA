CREATE TABLE `menu_items_ingredients_new` (
                                              `menu_item_id` CHAR(36) NOT NULL,
                                              `ingredient_id` CHAR(36) NOT NULL,
                                              PRIMARY KEY (`menu_item_id`, `ingredient_id`),
                                              FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`id`),
                                              FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`)
);

INSERT INTO `menu_items_ingredients_new` (`menu_item_id`, `ingredient_id`)
SELECT `menu_item_id`, `ingredient_id`
FROM `menu_items_ingredients`;

DROP TABLE `menu_items_ingredients`;

ALTER TABLE `menu_items_ingredients_new` RENAME TO `menu_items_ingredients`;
