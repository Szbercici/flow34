--
-- PostgreSQL database dump
--

\restrict 9rAcAITF9Id8tx6MToH8IUGQi6zuYRWeCgJ8S9MUBV8zR6ehVkib1xM2qXDqomh

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

-- Started on 2026-03-16 14:58:40

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

--
-- TOC entry 869 (class 1247 OID 17293)
-- Name: gender_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.gender_type AS ENUM (
    'male',
    'female',
    'other'
);


ALTER TYPE public.gender_type OWNER TO postgres;

--
-- TOC entry 899 (class 1247 OID 17448)
-- Name: theme_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.theme_type AS ENUM (
    'light',
    'dark'
);


ALTER TYPE public.theme_type OWNER TO postgres;

--
-- TOC entry 872 (class 1247 OID 17300)
-- Name: user_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_status AS ENUM (
    'admin',
    'user'
);


ALTER TYPE public.user_status OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 17305)
-- Name: billing_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.billing_details (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    postcode integer,
    city character varying(100),
    road character varying(100),
    house_number character varying(20)
);


ALTER TABLE public.billing_details OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 17310)
-- Name: billing_details_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.billing_details ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.billing_details_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 221 (class 1259 OID 17311)
-- Name: cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart (
    id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    user_id bigint NOT NULL
);


ALTER TABLE public.cart OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 17318)
-- Name: cart_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.cart ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cart_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 223 (class 1259 OID 17319)
-- Name: cart_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_items (
    id bigint NOT NULL,
    cart_id bigint NOT NULL,
    product_id bigint NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT chk_quantity_positive CHECK ((quantity > 0))
);


ALTER TABLE public.cart_items OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 17330)
-- Name: cart_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.cart_items ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cart_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 225 (class 1259 OID 17331)
-- Name: contains; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contains (
    id bigint NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public.contains OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 17336)
-- Name: contains_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.contains ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.contains_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 227 (class 1259 OID 17337)
-- Name: delivery_address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.delivery_address (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    postcode integer,
    city character varying(100),
    road character varying(100),
    house_number character varying(20)
);


ALTER TABLE public.delivery_address OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 17342)
-- Name: delivery_address_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.delivery_address ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.delivery_address_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 236 (class 1259 OID 25484)
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    id bigint NOT NULL,
    order_id bigint NOT NULL,
    product_id bigint NOT NULL,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 25483)
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.order_items ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.order_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 229 (class 1259 OID 17343)
-- Name: order_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_table (
    id bigint NOT NULL,
    user_id bigint,
    cart_id bigint,
    address character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.order_table OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 17349)
-- Name: order_table_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.order_table ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.order_table_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 231 (class 1259 OID 17350)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id bigint NOT NULL,
    img character varying(255),
    name character varying(150) NOT NULL,
    price numeric(10,2) NOT NULL,
    stock_count integer DEFAULT 0 NOT NULL,
    category character varying(100),
    contains_id bigint,
    description character varying(150),
    rate double precision DEFAULT 0 NOT NULL,
    count integer DEFAULT 0
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 17363)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.products ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 233 (class 1259 OID 17364)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    username character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    token character varying(255),
    gender public.gender_type,
    phone_number character varying(50),
    last_login timestamp without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    email character varying(150),
    role character varying(50),
    theme public.theme_type DEFAULT 'light'::public.theme_type NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 17376)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4917 (class 2606 OID 17378)
-- Name: billing_details billing_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.billing_details
    ADD CONSTRAINT billing_details_pkey PRIMARY KEY (id);


--
-- TOC entry 4923 (class 2606 OID 17380)
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- TOC entry 4920 (class 2606 OID 17382)
-- Name: cart cart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (id);


--
-- TOC entry 4929 (class 2606 OID 17384)
-- Name: contains contains_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contains
    ADD CONSTRAINT contains_pkey PRIMARY KEY (id);


