--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Homebrew)
-- Dumped by pg_dump version 14.9 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: contacts; Type: TABLE; Schema: public; Owner: tpl1122_1
--

CREATE TABLE public.contacts (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255),
    phone character varying(20) NOT NULL,
    notes text
);


ALTER TABLE public.contacts OWNER TO tpl1122_1;

--
-- Name: contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1122_1
--

CREATE SEQUENCE public.contacts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contacts_id_seq OWNER TO tpl1122_1;

--
-- Name: contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl1122_1
--

ALTER SEQUENCE public.contacts_id_seq OWNED BY public.contacts.id;


--
-- Name: contacts id; Type: DEFAULT; Schema: public; Owner: tpl1122_1
--

ALTER TABLE ONLY public.contacts ALTER COLUMN id SET DEFAULT nextval('public.contacts_id_seq'::regclass);


--
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: tpl1122_1
--

COPY public.contacts (id, name, email, phone, notes) FROM stdin;
2	Charlotte Johnson	charlotte@example.com	222-222-2222	This is Charlotte Johnson.
3	John Doe	johndoe@example.com	123-456-7890	This is John Doe.
4	Emily Wilson	emily@example.com	777-888-9999	This is Emily Wilson.
5	Michael Johnson	michael@example.com	555-123-4567	This is Michael Johnson.
6	Robert Brown	robert@example.com	111-222-3333	This is Robert Brown.
7	Sophia Wilson	sophia@example.com	444-555-6666	This is Sophia Wilson.
1	Allison Smith	allison@example.com	111-111-1111	This is Allison Smith.
8	David Lewis	david@example.com	999-888-7777	This is David Lee.
\.


--
-- Name: contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_1
--

SELECT pg_catalog.setval('public.contacts_id_seq', 11, true);


--
-- Name: contacts contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1122_1
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

