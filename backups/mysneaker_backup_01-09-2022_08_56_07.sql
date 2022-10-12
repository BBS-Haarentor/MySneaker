--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE foo;




--
-- Drop roles
--

DROP ROLE mysneaker;


--
-- Roles
--

CREATE ROLE mysneaker;
ALTER ROLE mysneaker WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:d889c9B8MzNF9PGOXouZZA==$OU/4Uf8V9KzP4eLjzf9RGDlbikti7lxR3Kgea4Ag7RU=:R/PIDUNFe98nNSo/s+Tl4xMkIIomNXtpNdZk1Geva7M=';






--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

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

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: mysneaker
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO mysneaker;

\connect template1

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

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: mysneaker
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: mysneaker
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

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

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: mysneaker
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "foo" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

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

--
-- Name: foo; Type: DATABASE; Schema: -; Owner: mysneaker
--

CREATE DATABASE foo WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE foo OWNER TO mysneaker;

\connect foo

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
-- Name: admingroup; Type: TABLE; Schema: public; Owner: mysneaker
--

CREATE TABLE public.admingroup (
    user_id integer NOT NULL,
    id integer NOT NULL,
    creation_date double precision NOT NULL,
    last_edit double precision NOT NULL
);


ALTER TABLE public.admingroup OWNER TO mysneaker;

--
-- Name: admingroup_id_seq; Type: SEQUENCE; Schema: public; Owner: mysneaker
--

CREATE SEQUENCE public.admingroup_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admingroup_id_seq OWNER TO mysneaker;

--
-- Name: admingroup_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mysneaker
--

ALTER SEQUENCE public.admingroup_id_seq OWNED BY public.admingroup.id;


--
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: mysneaker
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO mysneaker;

--
-- Name: basegroup; Type: TABLE; Schema: public; Owner: mysneaker
--

CREATE TABLE public.basegroup (
    user_id integer NOT NULL,
    id integer NOT NULL,
    creation_date double precision NOT NULL,
    last_edit double precision NOT NULL
);


ALTER TABLE public.basegroup OWNER TO mysneaker;

--
-- Name: basegroup_id_seq; Type: SEQUENCE; Schema: public; Owner: mysneaker
--

CREATE SEQUENCE public.basegroup_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.basegroup_id_seq OWNER TO mysneaker;

--
-- Name: basegroup_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mysneaker
--

ALTER SEQUENCE public.basegroup_id_seq OWNED BY public.basegroup.id;


--
-- Name: cycle; Type: TABLE; Schema: public; Owner: mysneaker
--

CREATE TABLE public.cycle (
    game_id integer NOT NULL,
    company_id integer NOT NULL,
    id integer NOT NULL,
    creation_date double precision NOT NULL,
    last_edit double precision NOT NULL,
    current_cycle_index integer NOT NULL,
    buy_sneaker integer NOT NULL,
    buy_paint integer NOT NULL,
    planned_production_1 integer NOT NULL,
    planned_production_2 integer NOT NULL,
    planned_production_3 integer NOT NULL,
    planned_workers_1 integer NOT NULL,
    planned_workers_2 integer NOT NULL,
    planned_workers_3 integer NOT NULL,
    include_from_stock integer NOT NULL,
    sales_planned integer NOT NULL,
    sales_bid double precision NOT NULL,
    tender_offer_price double precision NOT NULL,
    research_invest double precision NOT NULL,
    ad_invest double precision NOT NULL,
    take_credit double precision NOT NULL,
    payback_credit double precision NOT NULL,
    new_employees integer NOT NULL,
    let_go_employees integer NOT NULL,
    buy_new_machine integer NOT NULL
);


ALTER TABLE public.cycle OWNER TO mysneaker;

--
-- Name: cycle_id_seq; Type: SEQUENCE; Schema: public; Owner: mysneaker
--

CREATE SEQUENCE public.cycle_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cycle_id_seq OWNER TO mysneaker;

--
-- Name: cycle_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mysneaker
--

ALTER SEQUENCE public.cycle_id_seq OWNED BY public.cycle.id;


--
-- Name: game; Type: TABLE; Schema: public; Owner: mysneaker
--

CREATE TABLE public.game (
    id integer NOT NULL,
    creation_date double precision NOT NULL,
    last_edit double precision NOT NULL,
    grade_name character varying NOT NULL,
    owner_id integer NOT NULL,
    current_cycle_index integer NOT NULL,
    is_active boolean NOT NULL,
    scenario_order character varying NOT NULL,
    signup_enabled boolean NOT NULL
);


ALTER TABLE public.game OWNER TO mysneaker;

--
-- Name: game_id_seq; Type: SEQUENCE; Schema: public; Owner: mysneaker
--

