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
ALTER ROLE mysneaker WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:roG1l5Duy7LKmldKfJSc6Q==$oMp8AUtB6SL8TLxBkRnHGK1h8FUXxAyW0IsPlcxixQc=:Db8keUUDbHLo9AEIsREPUCeTR5YLh+M777LM8iV6LS8=';






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
    user_id integer,
    id integer NOT NULL,
    creation_date double precision,
    last_edit double precision
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
    user_id integer,
    id integer NOT NULL,
    creation_date double precision,
    last_edit double precision
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
    game_id integer,
    company_id integer,
    id integer NOT NULL,
    creation_date double precision,
    last_edit double precision,
    current_cycle_index integer,
    buy_sneaker integer,
    buy_paint integer,
    planned_production_1 integer,
    planned_production_2 integer,
    planned_production_3 integer,
    planned_workers_1 integer,
    planned_workers_2 integer,
    planned_workers_3 integer,
    include_from_stock integer,
    sales_planned integer,
    sales_bid double precision,
    tender_offer_price double precision,
    research_invest double precision,
    ad_invest double precision,
    take_credit double precision,
    payback_credit double precision,
    new_employees integer,
    let_go_employees integer,
    buy_new_machine integer
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
    creation_date double precision,
    last_edit double precision,
    grade_name character varying,
    owner_id integer NOT NULL,
    current_cycle_index integer,
    is_active boolean,
    scenario_order character varying,
    signup_enabled boolean
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
    creation_date double precision,
    last_edit double precision,
    "char" character varying NOT NULL,
    description character varying NOT NULL,
    sneaker_price double precision,
    paint_price double precision,
    storage_fee_sneaker double precision,
    storage_fee_paint double precision,
    storage_fee_finished_sneaker double precision,
    employee_count_modifier_temporary integer,
    employee_count_modifier_permanent integer,
    factor_interest_rate double precision,
    employee_salary double precision,
    employee_signup_bonus double precision,
    employee_production_capacity integer,
    employee_cost_modfier double precision,
    sneaker_ask integer,
    factor_ad_take double precision,
    tender_offer_count integer,
    machine_purchase_allowed boolean,
    machine_purchase_cost1 double precision,
    machine_purchase_cost2 double precision,
    machine_purchase_cost3 double precision,
    machine_production_capacity1 integer,
    machine_production_capacity2 integer,
    machine_production_capacity3 integer,
    machine_employee_max integer,
    machine_maintainance_cost1 double precision,
    machine_maintainance_cost2 double precision,
    machine_maintainance_cost3 double precision,
    production_cost_per_sneaker1 double precision,
    production_cost_per_sneaker2 double precision,
    production_cost_per_sneaker3 double precision
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
    game_id integer,
    company_id integer,
    id integer NOT NULL,
    creation_date timestamp without time zone,
    last_edit double precision,
    current_cycle_index integer,
    sneaker_count integer,
    paint_count integer,
    finished_sneaker_count integer,
    employees_count integer,
    research_budget double precision,
    account_balance double precision,
    credit_taken double precision,
    real_sales integer,
    income_from_sales double precision,
    research_production_modifier double precision,
    machine_1_space integer,
    machine_2_space integer,
    machine_3_space integer,
    insolvent boolean,
    tender_sales integer,
    tender_price double precision
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
    user_id integer,
    id integer NOT NULL,
    creation_date double precision,
    last_edit double precision
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
    creation_date double precision,
    last_edit double precision,
    name character varying,
    last_login double precision,
    email character varying,
    hashed_pw character varying NOT NULL,
    is_active boolean
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
1	1	1661115128.306641	1661115128.30666
\.


--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: mysneaker
--

COPY public.alembic_version (version_num) FROM stdin;
e7f2629bc772
\.


--
-- Data for Name: basegroup; Type: TABLE DATA; Schema: public; Owner: mysneaker
--

