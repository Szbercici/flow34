--ha valami nem jo, akk 1esevel kell beolvasni a fuggvenyeket

--users tabla
--create
CREATE OR REPLACE FUNCTION sp_create_user(
    p_username VARCHAR(100),
    p_password VARCHAR(255),
    p_token VARCHAR(255) DEFAULT NULL,
    p_gender gender_type DEFAULT NULL,
    p_phone_number VARCHAR(50) DEFAULT NULL,
    p_email VARCHAR(150) DEFAULT NULL,
    p_role VARCHAR(50) DEFAULT 'user'
)
RETURNS BIGINT AS $$
DECLARE
    v_user_id BIGINT;
BEGIN
    INSERT INTO users (username, password, token, gender, phone_number, email, role, is_active, created_at)
    VALUES (p_username, p_password, p_token, p_gender, p_phone_number, p_email, p_role, true, CURRENT_TIMESTAMP)
    RETURNING id INTO v_user_id;
    
    RETURN v_user_id;
END;
$$ LANGUAGE plpgsql;


--read all
CREATE OR REPLACE FUNCTION sp_read_all_users()
RETURNS TABLE (
    id BIGINT,
    username VARCHAR(100),
    password VARCHAR(255),
    token VARCHAR(255),
    gender gender_type,
    phone_number VARCHAR(50),
    last_login TIMESTAMP,
    created_at TIMESTAMP,
    is_active BOOLEAN,
    email VARCHAR(150),
    role VARCHAR(50)
) AS $$
BEGIN
    RETURN QUERY
    SELECT u.id, u.username, u.password, u.token, u.gender, u.phone_number, 
           u.last_login, u.created_at, u.is_active, u.email, u.role
    FROM users u
    WHERE u.is_active = true
    ORDER BY u.created_at DESC;
END;
$$ LANGUAGE plpgsql;


--read by id
CREATE OR REPLACE FUNCTION sp_readById_users(p_user_id BIGINT)
RETURNS TABLE (
    id BIGINT,
    username VARCHAR(100),
    password VARCHAR(255),
    token VARCHAR(255),
    gender gender_type,
    phone_number VARCHAR(50),
    last_login TIMESTAMP,
    created_at TIMESTAMP,
    is_active BOOLEAN,
    email VARCHAR(150),
    role VARCHAR(50)
) AS $$
BEGIN
    RETURN QUERY
    SELECT u.id, u.username, u.password, u.token, u.gender, u.phone_number, 
           u.last_login, u.created_at, u.is_active, u.email, u.role
    FROM users u
    WHERE u.id = p_user_id;
END;
$$ LANGUAGE plpgsql;


--delete: users tablaban NINCS torles, is_active lesz false
CREATE OR REPLACE FUNCTION sp_delete_user(p_user_id BIGINT)
RETURNS BOOLEAN AS $$
DECLARE
    v_affected INTEGER;
BEGIN
    UPDATE users
    SET is_active = false
    WHERE id = p_user_id;
    
    GET DIAGNOSTICS v_affected = ROW_COUNT;
    RETURN v_affected > 0;
END;
$$ LANGUAGE plpgsql;


