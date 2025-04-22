ALTER TABLE users
    ADD COLUMN restaurant_id VARCHAR(36) NULL,
ADD CONSTRAINT fk_users_restaurant
FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
ON DELETE SET NULL
ON UPDATE CASCADE;

