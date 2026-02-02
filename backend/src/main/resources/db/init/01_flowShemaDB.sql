--
-- PostgreSQL database dump
--

\restrict gdegHOkupEoIXl6G4K2XPLkyt2tzCPvnMWPiFh2dfFBcwRS1ziy4SL5phro0Xag

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

-- Started on 2026-02-02 12:55:58

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
-- TOC entry 870 (class 1247 OID 16546)
-- Name: gender_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.gender_type AS ENUM (
    'male',
    'female',
    'other'
);


ALTER TYPE public.gender_type OWNER TO postgres;

--
-- TOC entry 867 (class 1247 OID 16540)
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
-- TOC entry 232 (class 1259 OID 16624)
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
-- TOC entry 231 (class 1259 OID 16623)
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
-- TOC entry 226 (class 1259 OID 16598)
-- Name: cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart (
    id bigint NOT NULL,
    product_id bigint,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.cart OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16597)
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
-- TOC entry 222 (class 1259 OID 16577)
-- Name: contains; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contains (
    id bigint NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public.contains OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16576)
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
-- TOC entry 230 (class 1259 OID 16616)
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
-- TOC entry 229 (class 1259 OID 16615)
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
-- TOC entry 228 (class 1259 OID 16607)
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
-- TOC entry 227 (class 1259 OID 16606)
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
-- TOC entry 224 (class 1259 OID 16585)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id bigint NOT NULL,
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

--
-- TOC entry 223 (class 1259 OID 16584)
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
-- TOC entry 234 (class 1259 OID 16632)
-- Name: user_cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_cart (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    cart_id bigint NOT NULL
);


ALTER TABLE public.user_cart OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16631)
-- Name: user_cart_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.user_cart ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_cart_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 220 (class 1259 OID 16554)
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
    role character varying(50)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16553)
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
-- TOC entry 4926 (class 2606 OID 16630)
-- Name: billing_details billing_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.billing_details
    ADD CONSTRAINT billing_details_pkey PRIMARY KEY (id);


--
-- TOC entry 4916 (class 2606 OID 16605)
-- Name: cart cart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (id);


--
-- TOC entry 4911 (class 2606 OID 16583)
-- Name: contains contains_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contains
    ADD CONSTRAINT contains_pkey PRIMARY KEY (id);


--
-- TOC entry 4923 (class 2606 OID 16622)
-- Name: delivery_address delivery_address_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.delivery_address
    ADD CONSTRAINT delivery_address_pkey PRIMARY KEY (id);


--
-- TOC entry 4921 (class 2606 OID 16614)
-- Name: order_table order_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_table
    ADD CONSTRAINT order_table_pkey PRIMARY KEY (id);


--
-- TOC entry 4914 (class 2606 OID 16596)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 4931 (class 2606 OID 16639)
-- Name: user_cart user_cart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_cart
    ADD CONSTRAINT user_cart_pkey PRIMARY KEY (id);


--
-- TOC entry 4905 (class 2606 OID 16575)
-- Name: users users_phone_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_phone_number_key UNIQUE (phone_number);


--
-- TOC entry 4907 (class 2606 OID 16569)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4909 (class 2606 OID 16571)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 4927 (class 1259 OID 16687)
-- Name: idx_billing_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_billing_user_id ON public.billing_details USING btree (user_id);


--
-- TOC entry 4917 (class 1259 OID 16681)
-- Name: idx_cart_product_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_cart_product_id ON public.cart USING btree (product_id);


--
-- TOC entry 4924 (class 1259 OID 16686)
-- Name: idx_delivery_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_delivery_user_id ON public.delivery_address USING btree (user_id);


--
-- TOC entry 4918 (class 1259 OID 16683)
-- Name: idx_order_cart_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_order_cart_id ON public.order_table USING btree (cart_id);


--
-- TOC entry 4919 (class 1259 OID 16682)
-- Name: idx_order_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_order_user_id ON public.order_table USING btree (user_id);


--
-- TOC entry 4912 (class 1259 OID 16680)
-- Name: idx_products_contains_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_products_contains_id ON public.products USING btree (contains_id);


--
-- TOC entry 4928 (class 1259 OID 16685)
-- Name: idx_user_cart_cart_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_cart_cart_id ON public.user_cart USING btree (cart_id);


--
-- TOC entry 4929 (class 1259 OID 16684)
-- Name: idx_user_cart_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_cart_user_id ON public.user_cart USING btree (user_id);


--
-- TOC entry 4937 (class 2606 OID 16675)
-- Name: billing_details fk_billing_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.billing_details
    ADD CONSTRAINT fk_billing_user FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4933 (class 2606 OID 16640)
-- Name: cart fk_cart_product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT fk_cart_product FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- TOC entry 4936 (class 2606 OID 16670)
-- Name: delivery_address fk_delivery_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.delivery_address
    ADD CONSTRAINT fk_delivery_user FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4934 (class 2606 OID 16650)
-- Name: order_table fk_order_cart; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_table
    ADD CONSTRAINT fk_order_cart FOREIGN KEY (cart_id) REFERENCES public.cart(id);


--
-- TOC entry 4935 (class 2606 OID 16645)
-- Name: order_table fk_order_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_table
    ADD CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4932 (class 2606 OID 16665)
-- Name: products fk_product_contains; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_product_contains FOREIGN KEY (contains_id) REFERENCES public.contains(id);


--
-- TOC entry 4938 (class 2606 OID 16660)
-- Name: user_cart fk_user_cart_cart; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_cart
    ADD CONSTRAINT fk_user_cart_cart FOREIGN KEY (cart_id) REFERENCES public.cart(id);


--
-- TOC entry 4939 (class 2606 OID 16655)
-- Name: user_cart fk_user_cart_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_cart
    ADD CONSTRAINT fk_user_cart_user FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2026-02-02 12:55:58

--
-- PostgreSQL database dump complete
--

\unrestrict gdegHOkupEoIXl6G4K2XPLkyt2tzCPvnMWPiFh2dfFBcwRS1ziy4SL5phro0Xag