CREATE SEQUENCE public.game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.game_id_seq OWNER TO mysneaker;

--
-- Name: game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mysneaker
--

ALTER SEQUENCE public.game_id_seq OWNED BY public.game.id;


--
-- Name: scenario; Type: TABLE; Schema: public; Owner: mysneaker
--

CREATE TABLE public.scenario (
    id integer NOT NULL,
    creation_date double precision NOT NULL,
    last_edit double precision NOT NULL,
    "char" character varying NOT NULL,
    description character varying,
    sneaker_price double precision NOT NULL,
    paint_price double precision NOT NULL,
    storage_fee_sneaker double precision NOT NULL,
    storage_fee_paint double precision NOT NULL,
    storage_fee_finished_sneaker double precision NOT NULL,
    employee_count_modifier_temporary integer NOT NULL,
    employee_count_modifier_permanent integer NOT NULL,
    factor_interest_rate double precision NOT NULL,
    employee_salary double precision NOT NULL,
    employee_signup_bonus double precision NOT NULL,
    employee_production_capacity integer NOT NULL,
    employee_cost_modfier double precision NOT NULL,
    sneaker_ask integer NOT NULL,
    factor_ad_take double precision NOT NULL,
    tender_offer_count integer NOT NULL,
    machine_purchase_allowed boolean NOT NULL,
    machine_purchase_cost1 double precision NOT NULL,
    machine_purchase_cost2 double precision NOT NULL,
    machine_purchase_cost3 double precision NOT NULL,
    machine_production_capacity1 integer NOT NULL,
    machine_production_capacity2 integer NOT NULL,
    machine_production_capacity3 integer NOT NULL,
    machine_employee_max integer NOT NULL,
    machine_maintainance_cost1 double precision NOT NULL,
    machine_maintainance_cost2 double precision NOT NULL,
    machine_maintainance_cost3 double precision NOT NULL,
    production_cost_per_sneaker1 double precision NOT NULL,
    production_cost_per_sneaker2 double precision NOT NULL,
    production_cost_per_sneaker3 double precision NOT NULL,
    employee_change_allowed boolean NOT NULL
);


ALTER TABLE public.scenario OWNER TO mysneaker;

--
-- Name: scenario_id_seq; Type: SEQUENCE; Schema: public; Owner: mysneaker
--

CREATE SEQUENCE public.scenario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.scenario_id_seq OWNER TO mysneaker;

--
-- Name: scenario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mysneaker
--

ALTER SEQUENCE public.scenario_id_seq OWNED BY public.scenario.id;


--
-- Name: stock; Type: TABLE; Schema: public; Owner: mysneaker
--

CREATE TABLE public.stock (
    game_id integer NOT NULL,
    company_id integer NOT NULL,
    id integer NOT NULL,
    creation_date double precision NOT NULL,
    last_edit double precision NOT NULL,
    current_cycle_index integer NOT NULL,
    sneaker_count integer NOT NULL,
    paint_count integer NOT NULL,
    finished_sneaker_count integer NOT NULL,
    employees_count integer NOT NULL,
    research_budget double precision NOT NULL,
    account_balance double precision NOT NULL,
    credit_taken double precision NOT NULL,
    real_sales integer NOT NULL,
    income_from_sales double precision NOT NULL,
    research_production_modifier double precision NOT NULL,
    machine_1_space integer NOT NULL,
    machine_2_space integer NOT NULL,
    machine_3_space integer NOT NULL,
    insolvent boolean NOT NULL,
    tender_sales integer NOT NULL,
    tender_price double precision NOT NULL
);


ALTER TABLE public.stock OWNER TO mysneaker;

--
-- Name: stock_id_seq; Type: SEQUENCE; Schema: public; Owner: mysneaker
--

CREATE SEQUENCE public.stock_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stock_id_seq OWNER TO mysneaker;

--
-- Name: stock_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mysneaker
--

ALTER SEQUENCE public.stock_id_seq OWNED BY public.stock.id;


--
-- Name: teachergroup; Type: TABLE; Schema: public; Owner: mysneaker
--

CREATE TABLE public.teachergroup (
    user_id integer NOT NULL,
    id integer NOT NULL,
    creation_date double precision NOT NULL,
    last_edit double precision NOT NULL
);


ALTER TABLE public.teachergroup OWNER TO mysneaker;

--
-- Name: teachergroup_id_seq; Type: SEQUENCE; Schema: public; Owner: mysneaker
--

CREATE SEQUENCE public.teachergroup_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.teachergroup_id_seq OWNER TO mysneaker;

--
-- Name: teachergroup_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mysneaker
--