--update: parameteres update, nem all adata
CREATE OR REPLACE FUNCTION sp_update_user(
    p_user_id BIGINT,
    p_username VARCHAR(100) DEFAULT NULL,
    p_password VARCHAR(255) DEFAULT NULL,
    p_token VARCHAR(255) DEFAULT NULL,
    p_gender gender_type DEFAULT NULL,
    p_phone_number VARCHAR(50) DEFAULT NULL,
    p_email VARCHAR(150) DEFAULT NULL,
    p_role VARCHAR(50) DEFAULT NULL,
    p_last_login TIMESTAMP DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    v_affected INTEGER;
BEGIN
    UPDATE users
    SET 
        username = COALESCE(p_username, username),
        password = COALESCE(p_password, password),
        token = COALESCE(p_token, token),
        gender = COALESCE(p_gender, gender),
        phone_number = COALESCE(p_phone_number, phone_number),
        email = COALESCE(p_email, email),
        role = COALESCE(p_role, role),
        last_login = COALESCE(p_last_login, last_login)
    WHERE id = p_user_id;
    
    GET DIAGNOSTICS v_affected = ROW_COUNT;
    RETURN v_affected > 0;
END;
$$ LANGUAGE plpgsql;


--products tabla
--create
CREATE OR REPLACE FUNCTION sp_create_product(
    p_name VARCHAR(150),
    p_price NUMERIC(10,2),
    p_img VARCHAR(255) DEFAULT NULL,
    p_type VARCHAR(100) DEFAULT NULL,
    p_stock_count INTEGER DEFAULT 0,
    p_category VARCHAR(100) DEFAULT NULL,
    p_contains_id BIGINT DEFAULT NULL,
    p_description VARCHAR(150) DEFAULT NULL
)
RETURNS BIGINT AS $$
DECLARE
    v_product_id BIGINT;
BEGIN
    INSERT INTO products (img, name, type, price, stock_count, category, contains_id, description, rate, count)
    VALUES (p_img, p_name, p_type, p_price, p_stock_count, p_category, p_contains_id, p_description, 0, 0)
    RETURNING id INTO v_product_id;
    
    RETURN v_product_id;
END;
$$ LANGUAGE plpgsql;


--read all
CREATE OR REPLACE FUNCTION sp_read_all_products()
RETURNS TABLE (
    id BIGINT,
    img VARCHAR(255),
    name VARCHAR(150),
    type VARCHAR(100),
    price NUMERIC(10,2),
    stock_count INTEGER,
    category VARCHAR(100),
    contains_id BIGINT,
    description VARCHAR(150),
    rate DOUBLE PRECISION,
    count INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT p.id, p.img, p.name, p.type, p.price, p.stock_count, 
           p.category, p.contains_id, p.description, p.rate, p.count
    FROM products p
    ORDER BY p.id DESC;
END;
$$ LANGUAGE plpgsql;


--read by id
CREATE OR REPLACE FUNCTION sp_readById_products(p_product_id BIGINT)
RETURNS TABLE (
    id BIGINT,
    img VARCHAR(255),
    name VARCHAR(150),
    type VARCHAR(100),
    price NUMERIC(10,2),
    stock_count INTEGER,
    category VARCHAR(100),
    contains_id BIGINT,
    description VARCHAR(150),
    rate DOUBLE PRECISION,
    count INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT p.id, p.img, p.name, p.type, p.price, p.stock_count, 
           p.category, p.contains_id, p.description, p.rate, p.count
    FROM products p
    WHERE p.id = p_product_id;
END;
$$ LANGUAGE plpgsql;


--delete
CREATE OR REPLACE FUNCTION sp_delete_product(p_product_id BIGINT)
RETURNS BOOLEAN AS $$
DECLARE
    v_affected INTEGER;
BEGIN
    DELETE FROM products
    WHERE id = p_product_id;
    
    GET DIAGNOSTICS v_affected = ROW_COUNT;
    RETURN v_affected > 0;
END;
$$ LANGUAGE plpgsql;


--update: parameteres update, nem all adata
CREATE OR REPLACE FUNCTION sp_update_product(
    p_product_id BIGINT,
    p_img VARCHAR(255) DEFAULT NULL,
    p_name VARCHAR(150) DEFAULT NULL,
    p_type VARCHAR(100) DEFAULT NULL,
    p_price NUMERIC(10,2) DEFAULT NULL,
    p_stock_count INTEGER DEFAULT NULL,
    p_category VARCHAR(100) DEFAULT NULL,
    p_contains_id BIGINT DEFAULT NULL,
    p_description VARCHAR(150) DEFAULT NULL,
    p_rate DOUBLE PRECISION DEFAULT NULL,
    p_count INTEGER DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    v_affected INTEGER;
BEGIN
    UPDATE products
    SET 
        img = COALESCE(p_img, img),
        name = COALESCE(p_name, name),
        type = COALESCE(p_type, type),
        price = COALESCE(p_price, price),
        stock_count = COALESCE(p_stock_count, stock_count),
        category = COALESCE(p_category, category),
        contains_id = COALESCE(p_contains_id, contains_id),
        description = COALESCE(p_description, description),
        rate = COALESCE(p_rate, rate),
        count = COALESCE(p_count, count)
    WHERE id = p_product_id;
    
    GET DIAGNOSTICS v_affected = ROW_COUNT;
    RETURN v_affected > 0;
END;
$$ LANGUAGE plpgsql;


--cart tabla
--create
CREATE OR REPLACE FUNCTION sp_create_cart(p_user_id BIGINT)
RETURNS BIGINT AS $$
DECLARE
    v_cart_id BIGINT;
BEGIN
    INSERT INTO cart (user_id, created_at)
    VALUES (p_user_id, CURRENT_TIMESTAMP)
    RETURNING id INTO v_cart_id;
    
    RETURN v_cart_id;
END;
$$ LANGUAGE plpgsql;


--read all
CREATE OR REPLACE FUNCTION sp_read_all_carts()
RETURNS TABLE (
    id BIGINT,
    created_at TIMESTAMP,
    user_id BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT c.id, c.created_at, c.user_id
    FROM cart c
    ORDER BY c.created_at DESC;
END;
$$ LANGUAGE plpgsql;


--read by id
CREATE OR REPLACE FUNCTION sp_readById_cart(p_cart_id BIGINT)
RETURNS TABLE (
    id BIGINT,
    created_at TIMESTAMP,
    user_id BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT c.id, c.created_at, c.user_id
    FROM cart c
    WHERE c.id = p_cart_id;
END;
$$ LANGUAGE plpgsql;


--delete
CREATE OR REPLACE FUNCTION sp_delete_cart(p_cart_id BIGINT)
RETURNS BOOLEAN AS $$
DECLARE
    v_affected INTEGER;
BEGIN
    DELETE FROM cart
    WHERE id = p_cart_id;
    
    GET DIAGNOSTICS v_affected = ROW_COUNT;
    RETURN v_affected > 0;
END;
$$ LANGUAGE plpgsql;


--update: parameteres update, nem all adata
CREATE OR REPLACE FUNCTION sp_update_cart(
    p_cart_id BIGINT,
    p_user_id BIGINT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    v_affected INTEGER;
BEGIN
    UPDATE cart
    SET 
        user_id = COALESCE(p_user_id, user_id)
    WHERE id = p_cart_id;
    
    GET DIAGNOSTICS v_affected = ROW_COUNT;
    RETURN v_affected > 0;
END;
$$ LANGUAGE plpgsql;


--cart_items tabla
--create
CREATE OR REPLACE FUNCTION sp_create_cart_item(
    p_cart_id BIGINT,
    p_product_id BIGINT,
    p_quantity INTEGER DEFAULT 1
)
RETURNS BIGINT AS $$
DECLARE
    v_cart_item_id BIGINT;
BEGIN
    INSERT INTO cart_items (cart_id, product_id, quantity, created_at)
    VALUES (p_cart_id, p_product_id, p_quantity, CURRENT_TIMESTAMP)
    RETURNING id INTO v_cart_item_id;
    
    RETURN v_cart_item_id;
END;
$$ LANGUAGE plpgsql;


--read all
CREATE OR REPLACE FUNCTION sp_read_all_cart_items()
RETURNS TABLE (
    id BIGINT,
    cart_id BIGINT,
    product_id BIGINT,
    quantity INTEGER,
    created_at TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT ci.id, ci.cart_id, ci.product_id, ci.quantity, ci.created_at
    FROM cart_items ci
    ORDER BY ci.created_at DESC;
END;
$$ LANGUAGE plpgsql;


--read by id
CREATE OR REPLACE FUNCTION sp_readById_cart_items(p_cart_item_id BIGINT)
RETURNS TABLE (
    id BIGINT,
    cart_id BIGINT,
    product_id BIGINT,
    quantity INTEGER,
    created_at TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT ci.id, ci.cart_id, ci.product_id, ci.quantity, ci.created_at
    FROM cart_items ci
    WHERE ci.id = p_cart_item_id;
END;
$$ LANGUAGE plpgsql;


--delete
CREATE OR REPLACE FUNCTION sp_delete_cart_item(p_cart_item_id BIGINT)
RETURNS BOOLEAN AS $$
DECLARE
    v_affected INTEGER;
BEGIN
    DELETE FROM cart_items
    WHERE id = p_cart_item_id;
    
    GET DIAGNOSTICS v_affected = ROW_COUNT;
    RETURN v_affected > 0;
END;
$$ LANGUAGE plpgsql;


--update: parameteres update, nem all adata
CREATE OR REPLACE FUNCTION sp_update_cart_item(
    p_cart_item_id BIGINT,
    p_quantity INTEGER DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    v_affected INTEGER;
BEGIN
    UPDATE cart_items
    SET 
        quantity = COALESCE(p_quantity, quantity)
    WHERE id = p_cart_item_id;
    
    GET DIAGNOSTICS v_affected = ROW_COUNT;
    RETURN v_affected > 0;
END;
$$ LANGUAGE plpgsql;


--order_table tabla
--create
CREATE OR REPLACE FUNCTION sp_create_order(
    p_user_id BIGINT,
    p_cart_id BIGINT,
    p_address VARCHAR(255)
)
RETURNS BIGINT AS $$
DECLARE
    v_order_id BIGINT;
BEGIN
    INSERT INTO order_table (user_id, cart_id, address, created_at)
    VALUES (p_user_id, p_cart_id, p_address, CURRENT_TIMESTAMP)
    RETURNING id INTO v_order_id;
    
    RETURN v_order_id;
END;
$$ LANGUAGE plpgsql;


--read all
CREATE OR REPLACE FUNCTION sp_read_all_orders()
RETURNS TABLE (
    id BIGINT,
    user_id BIGINT,
    cart_id BIGINT,
    address VARCHAR(255),
    created_at TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT o.id, o.user_id, o.cart_id, o.address, o.created_at
    FROM order_table o
    ORDER BY o.created_at DESC;
END;
$$ LANGUAGE plpgsql;


--read by id
CREATE OR REPLACE FUNCTION sp_readById_order_table(p_order_id BIGINT)
RETURNS TABLE (
    id BIGINT,
    user_id BIGINT,
    cart_id BIGINT,
    address VARCHAR(255),
    created_at TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT o.id, o.user_id, o.cart_id, o.address, o.created_at
    FROM order_table o
    WHERE o.id = p_order_id;
END;
$$ LANGUAGE plpgsql;


--delete
CREATE OR REPLACE FUNCTION sp_delete_order(p_order_id BIGINT)
RETURNS BOOLEAN AS $$
DECLARE
    v_affected INTEGER;
BEGIN
    DELETE FROM order_table
    WHERE id = p_order_id;
    
    GET DIAGNOSTICS v_affected = ROW_COUNT;
    RETURN v_affected > 0;
END;
$$ LANGUAGE plpgsql;


--update: parameteres update, nem all adata
CREATE OR REPLACE FUNCTION sp_update_order(
    p_order_id BIGINT,
    p_address VARCHAR(255) DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    v_affected INTEGER;
BEGIN
    UPDATE order_table
    SET 
        address = COALESCE(p_address, address)
    WHERE id = p_order_id;
    
    GET DIAGNOSTICS v_affected = ROW_COUNT;
    RETURN v_affected > 0;
END;
$$ LANGUAGE plpgsql;


--delivery_address tabla
--create
CREATE OR REPLACE FUNCTION sp_create_delivery_address(
    p_user_id BIGINT,
    p_postcode INTEGER DEFAULT NULL,
    p_city VARCHAR(100) DEFAULT NULL,
    p_road VARCHAR(100) DEFAULT NULL,
    p_house_number VARCHAR(20) DEFAULT NULL
)
RETURNS BIGINT AS $$
DECLARE
    v_address_id BIGINT;
BEGIN
    INSERT INTO delivery_address (user_id, postcode, city, road, house_number)
    VALUES (p_user_id, p_postcode, p_city, p_road, p_house_number)
    RETURNING id INTO v_address_id;
    
    RETURN v_address_id;
END;
$$ LANGUAGE plpgsql;


--read all
CREATE OR REPLACE FUNCTION sp_read_all_delivery_addresses()
RETURNS TABLE (
    id BIGINT,
    user_id BIGINT,
    postcode INTEGER,
    city VARCHAR(100),
    road VARCHAR(100),
    house_number VARCHAR(20)
) AS $$
BEGIN
    RETURN QUERY
    SELECT da.id, da.user_id, da.postcode, da.city, da.road, da.house_number
    FROM delivery_address da
    ORDER BY da.id DESC;
END;
$$ LANGUAGE plpgsql;


--read by id
CREATE OR REPLACE FUNCTION sp_readById_delivery_address(p_address_id BIGINT)
RETURNS TABLE (
    id BIGINT,
    user_id BIGINT,
    postcode INTEGER,
    city VARCHAR(100),
    road VARCHAR(100),
    house_number VARCHAR(20)
) AS $$
BEGIN
    RETURN QUERY
    SELECT da.id, da.user_id, da.postcode, da.city, da.road, da.house_number
    FROM delivery_address da
    WHERE da.id = p_address_id;
END;
$$ LANGUAGE plpgsql;


--delete
CREATE OR REPLACE FUNCTION sp_delete_delivery_address(p_address_id BIGINT)
RETURNS BOOLEAN AS $$
DECLARE
    v_affected INTEGER;
BEGIN
    DELETE FROM delivery_address
    WHERE id = p_address_id;
    
    GET DIAGNOSTICS v_affected = ROW_COUNT;
    RETURN v_affected > 0;
END;
$$ LANGUAGE plpgsql;


--update: parameteres update, nem all adata
CREATE OR REPLACE FUNCTION sp_update_delivery_address(
    p_address_id BIGINT,
    p_postcode INTEGER DEFAULT NULL,
    p_city VARCHAR(100) DEFAULT NULL,
    p_road VARCHAR(100) DEFAULT NULL,
    p_house_number VARCHAR(20) DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    v_affected INTEGER;
BEGIN
    UPDATE delivery_address
    SET 
        postcode = COALESCE(p_postcode, postcode),
        city = COALESCE(p_city, city),
        road = COALESCE(p_road, road),
        house_number = COALESCE(p_house_number, house_number)
    WHERE id = p_address_id;
    
    GET DIAGNOSTICS v_affected = ROW_COUNT;
    RETURN v_affected > 0;
END;
$$ LANGUAGE plpgsql;


--billing_details tabla
--create
CREATE OR REPLACE FUNCTION sp_create_billing_details(
    p_user_id BIGINT,
    p_postcode INTEGER DEFAULT NULL,
    p_city VARCHAR(100) DEFAULT NULL,
    p_road VARCHAR(100) DEFAULT NULL,
    p_house_number VARCHAR(20) DEFAULT NULL
)
RETURNS BIGINT AS $$
DECLARE
    v_billing_id BIGINT;
BEGIN
    INSERT INTO billing_details (user_id, postcode, city, road, house_number)
    VALUES (p_user_id, p_postcode, p_city, p_road, p_house_number)
    RETURNING id INTO v_billing_id;
    
    RETURN v_billing_id;
END;
$$ LANGUAGE plpgsql;


--read all
CREATE OR REPLACE FUNCTION sp_read_all_billing_details()
RETURNS TABLE (
    id BIGINT,
    user_id BIGINT,
    postcode INTEGER,
    city VARCHAR(100),
    road VARCHAR(100),
    house_number VARCHAR(20)
) AS $$
BEGIN
    RETURN QUERY
    SELECT bd.id, bd.user_id, bd.postcode, bd.city, bd.road, bd.house_number
    FROM billing_details bd
    ORDER BY bd.id DESC;
END;
$$ LANGUAGE plpgsql;


--read by id
CREATE OR REPLACE FUNCTION sp_readById_billing_details(p_billing_id BIGINT)
RETURNS TABLE (
    id BIGINT,
    user_id BIGINT,
    postcode INTEGER,
    city VARCHAR(100),
    road VARCHAR(100),
    house_number VARCHAR(20)
) AS $$
BEGIN
    RETURN QUERY
    SELECT bd.id, bd.user_id, bd.postcode, bd.city, bd.road, bd.house_number
    FROM billing_details bd
    WHERE bd.id = p_billing_id;
END;
$$ LANGUAGE plpgsql;


--delete
CREATE OR REPLACE FUNCTION sp_delete_billing_details(p_billing_id BIGINT)
RETURNS BOOLEAN AS $$
DECLARE
    v_affected INTEGER;
BEGIN
    DELETE FROM billing_details
    WHERE id = p_billing_id;
    
    GET DIAGNOSTICS v_affected = ROW_COUNT;
    RETURN v_affected > 0;
END;
$$ LANGUAGE plpgsql;


--update: parameteres update, nem all adata
CREATE OR REPLACE FUNCTION sp_update_billing_details(
    p_billing_id BIGINT,
    p_postcode INTEGER DEFAULT NULL,
    p_city VARCHAR(100) DEFAULT NULL,
    p_road VARCHAR(100) DEFAULT NULL,
    p_house_number VARCHAR(20) DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    v_affected INTEGER;
BEGIN
    UPDATE billing_details
    SET 
        postcode = COALESCE(p_postcode, postcode),
        city = COALESCE(p_city, city),
        road = COALESCE(p_road, road),
        house_number = COALESCE(p_house_number, house_number)
    WHERE id = p_billing_id;
    
    GET DIAGNOSTICS v_affected = ROW_COUNT;
    RETURN v_affected > 0;
END;
$$ LANGUAGE plpgsql;


--contains tabla
--create
CREATE OR REPLACE FUNCTION sp_create_contains(p_name VARCHAR(100))
RETURNS BIGINT AS $$
DECLARE
    v_contains_id BIGINT;
BEGIN
    INSERT INTO contains (name)
    VALUES (p_name)
    RETURNING id INTO v_contains_id;
    
    RETURN v_contains_id;
END;
$$ LANGUAGE plpgsql;


--read all
CREATE OR REPLACE FUNCTION sp_read_all_contains()
RETURNS TABLE (
    id BIGINT,
    name VARCHAR(100)
) AS $$
BEGIN
    RETURN QUERY
    SELECT c.id, c.name
    FROM contains c
    ORDER BY c.name;
END;
$$ LANGUAGE plpgsql;


--read by id
CREATE OR REPLACE FUNCTION sp_readById_contains(p_contains_id BIGINT)
RETURNS TABLE (
    id BIGINT,
    name VARCHAR(100)
) AS $$
BEGIN
    RETURN QUERY
    SELECT c.id, c.name
    FROM contains c
    WHERE c.id = p_contains_id;
END;
$$ LANGUAGE plpgsql;


--delete
CREATE OR REPLACE FUNCTION sp_delete_contains(p_contains_id BIGINT)
RETURNS BOOLEAN AS $$
DECLARE
    v_affected INTEGER;
BEGIN
    DELETE FROM contains
    WHERE id = p_contains_id;
    
    GET DIAGNOSTICS v_affected = ROW_COUNT;
    RETURN v_affected > 0;
END;
$$ LANGUAGE plpgsql;


--update: parameteres update, nem all adata
CREATE OR REPLACE FUNCTION sp_update_contains(
    p_contains_id BIGINT,
    p_name VARCHAR(100) DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    v_affected INTEGER;
BEGIN
    UPDATE contains
    SET 
        name = COALESCE(p_name, name)
    WHERE id = p_contains_id;
    
    GET DIAGNOSTICS v_affected = ROW_COUNT;
    RETURN v_affected > 0;
END;
$$ LANGUAGE plpgsql;

