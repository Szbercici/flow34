--
-- PostgreSQL database dump
--

\restrict uRmEAAj1Tkbxe6PrxAy8flh59ydStvVOwEjovMMZzw9L6ogEOwgK37dX1TzChMM

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

-- Started on 2026-02-11 11:29:46

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
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    user_id bigint NOT NULL
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
-- TOC entry 234 (class 1259 OID 16708)
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
-- TOC entry 233 (class 1259 OID 16707)
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
-- TOC entry 5105 (class 0 OID 16624)
-- Dependencies: 232
-- Data for Name: billing_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.billing_details (id, user_id, postcode, city, road, house_number) FROM stdin;
\.


--
-- TOC entry 5099 (class 0 OID 16598)
-- Dependencies: 226
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart (id, created_at, user_id) FROM stdin;
\.


--
-- TOC entry 5107 (class 0 OID 16708)
-- Dependencies: 234
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart_items (id, cart_id, product_id, quantity, created_at) FROM stdin;
\.


--
-- TOC entry 5095 (class 0 OID 16577)
-- Dependencies: 222
-- Data for Name: contains; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contains (id, name) FROM stdin;
\.


--
-- TOC entry 5103 (class 0 OID 16616)
-- Dependencies: 230
-- Data for Name: delivery_address; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.delivery_address (id, user_id, postcode, city, road, house_number) FROM stdin;
\.


--
-- TOC entry 5101 (class 0 OID 16607)
-- Dependencies: 228
-- Data for Name: order_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_table (id, user_id, cart_id, address, created_at) FROM stdin;
\.


--
-- TOC entry 5097 (class 0 OID 16585)
-- Dependencies: 224
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, img, name, type, price, stock_count, category, contains_id, description, rate, count) FROM stdin;
12	static/images/microdrink-melon.png	Flow Watermelon	\N	12.99	0	Microdrink	\N	Refreshing watermelon flavored hydration cubes with vitamins and zero sugar	0	0
13	static/images/microdrink-energy.png	Flow Energy	\N	14.99	0	Microdrink	\N	Classic energy drink flavor boosted with caffeine for focus and power.	0	0
14	static/images/microdrink-forest-fruit.png	Flow Forest Fruit	\N	12.99	0	Microdrink	\N	A berry mix sensation. Tasty hydration with natural forest fruit flavors.	0	0
15	static/images/microdrink-lemon.png	Flow Lemon	\N	12.99	0	Microdrink	\N	Zesty and fresh lemon flavor. Simple hydration rich in vitamins.	0	0
16	static/images/microdrink-cucumber.png	Flow Green Electrolyte (Limited)	\N	16.99	0	Microdrink	\N	Limited edition green formula packed with essential electrolytes for active hydration.	0	0
17	static/images/microdrink-cola.png	Flow Cola	\N	12.99	0	Microdrink	\N	The classic cola taste, reimagined as refreshing hydration cubes with zero sugar and essential vitamins.	0	0
18	static/images/metal-water-bottle.png	Metal Water bottle	\N	12.99	0	Water Bottles	\N	Durable and stylish metal water bottle to keep you hydrated on the go.	0	0
19	static/images/blue-water-bottle.png	Water bottle blue	\N	8.99	0	Water Bottles	\N	Lightweight and convenient plastic water bottle for everyday use.	0	0
20	static/images/purple-water-bottle.png	Water bottle purple	\N	12.99	0	Water Bottles	\N	Lightweight and functional water bottle in a vibrant purple color.	0	0
21	static/images/red-water-bottle.png	Water bottle red	\N	10.99	0	Water Bottles	\N	Lightweight and functional water bottle in a vibrant red color.	0	0
\.


--
-- TOC entry 5093 (class 0 OID 16554)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, token, gender, phone_number, last_login, created_at, is_active, email, role) FROM stdin;
1	admin	$2a$10$/pojulwu/rot8vUvDfMqp.ku67Ty5DNGsmPUAR7HQ9a478AW1pr9S	\N	\N	\N	\N	2026-01-27 21:59:20.35256	t	admin@local.test	ADMIN
2	user	$2a$10$A8K0Em1pSAowfF7S3FD7AuJeEQJ3Q9R9uaW7ESj5KyKxE7N1eGmTi	\N	\N	\N	\N	2026-01-27 22:07:26.585363	t	asdasdkf	USER
3		$2a$10$fUYjyHcW4twNLoscp6k5ZOZ.xTpgE0aG51tQm0688O8vKk.2kPHbS	\N	\N	\N	\N	2026-01-28 10:04:57.614612	t		USER
4	proba1	$2a$10$tUffJqBwysJb7Qj6RKfqpOHbJsJbpxpRW3vZZEdkwFINjtl1LEXkW	\N	\N	\N	\N	2026-01-28 10:22:54.610714	t	\N	USER
\.


--
-- TOC entry 5113 (class 0 OID 0)
-- Dependencies: 231
-- Name: billing_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.billing_details_id_seq', 1, false);