--
-- TOC entry 4931 (class 2606 OID 17386)
-- Name: delivery_address delivery_address_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.delivery_address
    ADD CONSTRAINT delivery_address_pkey PRIMARY KEY (id);


--
-- TOC entry 4947 (class 2606 OID 25493)
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- TOC entry 4936 (class 2606 OID 17388)
-- Name: order_table order_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_table
    ADD CONSTRAINT order_table_pkey PRIMARY KEY (id);


--
-- TOC entry 4939 (class 2606 OID 17390)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 4927 (class 2606 OID 17392)
-- Name: cart_items uq_cart_product; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT uq_cart_product UNIQUE (cart_id, product_id);


--
-- TOC entry 4941 (class 2606 OID 17394)
-- Name: users users_phone_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_phone_number_key UNIQUE (phone_number);


--
-- TOC entry 4943 (class 2606 OID 17396)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4945 (class 2606 OID 17398)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 4918 (class 1259 OID 17399)
-- Name: idx_billing_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_billing_user_id ON public.billing_details USING btree (user_id);


--
-- TOC entry 4924 (class 1259 OID 17400)
-- Name: idx_cart_items_cart_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_cart_items_cart_id ON public.cart_items USING btree (cart_id);


--
-- TOC entry 4925 (class 1259 OID 17401)
-- Name: idx_cart_items_product_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_cart_items_product_id ON public.cart_items USING btree (product_id);


--
-- TOC entry 4932 (class 1259 OID 17402)
-- Name: idx_delivery_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_delivery_user_id ON public.delivery_address USING btree (user_id);


--
-- TOC entry 4933 (class 1259 OID 17403)
-- Name: idx_order_cart_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_order_cart_id ON public.order_table USING btree (cart_id);


--
-- TOC entry 4934 (class 1259 OID 17404)
-- Name: idx_order_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_order_user_id ON public.order_table USING btree (user_id);


--
-- TOC entry 4937 (class 1259 OID 17405)
-- Name: idx_products_contains_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_products_contains_id ON public.products USING btree (contains_id);


--
-- TOC entry 4921 (class 1259 OID 17406)
-- Name: ux_cart_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ux_cart_user_id ON public.cart USING btree (user_id);


--
-- TOC entry 4948 (class 2606 OID 17407)
-- Name: billing_details fk_billing_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.billing_details
    ADD CONSTRAINT fk_billing_user FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4950 (class 2606 OID 17412)
-- Name: cart_items fk_cart_items_cart; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT fk_cart_items_cart FOREIGN KEY (cart_id) REFERENCES public.cart(id) ON DELETE CASCADE;


--
-- TOC entry 4951 (class 2606 OID 17417)
-- Name: cart_items fk_cart_items_product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT fk_cart_items_product FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- TOC entry 4949 (class 2606 OID 17422)
-- Name: cart fk_cart_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4952 (class 2606 OID 17427)
-- Name: delivery_address fk_delivery_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.delivery_address
    ADD CONSTRAINT fk_delivery_user FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4953 (class 2606 OID 17432)
-- Name: order_table fk_order_cart; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_table
    ADD CONSTRAINT fk_order_cart FOREIGN KEY (cart_id) REFERENCES public.cart(id);


--
-- TOC entry 4956 (class 2606 OID 25494)
-- Name: order_items fk_order_items_order; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES public.order_table(id) ON DELETE CASCADE;


--
-- TOC entry 4954 (class 2606 OID 17437)
-- Name: order_table fk_order_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_table
    ADD CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4955 (class 2606 OID 17442)
-- Name: products fk_product_contains; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_product_contains FOREIGN KEY (contains_id) REFERENCES public.contains(id);


-- Completed on 2026-03-16 14:58:40

--
-- PostgreSQL database dump complete
--

\unrestrict 9rAcAITF9Id8tx6MToH8IUGQi6zuYRWeCgJ8S9MUBV8zR6ehVkib1xM2qXDqomh

