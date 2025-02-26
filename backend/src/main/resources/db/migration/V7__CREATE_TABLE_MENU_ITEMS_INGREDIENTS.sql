CREATE TABLE `menu_items_ingredients` (
    `id` CHAR(36) PRIMARY KEY,
    `menu_item_id` CHAR(36) NOT NULL,
    `ingredient_id` CHAR(36) NOT NULL
);