--
-- TOC entry 5114 (class 0 OID 0)
-- Dependencies: 225
-- Name: cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_id_seq', 1, false);


--
-- TOC entry 5115 (class 0 OID 0)
-- Dependencies: 233
-- Name: cart_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_items_id_seq', 1, false);


--
-- TOC entry 5116 (class 0 OID 0)
-- Dependencies: 221
-- Name: contains_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contains_id_seq', 1, false);


--
-- TOC entry 5117 (class 0 OID 0)
-- Dependencies: 229
-- Name: delivery_address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.delivery_address_id_seq', 1, false);


--
-- TOC entry 5118 (class 0 OID 0)
-- Dependencies: 227
-- Name: order_table_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_table_id_seq', 1, false);


--
-- TOC entry 5119 (class 0 OID 0)
-- Dependencies: 223
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 21, true);


--
-- TOC entry 5120 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- TOC entry 4929 (class 2606 OID 16630)
-- Name: billing_details billing_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.billing_details
    ADD CONSTRAINT billing_details_pkey PRIMARY KEY (id);


--
-- TOC entry 4932 (class 2606 OID 16720)
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- TOC entry 4919 (class 2606 OID 16605)
-- Name: cart cart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (id);


--
-- TOC entry 4914 (class 2606 OID 16583)
-- Name: contains contains_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contains
    ADD CONSTRAINT contains_pkey PRIMARY KEY (id);


--
-- TOC entry 4926 (class 2606 OID 16622)
-- Name: delivery_address delivery_address_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.delivery_address
    ADD CONSTRAINT delivery_address_pkey PRIMARY KEY (id);


--
-- TOC entry 4924 (class 2606 OID 16614)
-- Name: order_table order_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_table
    ADD CONSTRAINT order_table_pkey PRIMARY KEY (id);


--
-- TOC entry 4917 (class 2606 OID 16596)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 4936 (class 2606 OID 16722)
-- Name: cart_items uq_cart_product; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT uq_cart_product UNIQUE (cart_id, product_id);


--
-- TOC entry 4908 (class 2606 OID 16575)
-- Name: users users_phone_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_phone_number_key UNIQUE (phone_number);


--
-- TOC entry 4910 (class 2606 OID 16569)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4912 (class 2606 OID 16571)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 4930 (class 1259 OID 16687)
-- Name: idx_billing_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_billing_user_id ON public.billing_details USING btree (user_id);


--
-- TOC entry 4933 (class 1259 OID 16733)
-- Name: idx_cart_items_cart_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_cart_items_cart_id ON public.cart_items USING btree (cart_id);


--
-- TOC entry 4934 (class 1259 OID 16734)
-- Name: idx_cart_items_product_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_cart_items_product_id ON public.cart_items USING btree (product_id);


--
-- TOC entry 4927 (class 1259 OID 16686)
-- Name: idx_delivery_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_delivery_user_id ON public.delivery_address USING btree (user_id);


--
-- TOC entry 4921 (class 1259 OID 16683)
-- Name: idx_order_cart_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_order_cart_id ON public.order_table USING btree (cart_id);


--
-- TOC entry 4922 (class 1259 OID 16682)
-- Name: idx_order_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_order_user_id ON public.order_table USING btree (user_id);


--
-- TOC entry 4915 (class 1259 OID 16680)
-- Name: idx_products_contains_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_products_contains_id ON public.products USING btree (contains_id);


--
-- TOC entry 4920 (class 1259 OID 16706)
-- Name: ux_cart_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ux_cart_user_id ON public.cart USING btree (user_id);


--
-- TOC entry 4942 (class 2606 OID 16675)
-- Name: billing_details fk_billing_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.billing_details
    ADD CONSTRAINT fk_billing_user FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4943 (class 2606 OID 16723)
-- Name: cart_items fk_cart_items_cart; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT fk_cart_items_cart FOREIGN KEY (cart_id) REFERENCES public.cart(id) ON DELETE CASCADE;


--
-- TOC entry 4944 (class 2606 OID 16728)
-- Name: cart_items fk_cart_items_product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT fk_cart_items_product FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- TOC entry 4938 (class 2606 OID 16701)
-- Name: cart fk_cart_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4941 (class 2606 OID 16670)
-- Name: delivery_address fk_delivery_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.delivery_address
    ADD CONSTRAINT fk_delivery_user FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4939 (class 2606 OID 16650)
-- Name: order_table fk_order_cart; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_table
    ADD CONSTRAINT fk_order_cart FOREIGN KEY (cart_id) REFERENCES public.cart(id);


--
-- TOC entry 4940 (class 2606 OID 16645)
-- Name: order_table fk_order_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_table
    ADD CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4937 (class 2606 OID 16665)
-- Name: products fk_product_contains; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_product_contains FOREIGN KEY (contains_id) REFERENCES public.contains(id);


-- Completed on 2026-02-11 11:29:47

--
-- PostgreSQL database dump complete
--

\unrestrict uRmEAAj1Tkbxe6PrxAy8flh59ydStvVOwEjovMMZzw9L6ogEOwgK37dX1TzChMM