COPY public.basegroup (user_id, id, creation_date, last_edit) FROM stdin;
\N	6	1661151781.23017	1661151781.230192
\N	8	1661151781.23017	1661151781.230192
\N	10	1661151781.23017	1661151781.230192
19	12	1661163910.917812	1661163910.917834
20	13	1661163910.917812	1661163910.917834
\N	14	1661173511.242517	1661173511.242539
26	20	1661195369.157787	1661195369.157808
27	21	1661195369.157787	1661195369.157808
28	22	1661195369.157787	1661195369.157808
\N	24	1661195369.157787	1661195369.157808
\N	25	1661195369.157787	1661195369.157808
30	26	1661195369.157787	1661195369.157808
31	27	1661195369.157787	1661195369.157808
\N	28	1661195369.157787	1661195369.157808
32	29	1661195369.157787	1661195369.157808
\N	30	1661858283.850842	1661858283.850864
33	31	1661858283.850842	1661858283.850864
34	32	1661858283.850842	1661858283.850864
35	33	1661858283.850842	1661858283.850864
36	34	1661858283.850842	1661858283.850864
37	35	1661858283.850842	1661858283.850864
39	37	1661858283.850842	1661858283.850864
40	38	1661858283.850842	1661858283.850864
41	39	1661858283.850842	1661858283.850864
\N	40	1661858283.850842	1661858283.850864
\N	42	1661858283.850842	1661858283.850864
43	43	1661858283.850842	1661858283.850864
44	44	1661858283.850842	1661858283.850864
45	45	1661858283.850842	1661858283.850864
\.


--
-- Data for Name: cycle; Type: TABLE DATA; Schema: public; Owner: mysneaker
--

COPY public.cycle (game_id, company_id, id, creation_date, last_edit, current_cycle_index, buy_sneaker, buy_paint, planned_production_1, planned_production_2, planned_production_3, planned_workers_1, planned_workers_2, planned_workers_3, include_from_stock, sales_planned, sales_bid, tender_offer_price, research_invest, ad_invest, take_credit, payback_credit, new_employees, let_go_employees, buy_new_machine) FROM stdin;
13	19	40	1661164359.904301	1661164359.90431	0	100	200	100	0	0	5	0	0	0	100	235	0	0	0	0	0	0	0	0
13	20	41	1661164421.462776	1661164421.46279	0	75	140	75	0	0	4	0	0	0	75	155	0	0	0	0	0	0	0	0
15	32	51	1661537254.632215	1661537254.632224	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
15	32	52	1661640473.483223	1661640473.483232	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
15	32	53	1661640725.916744	1661640725.91676	0	2	4	2	0	0	1	0	0	0	2	300	0	0	0	0	0	0	0	0
15	32	54	1661761808.317473	1661761808.317492	1	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
15	32	55	1661761818.904944	1661761818.904971	1	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
15	32	56	1661761843.642056	1661761843.642074	2	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
15	32	57	1661761865.361428	1661761865.361446	3	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	3
15	32	58	1661850031.510777	1661850031.510786	4	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
15	32	59	1661850041.966681	1661850041.96669	4	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
15	32	60	1661941583.187254	1661941583.18727	4	160	320	160	0	0	8	0	0	0	160	300	0	0	0	0	0	19	0	0
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
13	1661164140.646569	1661164140.646579	G11durchstarter2	11	1	t	ABCDEFGHIJ	t
12	1661154442.203457	1661154442.203466	G11a	13	0	t	ABCDEFGHIJ	t
15	1661529329.892145	1661529329.892155	FA2A-B	3	4	t	ABCDEFG	t
\.


--
-- Data for Name: scenario; Type: TABLE DATA; Schema: public; Owner: mysneaker
--