ALTER SEQUENCE public.teachergroup_id_seq OWNED BY public.teachergroup.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: mysneaker
--

CREATE TABLE public."user" (
    game_id integer,
    id integer NOT NULL,
    creation_date double precision NOT NULL,
    last_edit double precision NOT NULL,
    name character varying NOT NULL,
    last_login double precision NOT NULL,
    email character varying,
    hashed_pw character varying NOT NULL,
    is_active boolean NOT NULL
);


ALTER TABLE public."user" OWNER TO mysneaker;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: mysneaker
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO mysneaker;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mysneaker
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: admingroup id; Type: DEFAULT; Schema: public; Owner: mysneaker
--

ALTER TABLE ONLY public.admingroup ALTER COLUMN id SET DEFAULT nextval('public.admingroup_id_seq'::regclass);


--
-- Name: basegroup id; Type: DEFAULT; Schema: public; Owner: mysneaker
--

ALTER TABLE ONLY public.basegroup ALTER COLUMN id SET DEFAULT nextval('public.basegroup_id_seq'::regclass);


--
-- Name: cycle id; Type: DEFAULT; Schema: public; Owner: mysneaker
--

ALTER TABLE ONLY public.cycle ALTER COLUMN id SET DEFAULT nextval('public.cycle_id_seq'::regclass);


--
-- Name: game id; Type: DEFAULT; Schema: public; Owner: mysneaker
--

ALTER TABLE ONLY public.game ALTER COLUMN id SET DEFAULT nextval('public.game_id_seq'::regclass);


--
-- Name: scenario id; Type: DEFAULT; Schema: public; Owner: mysneaker
--

ALTER TABLE ONLY public.scenario ALTER COLUMN id SET DEFAULT nextval('public.scenario_id_seq'::regclass);


--
-- Name: stock id; Type: DEFAULT; Schema: public; Owner: mysneaker
--

ALTER TABLE ONLY public.stock ALTER COLUMN id SET DEFAULT nextval('public.stock_id_seq'::regclass);


--
-- Name: teachergroup id; Type: DEFAULT; Schema: public; Owner: mysneaker
--

