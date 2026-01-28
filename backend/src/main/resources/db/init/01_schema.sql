-- Optional: so it can be rerun safely in dev
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_status') THEN
        CREATE TYPE user_status AS ENUM ('admin', 'user');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'gender_type') THEN
        CREATE TYPE gender_type AS ENUM ('male', 'female', 'other');
    END IF;
END $$;

-- USERS
CREATE TABLE IF NOT EXISTS users (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username      VARCHAR(100) NOT NULL UNIQUE,
  password      VARCHAR(255) NOT NULL,
  token         VARCHAR(255),
  status        user_status  NOT NULL DEFAULT 'user',
  gender        gender_type,
  email		 	VARCHAR(150) UNIQUE,
  phone_number  VARCHAR(50)  UNIQUE,
  last_login    TIMESTAMP,
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  is_active     BOOLEAN   NOT NULL DEFAULT true
);

-- CONTAINS (ingredients/contains)
CREATE TABLE IF NOT EXISTS contains (
  id   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- PRODUCTS
CREATE TABLE IF NOT EXISTS products (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  img          VARCHAR(255),
  name         VARCHAR(150) NOT NULL,
  type         VARCHAR(100),
  price        NUMERIC(10,2) NOT NULL,
  stock_count  INTEGER NOT NULL DEFAULT 0,
  category     VARCHAR(100),
  contains_id  BIGINT
);

-- CART
CREATE TABLE IF NOT EXISTS cart (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  product_id BIGINT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ORDERS
CREATE TABLE IF NOT EXISTS order_table (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id    BIGINT,
  cart_id    BIGINT,
  address    VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- DELIVERY ADDRESS
CREATE TABLE IF NOT EXISTS delivery_address (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id      BIGINT NOT NULL,
  postcode     INTEGER,
  city         VARCHAR(100),
  road         VARCHAR(100),
  house_number VARCHAR(20)
);

-- BILLING DETAILS
CREATE TABLE IF NOT EXISTS billing_details (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id      BIGINT NOT NULL,
  postcode     INTEGER,
  city         VARCHAR(100),
  road         VARCHAR(100),
  house_number VARCHAR(20)
);

-- USER_CART (link table)
CREATE TABLE IF NOT EXISTS user_cart (
  id      BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL,
  cart_id BIGINT NOT NULL
);

-- FOREIGN KEYS (PostgreSQL doesn't support "ADD CONSTRAINT IF NOT EXISTS")
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_cart_product') THEN
    ALTER TABLE cart
      ADD CONSTRAINT fk_cart_product
      FOREIGN KEY (product_id) REFERENCES products(id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_order_user') THEN
    ALTER TABLE order_table
      ADD CONSTRAINT fk_order_user
      FOREIGN KEY (user_id) REFERENCES users(id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_order_cart') THEN
    ALTER TABLE order_table
      ADD CONSTRAINT fk_order_cart
      FOREIGN KEY (cart_id) REFERENCES cart(id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_user_cart_user') THEN
    ALTER TABLE user_cart
      ADD CONSTRAINT fk_user_cart_user
      FOREIGN KEY (user_id) REFERENCES users(id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_user_cart_cart') THEN
    ALTER TABLE user_cart
      ADD CONSTRAINT fk_user_cart_cart
      FOREIGN KEY (cart_id) REFERENCES cart(id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_product_contains') THEN
    ALTER TABLE products
      ADD CONSTRAINT fk_product_contains
      FOREIGN KEY (contains_id) REFERENCES contains(id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_delivery_user') THEN
    ALTER TABLE delivery_address
      ADD CONSTRAINT fk_delivery_user
      FOREIGN KEY (user_id) REFERENCES users(id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_billing_user') THEN
    ALTER TABLE billing_details
      ADD CONSTRAINT fk_billing_user
      FOREIGN KEY (user_id) REFERENCES users(id);
  END IF;
END $$;

-- Helpful indexes (optional but recommended)
CREATE INDEX IF NOT EXISTS idx_products_contains_id ON products(contains_id);
CREATE INDEX IF NOT EXISTS idx_cart_product_id ON cart(product_id);
CREATE INDEX IF NOT EXISTS idx_order_user_id ON order_table(user_id);
CREATE INDEX IF NOT EXISTS idx_order_cart_id ON order_table(cart_id);
CREATE INDEX IF NOT EXISTS idx_user_cart_user_id ON user_cart(user_id);
CREATE INDEX IF NOT EXISTS idx_user_cart_cart_id ON user_cart(cart_id);
CREATE INDEX IF NOT EXISTS idx_delivery_user_id ON delivery_address(user_id);
CREATE INDEX IF NOT EXISTS idx_billing_user_id ON billing_details(user_id);