COPY public.scenario (id, creation_date, last_edit, "char", description, sneaker_price, paint_price, storage_fee_sneaker, storage_fee_paint, storage_fee_finished_sneaker, employee_count_modifier_temporary, employee_count_modifier_permanent, factor_interest_rate, employee_salary, employee_signup_bonus, employee_production_capacity, employee_cost_modfier, sneaker_ask, factor_ad_take, tender_offer_count, machine_purchase_allowed, machine_purchase_cost1, machine_purchase_cost2, machine_purchase_cost3, machine_production_capacity1, machine_production_capacity2, machine_production_capacity3, machine_employee_max, machine_maintainance_cost1, machine_maintainance_cost2, machine_maintainance_cost3, production_cost_per_sneaker1, production_cost_per_sneaker2, production_cost_per_sneaker3) FROM stdin;
4	1661115128.466921	1661115128.466942	D	Politik  Aufgrund gesetzlicher Neuerungen bei der Dokumentation des Bewerbungsprozesses verteuert dieser sich von 100,00 € auf 200,00 €.  Markteinschätzung  Weiterhin kann ein kräftiges Wachstum auf dem Markt für Sneaker erwartet werden, dass mittelfristig anhalten wird.	70	12	4	1	8	0	0	0.04	440	200	10	0.18	1000	0.1	200	t	12000	25000	45000	200	500	1000	10	4000	6000	8000	60	50	40
6	1661115128.466921	1661115128.466942	F	Politik Markteinschätzung  Die Kapazitätsgrenze für den Sneakermarkt ist nicht erreicht, dennoch erwarten die ersten Experten eine baldige Marktsättigung. Das ifo-Institut ist hingegen von einem weiterhin robusten Wachstume überzeugt.	80	15	4	1	8	0	0	0.04	440	200	10	0.18	1500	0.1	400	t	12000	25000	45000	200	500	1000	10	4000	6000	8000	60	50	40
7	1661115128.466921	1661115128.466942	G	Markteinschätzung  Aufgrund der gesunkenen Konjunkturerwartungen ist die Grenze des Wachstums erreicht, voraussichtlich wird der Gesamtmarkt stabil bleiben. Kurz- bis mittelfristig sind jedoch Rückschläge nicht ausgeschlossen.	85	16	4	1	8	0	0	0.04	440	200	10	0.18	1500	0.1	500	t	12000	25000	45000	200	500	1000	10	4000	6000	8000	60	50	40
8	1661115128.466921	1661115128.466942	H	Markteinschätzung  Der negative Konjunkturausblick hat sich bestätigt, es ist von einem leichten Rückgang im Gesamtmarkt auszugehen.	75	12	4	1	8	0	0	0.04	440	200	10	0.18	1400	0.1	300	t	12000	25000	45000	200	500	1000	10	4000	6000	8000	60	50	40
9	1661115128.466921	1661115128.466942	I	Markteinschätzung  Die Abwärtsbewegung der Wirtschaft ist nun nicht mehr zu stoppen, wesentliche Branchen befinden sich im freien Fall. Die gestiegene Sparneigung der Konsumenten trifft auch den Markt für Sneaker, ein deutlicher Einbruch ist erwartbar.	65	10	4	1	8	0	0	0.04	440	200	10	0.18	1000	0.1	100	f	12000	25000	45000	200	500	1000	10	4000	6000	8000	60	50	40
10	1661115128.466921	1661115128.466942	J	Markteinschätzung  Nach dem drastischen Einbruch des Marktes deutet sich nunmehr eine vorsichtige Erholung an.	65	10	4	1	8	0	0	0.04	440	200	10	0.18	1200	0.1	200	f	12000	25000	45000	200	500	1000	10	4000	6000	8000	60	50	40
3	1661115128.466921	1661278736.827221	C	Politik  Aufgrund der prosperierenden Wirtschaftslage müssen Sie nach den Nullrunden der Perioden Eins und Zwei die Löhne und Gehälter um 10% anpassen.  Markteinschätzung  Die Nachfrage am Markt nach Sneakern dürfte gegenüber der Vorperiode weiter zunehmen. Eine erste Ausschreibung erfolgt in Höhe von 200 Einheiten. Verkauft wird an den günstigsten Anbieter.	65	12	4	1	8	0	0	0.04	440	100	10	0	800	0.1	200	f	12000	25000	45000	200	500	1000	10	4000	6000	8000	60	50	40
5	1661115128.466921	1661528825.263782	E	Politik  Markteinschätzung  Die Kapazitätsgrenze für den Sneakermarkt ist nicht erreicht, dennoch erwarten die ersten Experten eine baldige Marktsättigung. Das ifo-Institut ist hingegen von einem weiterhin robusten Wachstume überzeugt. Interne Unternehmensfaktoren  Aufgrund des hohen Marktwachstums hat die Personalabteilung massive Probleme geeignete Mitarbeiter*innen zu finden, d. h. in dieser Periode kann kein neues Personal eingestellt werden.	80	15	4	1	8	0	0	0.04	440	200	10	0	1200	0.1	300	f	12000	25000	45000	200	500	1000	10	4000	6000	8000	60	50	40
2	1661115128.466921	1661517838.199158	B	Politik  Aufgrund der hohen Überschüsse in den Sozialkassen sinken die die Personalnebenkosten von derzeit 20% auf 18 %.  Markteinschätzung  Wichtige Indexwerte wie der IFO-Geschäftsklimaindex oder das DIW-Konjunkturbarometer steigen weiterhin deutlich, was eine gesteigerte Wirtschaftsleistung für die kommende Periode erwarten lässt. Die Nachfrage am Markt nach Sneakern dürfte gegenüber der Vorperiode weiter zunehmen.	65	10	4	1	8	0	0	0.04	401	101	10	0	600	0.1	0	f	12000	25000	45000	200	500	1000	10	4000	6000	8000	60	50	40
1	1661115128.466921	1661525710.906802	A	Politik  Aufgrund der hohen Überschüsse in den Sozialkassen ist in den kommenden Perioden mit einer Absenkung der Sozialbeiträge (Personalnebenkosten) zu rechnen.  Markteinschätzung  Der wirtschaftliche Aufschwung gewinnt an Dynamik. Die Nachfrage am Markt nach Sneakern dürfte gegenüber der Vorperiode um ca. 50 % zunehmen. 	60	10	4	1	8	0	0	0.04	400	100	10	0	580	0.1	0	f	12000	25000	45000	200	500	1000	10	4000	6000	8000	60	50	40
\.


