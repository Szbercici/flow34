--
-- PostgreSQL database schema
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


-- ENUM only when not already exist

DO $$ BEGIN
    CREATE TYPE public.gender_type AS ENUM ('male', 'female', 'other');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE public.user_status AS ENUM ('admin', 'user');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

SET default_tablespace = '';
SET default_table_access_method = heap;


-- TABLES only when not already exist

CREATE TABLE IF NOT EXISTS public.users (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1),
    username character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    token character varying(255),
    gender public.gender_type,
    phone_number character varying(50),
    last_login timestamp without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    email character varying(150),
    role character varying(50)
);
ALTER TABLE public.users OWNER TO postgres;

CREATE TABLE IF NOT EXISTS public.contains (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1),
    name character varying(100) NOT NULL
);
ALTER TABLE public.contains OWNER TO postgres;

CREATE TABLE IF NOT EXISTS public.products (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1),
    img character varying(255),
    name character varying(150) NOT NULL,
    type character varying(100),
    price numeric(10,2) NOT NULL,
    stock_count integer DEFAULT 0 NOT NULL,
    category character varying(100),
    contains_id bigint,
    description character varying(150),
    rate double precision DEFAULT 0 NOT NULL,
    count integer DEFAULT 0
);
ALTER TABLE public.products OWNER TO postgres;

CREATE TABLE IF NOT EXISTS public.cart (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    user_id bigint NOT NULL
);
ALTER TABLE public.cart OWNER TO postgres;

CREATE TABLE IF NOT EXISTS public.cart_items (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1),
    cart_id bigint NOT NULL,
    product_id bigint NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT chk_quantity_positive CHECK ((quantity > 0))
);
ALTER TABLE public.cart_items OWNER TO postgres;

CREATE TABLE IF NOT EXISTS public.order_table (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1),
    user_id bigint,
    cart_id bigint,
    address character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
ALTER TABLE public.order_table OWNER TO postgres;

CREATE TABLE IF NOT EXISTS public.delivery_address (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1),
    user_id bigint NOT NULL,
    postcode integer,
    city character varying(100),
    road character varying(100),
    house_number character varying(20)
);
ALTER TABLE public.delivery_address OWNER TO postgres;

CREATE TABLE IF NOT EXISTS public.billing_details (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1),
    user_id bigint NOT NULL,
    postcode integer,
    city character varying(100),
    road character varying(100),
    house_number character varying(20)
);
ALTER TABLE public.billing_details OWNER TO postgres;


-- PRIMARY KEY-K only when not already exist

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'users_pkey') THEN
        ALTER TABLE ONLY public.users ADD CONSTRAINT users_pkey PRIMARY KEY (id);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'contains_pkey') THEN
        ALTER TABLE ONLY public.contains ADD CONSTRAINT contains_pkey PRIMARY KEY (id);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'products_pkey') THEN
        ALTER TABLE ONLY public.products ADD CONSTRAINT products_pkey PRIMARY KEY (id);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'cart_pkey') THEN
        ALTER TABLE ONLY public.cart ADD CONSTRAINT cart_pkey PRIMARY KEY (id);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'cart_items_pkey') THEN
        ALTER TABLE ONLY public.cart_items ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'order_table_pkey') THEN
        ALTER TABLE ONLY public.order_table ADD CONSTRAINT order_table_pkey PRIMARY KEY (id);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'delivery_address_pkey') THEN
        ALTER TABLE ONLY public.delivery_address ADD CONSTRAINT delivery_address_pkey PRIMARY KEY (id);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'billing_details_pkey') THEN
        ALTER TABLE ONLY public.billing_details ADD CONSTRAINT billing_details_pkey PRIMARY KEY (id);
    END IF;
END $$;


-- constraint(UNIQUE)

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'users_username_key') THEN
        ALTER TABLE ONLY public.users ADD CONSTRAINT users_username_key UNIQUE (username);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'users_phone_number_key') THEN
        ALTER TABLE ONLY public.users ADD CONSTRAINT users_phone_number_key UNIQUE (phone_number);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'uq_cart_product') THEN
        ALTER TABLE ONLY public.cart_items ADD CONSTRAINT uq_cart_product UNIQUE (cart_id, product_id);
    END IF;
END $$;


-- INDEX-ek only when not already exist

CREATE INDEX IF NOT EXISTS idx_billing_user_id ON public.billing_details USING btree (user_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_cart_id ON public.cart_items USING btree (cart_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_product_id ON public.cart_items USING btree (product_id);
CREATE INDEX IF NOT EXISTS idx_delivery_user_id ON public.delivery_address USING btree (user_id);
CREATE INDEX IF NOT EXISTS idx_order_cart_id ON public.order_table USING btree (cart_id);
CREATE INDEX IF NOT EXISTS idx_order_user_id ON public.order_table USING btree (user_id);
CREATE INDEX IF NOT EXISTS idx_products_contains_id ON public.products USING btree (contains_id);
CREATE UNIQUE INDEX IF NOT EXISTS ux_cart_user_id ON public.cart USING btree (user_id);


-- FOREIGN KEY-k only when not already exist

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_product_contains') THEN
ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_product_contains FOREIGN KEY (contains_id) REFERENCES public.contains(id);
END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_cart_user') THEN
ALTER TABLE ONLY public.cart
    ADD CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_cart_items_cart') THEN
ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT fk_cart_items_cart FOREIGN KEY (cart_id) REFERENCES public.cart(id) ON DELETE CASCADE;
END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_cart_items_product') THEN
ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT fk_cart_items_product FOREIGN KEY (product_id) REFERENCES public.products(id);
END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_order_user') THEN
ALTER TABLE ONLY public.order_table
    ADD CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES public.users(id);
END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_order_cart') THEN
ALTER TABLE ONLY public.order_table
    ADD CONSTRAINT fk_order_cart FOREIGN KEY (cart_id) REFERENCES public.cart(id);
END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_delivery_user') THEN
ALTER TABLE ONLY public.delivery_address
    ADD CONSTRAINT fk_delivery_user FOREIGN KEY (user_id) REFERENCES public.users(id);
END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_billing_user') THEN
ALTER TABLE ONLY public.billing_details
    ADD CONSTRAINT fk_billing_user FOREIGN KEY (user_id) REFERENCES public.users(id);
END IF;
END $$;

DO $$ BEGIN
    RAISE NOTICE ':) :) :) SCHEMA LOADING DONE :) :) :)';
END $$;