ALTER TABLE ONLY public.teachergroup ALTER COLUMN id SET DEFAULT nextval('public.teachergroup_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: mysneaker
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: admingroup; Type: TABLE DATA; Schema: public; Owner: mysneaker
--

COPY public.admingroup (user_id, id, creation_date, last_edit) FROM stdin;
1	1	1662012320.44111	1662012320.441129
\.


--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: mysneaker
--

COPY public.alembic_version (version_num) FROM stdin;
5fc1ff4ab7db
\.


--
-- Data for Name: basegroup; Type: TABLE DATA; Schema: public; Owner: mysneaker
--

COPY public.basegroup (user_id, id, creation_date, last_edit) FROM stdin;
19	12	1661163910.917812	1661163910.917834
20	13	1661163910.917812	1661163910.917834
26	20	1661195369.157787	1661195369.157808
27	21	1661195369.157787	1661195369.157808
28	22	1661195369.157787	1661195369.157808
30	26	1661195369.157787	1661195369.157808
31	27	1661195369.157787	1661195369.157808
32	29	1661195369.157787	1661195369.157808
33	31	1661858283.850842	1661858283.850864
34	32	1661858283.850842	1661858283.850864
35	33	1661858283.850842	1661858283.850864
36	34	1661858283.850842	1661858283.850864
37	35	1661858283.850842	1661858283.850864
39	37	1661858283.850842	1661858283.850864
40	38	1661858283.850842	1661858283.850864
41	39	1661858283.850842	1661858283.850864
43	43	1661858283.850842	1661858283.850864
44	44	1661858283.850842	1661858283.850864
45	45	1661858283.850842	1661858283.850864
\.


--
-- Data for Name: cycle; Type: TABLE DATA; Schema: public; Owner: mysneaker
--

COPY public.cycle (game_id, company_id, id, creation_date, last_edit, current_cycle_index, buy_sneaker, buy_paint, planned_production_1, planned_production_2, planned_production_3, planned_workers_1, planned_workers_2, planned_workers_3, include_from_stock, sales_planned, sales_bid, tender_offer_price, research_invest, ad_invest, take_credit, payback_credit, new_employees, let_go_employees, buy_new_machine) FROM stdin;
\.


--
-- Data for Name: game; Type: TABLE DATA; Schema: public; Owner: mysneaker
--

COPY public.game (id, creation_date, last_edit, grade_name, owner_id, current_cycle_index, is_active, scenario_order, signup_enabled) FROM stdin;
22	1661935731.150699	1661935731.150718	G11B mySneaker	12	0	t	ABCDEFGHI	t
21	1661935611.200299	1661935611.200314	G11d Hauptspiel	11	0	t	ABCDEFGHIJ	t
23	1661935914.272723	1661935914.272732	G11d Testspiel	11	0	t	ABCDEFGHIJ	t
16	1661703306.600392	1661703306.600401	G11C	9	0	t	ABCDEFGHIJ	t
8	1661151631.7087	1661151631.708714	TEST	8	0	t	ABCD	f
13	1661164140.646569	1661164140.646579	G11durchstarter2	11	0	t	ABCDEFGHIJ	t
12	1661154442.203457	1661154442.203466	G11a	13	0	t	ABCDEFGHIJ	t
15	1661529329.892145	1661529329.892155	FA2A-B	3	0	t	ABCDEFG	t
\.


--
-- Data for Name: scenario; Type: TABLE DATA; Schema: public; Owner: mysneaker
--

COPY public.scenario (id, creation_date, last_edit, "char", description, sneaker_price, paint_price, storage_fee_sneaker, storage_fee_paint, storage_fee_finished_sneaker, employee_count_modifier_temporary, employee_count_modifier_permanent, factor_interest_rate, employee_salary, employee_signup_bonus, employee_production_capacity, employee_cost_modfier, sneaker_ask, factor_ad_take, tender_offer_count, machine_purchase_allowed, machine_purchase_cost1, machine_purchase_cost2, machine_purchase_cost3, machine_production_capacity1, machine_production_capacity2, machine_production_capacity3, machine_employee_max, machine_maintainance_cost1, machine_maintainance_cost2, machine_maintainance_cost3, production_cost_per_sneaker1, production_cost_per_sneaker2, production_cost_per_sneaker3, employee_change_allowed) FROM stdin;
1	1662012320.610944	1662012320.610964	A	Politik  Aufgrund der hohen Überschüsse in den Sozialkassen ist in den kommenden Perioden mit einer Absenkung der Sozialbeiträge (Personalnebenkosten) zu rechnen.  Markteinschätzung  Der wirtschaftliche Aufschwung gewinnt an Dynamik. Die Nachfrage am Markt nach Sneakern dürfte gegenüber der Vorperiode um ca. 50 % zunehmen. 	60	10	4	1	8	0	0	0.04	400	100	10	0.2	400	0.1	0	t	12000	25000	45000	200	500	1000	10	4000	6000	8000	60	50	40	t
2	1662012320.610944	1662012320.610964	B	Politik  Aufgrund der hohen Überschüsse in den Sozialkassen sinken die die Personalnebenkosten von derzeit 20% auf 18 %.  Markteinschätzung  Wichtige Indexwerte wie der IFO-Geschäftsklimaindex oder das DIW-Konjunkturbarometer steigen weiterhin deutlich, was eine gesteigerte Wirtschaftsleistung für die kommende Periode erwarten lässt. Die Nachfrage am Markt nach Sneakern dürfte gegenüber der Vorperiode weiter zunehmen.	65	10	4	1	8	0	0	0.04	400	100	10	0.18	600	0.1	0	f	12000	25000	45000	200	500	1000	10	4000	6000	8000	60	50	40	t
3	1662012320.610944	1662012320.610964	C	Politik  Aufgrund der prosperierenden Wirtschaftslage müssen Sie nach den Nullrunden der Perioden Eins und Zwei die Löhne und Gehälter um 10% anpassen.  Markteinschätzung  Die Nachfrage am Markt nach Sneakern dürfte gegenüber der Vorperiode weiter zunehmen. Eine erste Ausschreibung erfolgt in Höhe von 200 Einheiten. Verkauft wird an den günstigsten Anbieter.	65	12	4	1	8	0	0	0.04	440	100	10	0.18	800	0.1	200	t	12000	25000	45000	200	500	1000	10	4000	6000	8000	60	50	40	t
4	1662012320.610944	1662012320.610964	D	Politik  Aufgrund gesetzlicher Neuerungen bei der Dokumentation des Bewerbungsprozesses verteuert dieser sich von 100,00 € auf 200,00 €.  Markteinschätzung  Weiterhin kann ein kräftiges Wachstum auf dem Markt für Sneaker erwartet werden, dass mittelfristig anhalten wird.	70	12	4	1	8	0	0	0.04	440	200	10	0.18	1000	0.1	200	t	12000	25000	45000	200	500	1000	10	4000	6000	8000	60	50	40	t
5	1662012320.610944	1662012320.610964	E	Politik  Markteinschätzung  Die Kapazitätsgrenze für den Sneakermarkt ist nicht erreicht, dennoch erwarten die ersten Experten eine baldige Marktsättigung. Das ifo-Institut ist hingegen von einem weiterhin robusten Wachstume überzeugt. Interne Unternehmensfaktoren  Aufgrund des hohen Marktwachstums hat die Personalabteilung massive Probleme geeignete Mitarbeiter*innen zu finden, d. h. in dieser Periode kann kein neues Personal eingestellt werden.	80	15	4	1	8	0	0	0.04	440	200	10	0.18	1200	0.1	300	f	12000	25000	45000	200	500	1000	10	4000	6000	8000	60	50	40	t
6	1662012320.610944	1662012320.610964	F	Politik Markteinschätzung  Die Kapazitätsgrenze für den Sneakermarkt ist nicht erreicht, dennoch erwarten die ersten Experten eine baldige Marktsättigung. Das ifo-Institut ist hingegen von einem weiterhin robusten Wachstume überzeugt.	80	15	4	1	8	0	0	0.04	440	200	10	0.18	1500	0.1	400	t	12000	25000	45000	200	500	1000	10	4000	6000	8000	60	50	40	t
7	1662012320.610944	1662012320.610964	G	Markteinschätzung  Aufgrund der gesunkenen Konjunkturerwartungen ist die Grenze des Wachstums erreicht, voraussichtlich wird der Gesamtmarkt stabil bleiben. Kurz- bis mittelfristig sind jedoch Rückschläge nicht ausgeschlossen.	85	16	4	1	8	0	0	0.04	440	200	10	0.18	1500	0.1	500	t	12000	25000	45000	200	500	1000	10	4000	6000	8000	60	50	40	t
8	1662012320.610944	1662012320.610964	H	Markteinschätzung  Der negative Konjunkturausblick hat sich bestätigt, es ist von einem leichten Rückgang im Gesamtmarkt auszugehen.	75	12	4	1	8	0	0	0.04	440	200	10	0.18	1400	0.1	300	t	12000	25000	45000	200	500	1000	10	4000	6000	8000	60	50	40	t
9	1662012320.610944	1662012320.610964	I	Markteinschätzung  Die Abwärtsbewegung der Wirtschaft ist nun nicht mehr zu stoppen, wesentliche Branchen befinden sich im freien Fall. Die gestiegene Sparneigung der Konsumenten trifft auch den Markt für Sneaker, ein deutlicher Einbruch ist erwartbar.	65	10	4	1	8	0	0	0.04	440	200	10	0.18	1000	0.1	100	f	12000	25000	45000	200	500	1000	10	4000	6000	8000	60	50	40	t
10	1662012320.610944	1662012320.610964	J	Markteinschätzung  Nach dem drastischen Einbruch des Marktes deutet sich nunmehr eine vorsichtige Erholung an.	65	10	4	1	8	0	0	0.04	440	200	10	0.18	1200	0.1	200	f	12000	25000	45000	200	500	1000	10	4000	6000	8000	60	50	40	t
\.


--
-- Data for Name: stock; Type: TABLE DATA; Schema: public; Owner: mysneaker
--

COPY public.stock (game_id, company_id, id, creation_date, last_edit, current_cycle_index, sneaker_count, paint_count, finished_sneaker_count, employees_count, research_budget, account_balance, credit_taken, real_sales, income_from_sales, research_production_modifier, machine_1_space, machine_2_space, machine_3_space, insolvent, tender_sales, tender_price) FROM stdin;
12	30	1	1662042873.124032	1662042873.124039	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	0	0
23	33	2	1662042873.124032	1662042873.124039	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	0	0
22	34	3	1662042873.124032	1662042873.124039	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	0	0
12	27	4	1662042873.124032	1662042873.124039	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	0	0
22	35	5	1662042873.124032	1662042873.124039	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	0	0
21	41	6	1662042873.124032	1662042873.124039	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	0	0
21	43	7	1662042873.124032	1662042873.124039	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	0	0
13	19	8	1662042873.124032	1662042873.124039	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	0	0
21	44	9	1662042873.124032	1662042873.124039	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	0	0
12	28	10	1662042873.124032	1662042873.124039	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	0	0
12	26	11	1662042873.124032	1662042873.124039	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	0	0
13	20	12	1662042873.124032	1662042873.124039	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	0	0
22	36	13	1662042873.124032	1662042873.124039	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	0	0
22	37	14	1662042873.124032	1662042873.124039	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	0	0
12	31	15	1662042873.124032	1662042873.124039	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	0	0
22	39	16	1662042873.124032	1662042873.124039	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	0	0
21	45	17	1662042873.124032	1662042873.124039	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	0	0
21	40	18	1662042873.124032	1662042873.124039	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	0	0
15	32	19	1662042873.124032	1662042873.124039	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	0	0
\.


--
-- Data for Name: teachergroup; Type: TABLE DATA; Schema: public; Owner: mysneaker
--

COPY public.teachergroup (user_id, id, creation_date, last_edit) FROM stdin;
2	1	1661115128.302862	1661115128.302881
3	2	1661115128.302862	1661115128.302881
4	3	1661115128.302862	1661115128.302881
8	4	1661147107.21766	1661147107.217678
9	5	1661147107.21766	1661147107.217678
10	6	1661147107.21766	1661147107.217678
11	7	1661147107.21766	1661147107.217678
12	8	1661147107.21766	1661147107.217678
13	9	1661147107.21766	1661147107.217678
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: mysneaker
--

COPY public."user" (game_id, id, creation_date, last_edit, name, last_login, email, hashed_pw, is_active) FROM stdin;
\N	1	1662012320.459876	1662015052.11034	admin	1662015052.107442	\N	$2b$12$EeJuKX3L999goxO.RHv39.UGezSrTxrMdPuFPVUwVTtxzLFA2monS	t
\N	2	1661115128.325654	1661115128.325676	teacher	1661115128.325691	\N	$2b$12$f.xpj/d8v91qlo/uwUXoseQ3WH9YrSphkOGZbyJl10T0SvgJCzJOq	t
12	30	1661195369.18641	1661195369.186429	TN Customs	1661503843.961828	\N	$2b$12$qjlleYgeH1Kg6KUIazQ3luaPf/skQX788YeY08KaMnrTZGpGqdJ/u	t
\N	4	1661115128.325654	1661115128.325676	t2	1661115128.325691	\N	$2b$12$0EO23h0QNiHtP8ev7yiM3OMvG3em0X3CgHs30cKUz/kGek7auAG46	t
\N	12	1661147107.239957	1661147107.239976	koe	1661935153.273119	\N	$2b$12$ahtjb63iLKmgUMNWwgzmtuUHCm5hQOtPDgHy2npcuaa.6idnPYBci	t
23	33	1661858283.879681	1661858283.8797	mws	1661935989.081608	\N	$2b$12$dOnqdmOE1TxJ.oYehenht.d1gVxozZyqt6KwTGIKm4r8.PRL20p1C	t
22	34	1661858283.879681	1661858283.8797	FlotteFlitzer	1661936042.175386	\N	$2b$12$kmLAMbuApy7vdmUxjyJROOXPbnN6OKwEwQM/N1U7lahIWDaJnnHNe	t
\N	3	1661115128.325654	1661115128.325676	t	1661946263.246781	\N	$2b$12$IOV2e8eInKsOEvwhQPDVMOxTH1yiy.xHhCtTl1.LLqr6hkl1eBZFa	t
12	27	1661195369.18641	1661195369.186429	Wolken Treter	1661523450.749484	\N	$2b$12$4/yFB/Ekr.dCfKC6p7K9o.enjIVMQC9z.cybGiby8OnyCmpRJoO9.	t
\N	10	1661147107.239957	1661147107.239976	kf	1661152285.548218	\N	$2b$12$j1qhHoHn31Wjv7X3ablFNuMJ0soOuKUNStAkLJ5sam34aFFJ821eq	t
\N	11	1661147107.239957	1661147107.239976	mw	1661936062.185673	\N	$2b$12$IxZKkFz2vwO4C6Qblscf9u3oXDeAxbeOv2YfdLgzZg236uwWw1SJ6	t
22	35	1661858283.879681	1661858283.8797	4XL	1661936100.323083	\N	$2b$12$g3czPPWOtfJbElMoFRhz3eO/qZhtyL91vpw5ZuhQNbHV9Dy8CDi3W	t
21	41	1661858283.879681	1661858283.8797	sneakerz4u	1661973808.888704	\N	$2b$12$On8cDyFXT3tvkUkOGy8p0.odbcX3TStEnGrHKX6CNSFNS0RuXb/ki	t
21	43	1661858283.879681	1661858283.8797	Skoers	1661984103.422713	\N	$2b$12$IMckVqTJZuXOtfaSRD5BmOP4J9JfPnGvAshWv2LtEawggy6RIb8g.	t
13	19	1661163910.946311	1661163910.94633	Kerstin	1661164302.822243	\N	$2b$12$xa7WRX2c2mqZb2NY.PqdGO7V/i3EvRH7Mtg5AK979A5l8ElmOfuve	t
21	44	1661858283.879681	1661858283.8797	EvoSneakers	1662011100.053098	\N	$2b$12$un9szatsBo2YOK7LloWRFOHitEkDh5a05/1rRoOVzlYK.1uX6wGhu	t
\N	8	1661147107.239957	1661147107.239976	ls	1661158094.991301	\N	$2b$12$Kvgwqm7LgUArKa0f2/si6OZ2B1mbC9OA2TkWzYCi5CoMqzqnh0KX2	t
12	28	1661195369.18641	1661195369.186429	NW	1661503669.109851	\N	$2b$12$rQa1JWxnPuFwOWh5GQiWmeiTquxmwtyI0ZcZdSVa6M393Vn/eJmca	t
12	26	1661195369.18641	1661195369.186429	SNKRS-Adiccted	1661503680.794893	\N	$2b$12$4HBzPySfCfV14GnYJFgGf.OAwp9a5iJRme8n3q98tO2JWCACl3KQG	t
13	20	1661163910.946311	1661163910.94633	Jenny	1661164850.397384	\N	$2b$12$PQ.5Ym5bFHccFaWlfxQ0ieinN6mi3.0bdrmcAzIvEdjRVsUbsG4ka	t
22	36	1661858283.879681	1661858283.8797	Customized Step	1661936307.192559	\N	$2b$12$gQWV0H4yrDIF0k3BRNWXN.xcRhhJsWcOqF1XgPOzdOYMQYydyj0kq	t
22	37	1661858283.879681	1661858283.8797	die Simps	1661936397.395207	\N	$2b$12$4B9epZ7mdbTjkkGXRX6J/eq7DHYZdS1yO4D/k4PtjHwMVFsSoC.oG	t
\N	13	1661147107.239957	1661147107.239976	mj	1661869593.262752	\N	$2b$12$UJeC7m/Un3F.ZMmxf5dDw.1jKCFk9O9/ARb3Uwx39HS93RLJEP.8y	t
12	31	1661195369.18641	1661195369.186429	YourSneaker	1661874966.463895	\N	$2b$12$8Xlo7iM0fx7Qtm7SYHQH0OlW6caM.lwHKyJFJkzovvq0KnTEXMhgu	t
22	39	1661858283.879681	1661858283.8797	AL-PASO	1661858283.879715	\N	$2b$12$V22tuayUTagGxm8Y2J3LzOTLZmQeWdYjWrHVBeNJDvp8WMrmEAR5.	t
21	45	1661858283.879681	1661858283.8797	SneaCus	1661969512.948352	\N	$2b$12$TQjLUUK4d2bCxsOhvBE48.061p0SArJGdgi6F8pfX3zNlGAvarXlK	t
21	40	1661858283.879681	1661858283.8797	hideandsneakers	1661972731.634326	\N	$2b$12$GXYE/dT5ZBgS0P6vJgjAeO3pWNeU3WOZgSfU/SJBUvRL9cm8VjfLK	t
\N	9	1661147107.239957	1661147107.239976	kg	1661972767.777453	\N	$2b$12$QDahJow8g26C/AjRCLZnTeU3eNFuNWHhoIjwvH7.m5J8vDA/.y7Em	t
15	32	1661195369.18641	1661195369.186429	s1	1661941475.136382	\N	$2b$12$rlDT/ZsLJOSWG6.fn6mLWunJllJmkjfC8gOT/6AipEzL.bkXSn/0W	t
\.


--
-- Name: admingroup_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mysneaker
--

SELECT pg_catalog.setval('public.admingroup_id_seq', 1, true);


--
-- Name: basegroup_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mysneaker
--

SELECT pg_catalog.setval('public.basegroup_id_seq', 1, false);


--
-- Name: cycle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mysneaker
--

SELECT pg_catalog.setval('public.cycle_id_seq', 1, false);


--
-- Name: game_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mysneaker
--

SELECT pg_catalog.setval('public.game_id_seq', 1, false);


--
-- Name: scenario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mysneaker
--

SELECT pg_catalog.setval('public.scenario_id_seq', 10, true);


--
-- Name: stock_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mysneaker
--

SELECT pg_catalog.setval('public.stock_id_seq', 1, false);


--
-- Name: teachergroup_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mysneaker
--

SELECT pg_catalog.setval('public.teachergroup_id_seq', 1, false);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mysneaker
--

SELECT pg_catalog.setval('public.user_id_seq', 1, true);


--
-- Name: admingroup admingroup_pkey; Type: CONSTRAINT; Schema: public; Owner: mysneaker
--

ALTER TABLE ONLY public.admingroup
    ADD CONSTRAINT admingroup_pkey PRIMARY KEY (id);


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: mysneaker
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: basegroup basegroup_pkey; Type: CONSTRAINT; Schema: public; Owner: mysneaker
--

ALTER TABLE ONLY public.basegroup
    ADD CONSTRAINT basegroup_pkey PRIMARY KEY (id);


--
-- Name: cycle cycle_pkey; Type: CONSTRAINT; Schema: public; Owner: mysneaker
--

ALTER TABLE ONLY public.cycle
    ADD CONSTRAINT cycle_pkey PRIMARY KEY (id);


--
-- Name: game game_pkey; Type: CONSTRAINT; Schema: public; Owner: mysneaker
--

ALTER TABLE ONLY public.game
    ADD CONSTRAINT game_pkey PRIMARY KEY (id);


--
-- Name: scenario scenario_char_key; Type: CONSTRAINT; Schema: public; Owner: mysneaker
--

ALTER TABLE ONLY public.scenario
    ADD CONSTRAINT scenario_char_key UNIQUE ("char");


--
-- Name: scenario scenario_pkey; Type: CONSTRAINT; Schema: public; Owner: mysneaker
--

ALTER TABLE ONLY public.scenario
    ADD CONSTRAINT scenario_pkey PRIMARY KEY (id);


--
-- Name: stock stock_pkey; Type: CONSTRAINT; Schema: public; Owner: mysneaker
--

ALTER TABLE ONLY public.stock
    ADD CONSTRAINT stock_pkey PRIMARY KEY (id);


--
-- Name: teachergroup teachergroup_pkey; Type: CONSTRAINT; Schema: public; Owner: mysneaker
--

ALTER TABLE ONLY public.teachergroup
    ADD CONSTRAINT teachergroup_pkey PRIMARY KEY (id);


--
-- Name: user user_name_key; Type: CONSTRAINT; Schema: public; Owner: mysneaker
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_name_key UNIQUE (name);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: mysneaker
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: ix_admingroup_id; Type: INDEX; Schema: public; Owner: mysneaker
--

CREATE INDEX ix_admingroup_id ON public.admingroup USING btree (id);


--
-- Name: ix_basegroup_id; Type: INDEX; Schema: public; Owner: mysneaker
--

CREATE INDEX ix_basegroup_id ON public.basegroup USING btree (id);


--
-- Name: ix_cycle_id; Type: INDEX; Schema: public; Owner: mysneaker
--

CREATE INDEX ix_cycle_id ON public.cycle USING btree (id);


--
-- Name: ix_game_id; Type: INDEX; Schema: public; Owner: mysneaker
--

CREATE INDEX ix_game_id ON public.game USING btree (id);


--
-- Name: ix_scenario_id; Type: INDEX; Schema: public; Owner: mysneaker
--

CREATE INDEX ix_scenario_id ON public.scenario USING btree (id);


--
-- Name: ix_stock_id; Type: INDEX; Schema: public; Owner: mysneaker
--

CREATE INDEX ix_stock_id ON public.stock USING btree (id);


--
-- Name: ix_teachergroup_id; Type: INDEX; Schema: public; Owner: mysneaker
--

CREATE INDEX ix_teachergroup_id ON public.teachergroup USING btree (id);


--
-- Name: ix_user_id; Type: INDEX; Schema: public; Owner: mysneaker
--

CREATE INDEX ix_user_id ON public."user" USING btree (id);


--
-- Name: ix_user_name; Type: INDEX; Schema: public; Owner: mysneaker
--

CREATE INDEX ix_user_name ON public."user" USING btree (name);


--
-- Name: admingroup admingroup_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mysneaker
--

ALTER TABLE ONLY public.admingroup
    ADD CONSTRAINT admingroup_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: basegroup basegroup_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mysneaker
--

ALTER TABLE ONLY public.basegroup
    ADD CONSTRAINT basegroup_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cycle cycle_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mysneaker
--

ALTER TABLE ONLY public.cycle
    ADD CONSTRAINT cycle_company_id_fkey FOREIGN KEY (company_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cycle cycle_game_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mysneaker
--

ALTER TABLE ONLY public.cycle
    ADD CONSTRAINT cycle_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.game(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: game fk_owner_id; Type: FK CONSTRAINT; Schema: public; Owner: mysneaker
--

ALTER TABLE ONLY public.game
    ADD CONSTRAINT fk_owner_id FOREIGN KEY (owner_id) REFERENCES public."user"(id);


--
-- Name: stock stock_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mysneaker
--

ALTER TABLE ONLY public.stock
    ADD CONSTRAINT stock_company_id_fkey FOREIGN KEY (company_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: stock stock_game_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mysneaker
--

ALTER TABLE ONLY public.stock
    ADD CONSTRAINT stock_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.game(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: teachergroup teachergroup_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mysneaker
--

ALTER TABLE ONLY public.teachergroup
    ADD CONSTRAINT teachergroup_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user user_game_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mysneaker
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.game(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

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

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: mysneaker
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO mysneaker;

\connect postgres

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

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: mysneaker
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