--
-- Data for Name: stock; Type: TABLE DATA; Schema: public; Owner: mysneaker
--

COPY public.stock (game_id, company_id, id, creation_date, last_edit, current_cycle_index, sneaker_count, paint_count, finished_sneaker_count, employees_count, research_budget, account_balance, credit_taken, real_sales, income_from_sales, research_production_modifier, machine_1_space, machine_2_space, machine_3_space, insolvent, tender_sales, tender_price) FROM stdin;
13	19	22	2022-08-22 10:25:11.111849	1661163911.111632	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	\N	\N
13	20	23	2022-08-22 10:25:11.111849	1661163911.111632	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	\N	\N
13	19	24	2022-08-22 10:25:11.111849	1661163911.111632	1	0	0	0	8	0	52300	0	100	23500	1	1	0	0	f	\N	\N
13	20	25	2022-08-22 10:25:11.111849	1661163911.111632	1	0	-10	0	8	0	44025	0	75	11625	1	1	0	0	f	\N	\N
12	26	39	2022-08-22 19:09:29.352824	1661195369.352602	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	\N	\N
12	27	40	2022-08-22 19:09:29.352824	1661195369.352602	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	\N	\N
12	28	41	2022-08-22 19:09:29.352824	1661195369.352602	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	\N	\N
12	\N	43	2022-08-22 19:09:29.352824	1661195369.352602	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	\N	\N
12	\N	44	2022-08-22 19:09:29.352824	1661195369.352602	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	\N	\N
12	30	45	2022-08-22 19:09:29.352824	1661195369.352602	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	\N	\N
12	31	46	2022-08-22 19:09:29.352824	1661195369.352602	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	\N	\N
15	32	48	2022-08-22 19:09:29.352824	1661195369.352602	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	\N	\N
15	32	49	2022-08-27 17:28:15.477013	1661621295.476771	1	0	0	0	8	0	43120	0	2	600	1	1	0	0	f	\N	\N
15	32	50	2022-08-27 23:08:57.567725	1661641737.567496	2	0	0	0	8	0	35912	0	0	0	1	1	0	0	f	\N	\N
15	32	51	2022-08-27 23:08:57.567725	1661641737.567496	3	0	0	0	8	0	28392	0	0	0	1	1	0	0	f	\N	\N
15	32	52	2022-08-27 23:08:57.567725	1661641737.567496	4	0	0	0	8	0	-24761.6	0	0	0	1	1	3	0	f	\N	\N
12	\N	53	2022-08-30 11:18:04.097335	1661858284.097118	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	\N	\N
23	33	54	2022-08-30 11:18:04.097335	1661858284.097118	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	\N	\N
22	34	55	2022-08-30 11:18:04.097335	1661858284.097118	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	\N	\N
22	35	56	2022-08-30 11:18:04.097335	1661858284.097118	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	\N	\N
22	36	57	2022-08-30 11:18:04.097335	1661858284.097118	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	\N	\N
22	37	58	2022-08-30 11:18:04.097335	1661858284.097118	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	\N	\N
22	39	60	2022-08-30 11:18:04.097335	1661858284.097118	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	\N	\N
21	40	61	2022-08-30 11:18:04.097335	1661858284.097118	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	\N	\N
21	41	62	2022-08-30 11:18:04.097335	1661858284.097118	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	\N	\N
21	\N	63	2022-08-30 11:18:04.097335	1661858284.097118	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	\N	\N
21	\N	65	2022-08-30 11:18:04.097335	1661858284.097118	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	\N	\N
21	43	66	2022-08-30 11:18:04.097335	1661858284.097118	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	\N	\N
21	44	67	2022-08-30 11:18:04.097335	1661858284.097118	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	\N	\N
21	45	68	2022-08-30 11:18:04.097335	1661858284.097118	0	0	0	0	8	0	50000	0	0	0	1	1	0	0	f	\N	\N
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
\N	2	1661115128.325654	1661115128.325676	teacher	1661115128.325691	\N	$2b$12$f.xpj/d8v91qlo/uwUXoseQ3WH9YrSphkOGZbyJl10T0SvgJCzJOq	t
12	30	1661195369.18641	1661195369.186429	TN Customs	1661503843.961828	\N	$2b$12$qjlleYgeH1Kg6KUIazQ3luaPf/skQX788YeY08KaMnrTZGpGqdJ/u	t
\N	4	1661115128.325654	1661115128.325676	t2	1661115128.325691	\N	$2b$12$0EO23h0QNiHtP8ev7yiM3OMvG3em0X3CgHs30cKUz/kGek7auAG46	t
\N	12	1661147107.239957	1661147107.239976	koe	1661935153.273119	\N	$2b$12$ahtjb63iLKmgUMNWwgzmtuUHCm5hQOtPDgHy2npcuaa.6idnPYBci	t
\N	1	1661115128.325654	1661115128.325676	admin	1661941803.966449	\N	$2b$12$gBVSJBczbZ5nw9a6dtdmq.v5zVq.sp.NgbpmGDVyDjCHYANSATUra	t
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

SELECT pg_catalog.setval('public.basegroup_id_seq', 46, true);


--
-- Name: cycle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mysneaker
--

SELECT pg_catalog.setval('public.cycle_id_seq', 60, true);


--
-- Name: game_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mysneaker
--

SELECT pg_catalog.setval('public.game_id_seq', 23, true);


--
-- Name: scenario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mysneaker
--

SELECT pg_catalog.setval('public.scenario_id_seq', 10, true);


--
-- Name: stock_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mysneaker
--

SELECT pg_catalog.setval('public.stock_id_seq', 69, true);


--
-- Name: teachergroup_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mysneaker
--

SELECT pg_catalog.setval('public.teachergroup_id_seq', 9, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mysneaker
--

SELECT pg_catalog.setval('public.user_id_seq', 46, true);


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
-- Name: ix_cycle_id; Type: INDEX; Schema: public; Owner: mysneaker
--

CREATE INDEX ix_cycle_id ON public.cycle USING btree (id);


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
-- Name: game game_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mysneaker
--

ALTER TABLE ONLY public.game
    ADD CONSTRAINT game_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public."user"(id);


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

