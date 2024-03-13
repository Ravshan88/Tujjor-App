PGDMP         $                {         	   tujjor_db    15.1    15.1 u    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    185524 	   tujjor_db    DATABASE     k   CREATE DATABASE tujjor_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE tujjor_db;
                postgres    false            �            1259    249940    agents    TABLE     �   CREATE TABLE public.agents (
    own_dealer boolean,
    id uuid NOT NULL,
    telegram_id uuid,
    user_id uuid,
    username character varying(255)
);
    DROP TABLE public.agents;
       public         heap    postgres    false            �            1259    249947    attachments    TABLE     ~   CREATE TABLE public.attachments (
    id uuid NOT NULL,
    name character varying(255),
    prefix character varying(255)
);
    DROP TABLE public.attachments;
       public         heap    postgres    false            �            1259    249954    catalog    TABLE     W   CREATE TABLE public.catalog (
    id uuid NOT NULL,
    name character varying(255)
);
    DROP TABLE public.catalog;
       public         heap    postgres    false            �            1259    249959    catalog_products    TABLE     f   CREATE TABLE public.catalog_products (
    catalog_id uuid NOT NULL,
    products_id uuid NOT NULL
);
 $   DROP TABLE public.catalog_products;
       public         heap    postgres    false            �            1259    249962    category    TABLE     Y   CREATE TABLE public.category (
    id uuid NOT NULL,
    title character varying(255)
);
    DROP TABLE public.category;
       public         heap    postgres    false            �            1259    249967    client    TABLE     T  CREATE TABLE public.client (
    active boolean,
    bot_active boolean NOT NULL,
    category_id integer,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    insertion_time timestamp(6) without time zone,
    registration_date timestamp(6) without time zone,
    id uuid NOT NULL,
    territory_id uuid,
    address character varying(255) NOT NULL,
    company_name character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    reference_point character varying(255),
    tin character varying(255)
);
    DROP TABLE public.client;
       public         heap    postgres    false            �            1259    249976    client_couriers    TABLE     d   CREATE TABLE public.client_couriers (
    client_id uuid NOT NULL,
    couriers_id uuid NOT NULL
);
 #   DROP TABLE public.client_couriers;
       public         heap    postgres    false            �            1259    249979    client_plan    TABLE     �   CREATE TABLE public.client_plan (
    amount integer NOT NULL,
    date date NOT NULL,
    created_date timestamp(6) without time zone NOT NULL,
    client_id uuid,
    id uuid NOT NULL
);
    DROP TABLE public.client_plan;
       public         heap    postgres    false            �            1259    249985    company    TABLE     2  CREATE TABLE public.company (
    id integer NOT NULL,
    super_visor_id uuid,
    address character varying(255) NOT NULL,
    company_name character varying(255),
    email character varying(255) NOT NULL,
    region character varying(255) NOT NULL,
    support_phone character varying(255) NOT NULL
);
    DROP TABLE public.company;
       public         heap    postgres    false            �            1259    249984    company_id_seq    SEQUENCE     �   CREATE SEQUENCE public.company_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.company_id_seq;
       public          postgres    false    223            �           0    0    company_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.company_id_seq OWNED BY public.company.id;
          public          postgres    false    222            �            1259    249995    currier    TABLE     �  CREATE TABLE public.currier (
    active boolean,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    insertion_time timestamp(6) without time zone,
    id uuid NOT NULL,
    telegram_id uuid,
    user_id uuid,
    firstname character varying(255) NOT NULL,
    lastname character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    show_password character varying(255) NOT NULL,
    username character varying(255)
);
    DROP TABLE public.currier;
       public         heap    postgres    false            �            1259    250004    currier_territory    TABLE     h   CREATE TABLE public.currier_territory (
    currier_id uuid NOT NULL,
    territory_id uuid NOT NULL
);
 %   DROP TABLE public.currier_territory;
       public         heap    postgres    false            �            1259    250010    customer_category    TABLE     z  CREATE TABLE public.customer_category (
    active boolean NOT NULL,
    archive boolean NOT NULL,
    id integer NOT NULL,
    insertion_time timestamp(6) without time zone,
    attachment_id uuid,
    code character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    region character varying(255) NOT NULL
);
 %   DROP TABLE public.customer_category;
       public         heap    postgres    false            �            1259    250009    customer_category_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customer_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.customer_category_id_seq;
       public          postgres    false    227            �           0    0    customer_category_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.customer_category_id_seq OWNED BY public.customer_category.id;
          public          postgres    false    226            �            1259    250018    dealer    TABLE     X  CREATE TABLE public.dealer (
    own_agents boolean,
    partnership boolean,
    insertion_time timestamp(6) without time zone,
    id uuid NOT NULL,
    telegram_id uuid,
    user_id uuid,
    address character varying(255),
    company character varying(255),
    full_name character varying(255),
    phone_number character varying(255)
);
    DROP TABLE public.dealer;
       public         heap    postgres    false            �            1259    250027    dealer_agents    TABLE     `   CREATE TABLE public.dealer_agents (
    agents_id uuid NOT NULL,
    dealer_id uuid NOT NULL
);
 !   DROP TABLE public.dealer_agents;
       public         heap    postgres    false            �            1259    250032    icons    TABLE     m   CREATE TABLE public.icons (
    attachment_id uuid,
    id uuid NOT NULL,
    name character varying(255)
);
    DROP TABLE public.icons;
       public         heap    postgres    false            �            1259    250037    order_product    TABLE     x   CREATE TABLE public.order_product (
    count integer,
    id uuid NOT NULL,
    orders_id uuid,
    product_id uuid
);
 !   DROP TABLE public.order_product;
       public         heap    postgres    false            �            1259    250042    orders    TABLE     )  CREATE TABLE public.orders (
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    created_at timestamp(6) without time zone,
    id uuid NOT NULL,
    client_name character varying(255),
    phone_number character varying(255),
    status character varying(255)
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    250049    product    TABLE     �   CREATE TABLE public.product (
    count integer,
    free boolean,
    price integer,
    insertion_time timestamp(6) without time zone,
    attachment_id uuid,
    category_id uuid,
    id uuid NOT NULL,
    title character varying(255)
);
    DROP TABLE public.product;
       public         heap    postgres    false            �            1259    250054    product_category    TABLE     �   CREATE TABLE public.product_category (
    insertion_time timestamp(6) without time zone,
    id uuid NOT NULL,
    name character varying(255)
);
 $   DROP TABLE public.product_category;
       public         heap    postgres    false            �            1259    250059    role    TABLE     �   CREATE TABLE public.role (
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    id uuid NOT NULL,
    role_name character varying(255) NOT NULL
);
    DROP TABLE public.role;
       public         heap    postgres    false            �            1259    250066    settings    TABLE     �   CREATE TABLE public.settings (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    path character varying(255) NOT NULL
);
    DROP TABLE public.settings;
       public         heap    postgres    false            �            1259    250077    telegram_user    TABLE     y  CREATE TABLE public.telegram_user (
    message_id integer,
    chat_id bigint NOT NULL,
    id uuid NOT NULL,
    bot_user character varying(255),
    password character varying(255),
    phone character varying(255),
    state character varying(255),
    CONSTRAINT telegram_user_bot_user_check CHECK (((bot_user)::text = ANY ((ARRAY['CLIENT'::character varying, 'AGENT'::character varying])::text[]))),
    CONSTRAINT telegram_user_state_check CHECK (((state)::text = ANY ((ARRAY['SHARE_CONTACT'::character varying, 'ENTER_PASSWORD'::character varying, 'SELECT_MENU'::character varying, 'START'::character varying])::text[])))
);
 !   DROP TABLE public.telegram_user;
       public         heap    postgres    false            �            1259    250088 	   territory    TABLE     w  CREATE TABLE public.territory (
    active boolean NOT NULL,
    archive boolean NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    insertion_time timestamp(6) without time zone,
    id uuid NOT NULL,
    code character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    region character varying(255) NOT NULL
);
    DROP TABLE public.territory;
       public         heap    postgres    false            �            1259    250095    users    TABLE     �   CREATE TABLE public.users (
    id uuid NOT NULL,
    password character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    username character varying(255) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    250104    users_roles    TABLE     [   CREATE TABLE public.users_roles (
    roles_id uuid NOT NULL,
    user_id uuid NOT NULL
);
    DROP TABLE public.users_roles;
       public         heap    postgres    false            �           2604    249988 
   company id    DEFAULT     h   ALTER TABLE ONLY public.company ALTER COLUMN id SET DEFAULT nextval('public.company_id_seq'::regclass);
 9   ALTER TABLE public.company ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    223    223            �           2604    250013    customer_category id    DEFAULT     |   ALTER TABLE ONLY public.customer_category ALTER COLUMN id SET DEFAULT nextval('public.customer_category_id_seq'::regclass);
 C   ALTER TABLE public.customer_category ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    227    227            �          0    249940    agents 
   TABLE DATA           P   COPY public.agents (own_dealer, id, telegram_id, user_id, username) FROM stdin;
    public          postgres    false    214   ��       �          0    249947    attachments 
   TABLE DATA           7   COPY public.attachments (id, name, prefix) FROM stdin;
    public          postgres    false    215   ە       �          0    249954    catalog 
   TABLE DATA           +   COPY public.catalog (id, name) FROM stdin;
    public          postgres    false    216   �       �          0    249959    catalog_products 
   TABLE DATA           C   COPY public.catalog_products (catalog_id, products_id) FROM stdin;
    public          postgres    false    217   0�       �          0    249962    category 
   TABLE DATA           -   COPY public.category (id, title) FROM stdin;
    public          postgres    false    218   M�       �          0    249967    client 
   TABLE DATA           �   COPY public.client (active, bot_active, category_id, latitude, longitude, insertion_time, registration_date, id, territory_id, address, company_name, name, phone, reference_point, tin) FROM stdin;
    public          postgres    false    219   j�       �          0    249976    client_couriers 
   TABLE DATA           A   COPY public.client_couriers (client_id, couriers_id) FROM stdin;
    public          postgres    false    220   ��       �          0    249979    client_plan 
   TABLE DATA           P   COPY public.client_plan (amount, date, created_date, client_id, id) FROM stdin;
    public          postgres    false    221   �       �          0    249985    company 
   TABLE DATA           j   COPY public.company (id, super_visor_id, address, company_name, email, region, support_phone) FROM stdin;
    public          postgres    false    223   ,�       �          0    249995    currier 
   TABLE DATA           �   COPY public.currier (active, latitude, longitude, insertion_time, id, telegram_id, user_id, firstname, lastname, phone, show_password, username) FROM stdin;
    public          postgres    false    224   ��       �          0    250004    currier_territory 
   TABLE DATA           E   COPY public.currier_territory (currier_id, territory_id) FROM stdin;
    public          postgres    false    225   e�       �          0    250010    customer_category 
   TABLE DATA           �   COPY public.customer_category (active, archive, id, insertion_time, attachment_id, code, description, name, region) FROM stdin;
    public          postgres    false    227   ��       �          0    250018    dealer 
   TABLE DATA           �   COPY public.dealer (own_agents, partnership, insertion_time, id, telegram_id, user_id, address, company, full_name, phone_number) FROM stdin;
    public          postgres    false    228   ��       �          0    250027    dealer_agents 
   TABLE DATA           =   COPY public.dealer_agents (agents_id, dealer_id) FROM stdin;
    public          postgres    false    229   ɜ       �          0    250032    icons 
   TABLE DATA           8   COPY public.icons (attachment_id, id, name) FROM stdin;
    public          postgres    false    230   �       �          0    250037    order_product 
   TABLE DATA           I   COPY public.order_product (count, id, orders_id, product_id) FROM stdin;
    public          postgres    false    231   �       �          0    250042    orders 
   TABLE DATA           h   COPY public.orders (latitude, longitude, created_at, id, client_name, phone_number, status) FROM stdin;
    public          postgres    false    232   �       �          0    250049    product 
   TABLE DATA           l   COPY public.product (count, free, price, insertion_time, attachment_id, category_id, id, title) FROM stdin;
    public          postgres    false    233   "�       �          0    250054    product_category 
   TABLE DATA           D   COPY public.product_category (insertion_time, id, name) FROM stdin;
    public          postgres    false    234   ?�       �          0    250059    role 
   TABLE DATA           E   COPY public.role (created_at, updated_at, id, role_name) FROM stdin;
    public          postgres    false    235   \�       �          0    250066    settings 
   TABLE DATA           2   COPY public.settings (id, name, path) FROM stdin;
    public          postgres    false    236   A�       �          0    250077    telegram_user 
   TABLE DATA           b   COPY public.telegram_user (message_id, chat_id, id, bot_user, password, phone, state) FROM stdin;
    public          postgres    false    237   ��       �          0    250088 	   territory 
   TABLE DATA           q   COPY public.territory (active, archive, latitude, longitude, insertion_time, id, code, name, region) FROM stdin;
    public          postgres    false    238   "�       �          0    250095    users 
   TABLE DATA           >   COPY public.users (id, password, phone, username) FROM stdin;
    public          postgres    false    239   ��       �          0    250104    users_roles 
   TABLE DATA           8   COPY public.users_roles (roles_id, user_id) FROM stdin;
    public          postgres    false    240   ��       �           0    0    company_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.company_id_seq', 1, true);
          public          postgres    false    222            �           0    0    customer_category_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.customer_category_id_seq', 5, true);
          public          postgres    false    226            �           2606    249944    agents agents_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.agents
    ADD CONSTRAINT agents_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.agents DROP CONSTRAINT agents_pkey;
       public            postgres    false    214            �           2606    249946    agents agents_user_id_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.agents
    ADD CONSTRAINT agents_user_id_key UNIQUE (user_id);
 C   ALTER TABLE ONLY public.agents DROP CONSTRAINT agents_user_id_key;
       public            postgres    false    214            �           2606    249953    attachments attachments_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.attachments
    ADD CONSTRAINT attachments_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.attachments DROP CONSTRAINT attachments_pkey;
       public            postgres    false    215            �           2606    249958    catalog catalog_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.catalog
    ADD CONSTRAINT catalog_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.catalog DROP CONSTRAINT catalog_pkey;
       public            postgres    false    216            �           2606    249966    category category_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.category DROP CONSTRAINT category_pkey;
       public            postgres    false    218            �           2606    249975    client client_phone_key 
   CONSTRAINT     S   ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_phone_key UNIQUE (phone);
 A   ALTER TABLE ONLY public.client DROP CONSTRAINT client_phone_key;
       public            postgres    false    219            �           2606    249973    client client_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.client DROP CONSTRAINT client_pkey;
       public            postgres    false    219            �           2606    249983    client_plan client_plan_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.client_plan
    ADD CONSTRAINT client_plan_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.client_plan DROP CONSTRAINT client_plan_pkey;
       public            postgres    false    221            �           2606    249992    company company_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.company DROP CONSTRAINT company_pkey;
       public            postgres    false    223            �           2606    249994 "   company company_super_visor_id_key 
   CONSTRAINT     g   ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_super_visor_id_key UNIQUE (super_visor_id);
 L   ALTER TABLE ONLY public.company DROP CONSTRAINT company_super_visor_id_key;
       public            postgres    false    223            �           2606    250001    currier currier_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.currier
    ADD CONSTRAINT currier_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.currier DROP CONSTRAINT currier_pkey;
       public            postgres    false    224            �           2606    250008 4   currier_territory currier_territory_territory_id_key 
   CONSTRAINT     w   ALTER TABLE ONLY public.currier_territory
    ADD CONSTRAINT currier_territory_territory_id_key UNIQUE (territory_id);
 ^   ALTER TABLE ONLY public.currier_territory DROP CONSTRAINT currier_territory_territory_id_key;
       public            postgres    false    225            �           2606    250003    currier currier_user_id_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.currier
    ADD CONSTRAINT currier_user_id_key UNIQUE (user_id);
 E   ALTER TABLE ONLY public.currier DROP CONSTRAINT currier_user_id_key;
       public            postgres    false    224            �           2606    250017 (   customer_category customer_category_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.customer_category
    ADD CONSTRAINT customer_category_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.customer_category DROP CONSTRAINT customer_category_pkey;
       public            postgres    false    227            �           2606    250031 )   dealer_agents dealer_agents_agents_id_key 
   CONSTRAINT     i   ALTER TABLE ONLY public.dealer_agents
    ADD CONSTRAINT dealer_agents_agents_id_key UNIQUE (agents_id);
 S   ALTER TABLE ONLY public.dealer_agents DROP CONSTRAINT dealer_agents_agents_id_key;
       public            postgres    false    229            �           2606    250024    dealer dealer_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.dealer
    ADD CONSTRAINT dealer_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.dealer DROP CONSTRAINT dealer_pkey;
       public            postgres    false    228            �           2606    250026    dealer dealer_user_id_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.dealer
    ADD CONSTRAINT dealer_user_id_key UNIQUE (user_id);
 C   ALTER TABLE ONLY public.dealer DROP CONSTRAINT dealer_user_id_key;
       public            postgres    false    228            �           2606    250036    icons icons_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.icons
    ADD CONSTRAINT icons_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.icons DROP CONSTRAINT icons_pkey;
       public            postgres    false    230            �           2606    250041     order_product order_product_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.order_product
    ADD CONSTRAINT order_product_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.order_product DROP CONSTRAINT order_product_pkey;
       public            postgres    false    231            �           2606    250048    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    232            �           2606    250058 &   product_category product_category_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.product_category
    ADD CONSTRAINT product_category_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.product_category DROP CONSTRAINT product_category_pkey;
       public            postgres    false    234            �           2606    250053    product product_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.product DROP CONSTRAINT product_pkey;
       public            postgres    false    233                       2606    250063    role role_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.role DROP CONSTRAINT role_pkey;
       public            postgres    false    235                       2606    250065    role role_role_name_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_role_name_key UNIQUE (role_name);
 A   ALTER TABLE ONLY public.role DROP CONSTRAINT role_role_name_key;
       public            postgres    false    235                       2606    250074    settings settings_name_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.settings
    ADD CONSTRAINT settings_name_key UNIQUE (name);
 D   ALTER TABLE ONLY public.settings DROP CONSTRAINT settings_name_key;
       public            postgres    false    236                       2606    250076    settings settings_path_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.settings
    ADD CONSTRAINT settings_path_key UNIQUE (path);
 D   ALTER TABLE ONLY public.settings DROP CONSTRAINT settings_path_key;
       public            postgres    false    236            	           2606    250072    settings settings_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.settings
    ADD CONSTRAINT settings_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.settings DROP CONSTRAINT settings_pkey;
       public            postgres    false    236                       2606    250087 '   telegram_user telegram_user_chat_id_key 
   CONSTRAINT     e   ALTER TABLE ONLY public.telegram_user
    ADD CONSTRAINT telegram_user_chat_id_key UNIQUE (chat_id);
 Q   ALTER TABLE ONLY public.telegram_user DROP CONSTRAINT telegram_user_chat_id_key;
       public            postgres    false    237                       2606    250085     telegram_user telegram_user_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.telegram_user
    ADD CONSTRAINT telegram_user_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.telegram_user DROP CONSTRAINT telegram_user_pkey;
       public            postgres    false    237                       2606    250094    territory territory_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.territory
    ADD CONSTRAINT territory_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.territory DROP CONSTRAINT territory_pkey;
       public            postgres    false    238                       2606    250103    users users_phone_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_phone_key;
       public            postgres    false    239                       2606    250101    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    239            )           2606    250212 '   users_roles fk15d410tj6juko0sq9k4km60xq    FK CONSTRAINT     �   ALTER TABLE ONLY public.users_roles
    ADD CONSTRAINT fk15d410tj6juko0sq9k4km60xq FOREIGN KEY (roles_id) REFERENCES public.role(id);
 Q   ALTER TABLE ONLY public.users_roles DROP CONSTRAINT fk15d410tj6juko0sq9k4km60xq;
       public          postgres    false    240    3585    235            *           2606    250217 '   users_roles fk2o0jvgh89lemvvo17cbqvdxaa    FK CONSTRAINT     �   ALTER TABLE ONLY public.users_roles
    ADD CONSTRAINT fk2o0jvgh89lemvvo17cbqvdxaa FOREIGN KEY (user_id) REFERENCES public.users(id);
 Q   ALTER TABLE ONLY public.users_roles DROP CONSTRAINT fk2o0jvgh89lemvvo17cbqvdxaa;
       public          postgres    false    239    240    3603                       2606    250107 "   agents fk2vh8rg4inh3scgcguimya35my    FK CONSTRAINT     �   ALTER TABLE ONLY public.agents
    ADD CONSTRAINT fk2vh8rg4inh3scgcguimya35my FOREIGN KEY (user_id) REFERENCES public.users(id);
 L   ALTER TABLE ONLY public.agents DROP CONSTRAINT fk2vh8rg4inh3scgcguimya35my;
       public          postgres    false    3603    214    239                       2606    250127 "   client fk4l40ep87ryw2pkog7aq74jvmd    FK CONSTRAINT     �   ALTER TABLE ONLY public.client
    ADD CONSTRAINT fk4l40ep87ryw2pkog7aq74jvmd FOREIGN KEY (territory_id) REFERENCES public.territory(id);
 L   ALTER TABLE ONLY public.client DROP CONSTRAINT fk4l40ep87ryw2pkog7aq74jvmd;
       public          postgres    false    238    3599    219            !           2606    250172 "   dealer fk5civ5gfo51whsd8ty8iq3kycw    FK CONSTRAINT     �   ALTER TABLE ONLY public.dealer
    ADD CONSTRAINT fk5civ5gfo51whsd8ty8iq3kycw FOREIGN KEY (user_id) REFERENCES public.users(id);
 L   ALTER TABLE ONLY public.dealer DROP CONSTRAINT fk5civ5gfo51whsd8ty8iq3kycw;
       public          postgres    false    3603    228    239            '           2606    250207 #   product fk5cypb0k23bovo3rn1a5jqs6j4    FK CONSTRAINT     �   ALTER TABLE ONLY public.product
    ADD CONSTRAINT fk5cypb0k23bovo3rn1a5jqs6j4 FOREIGN KEY (category_id) REFERENCES public.product_category(id);
 M   ALTER TABLE ONLY public.product DROP CONSTRAINT fk5cypb0k23bovo3rn1a5jqs6j4;
       public          postgres    false    233    3583    234            $           2606    250187 !   icons fk606wfeabgec8a9kfjoxqvnb9b    FK CONSTRAINT     �   ALTER TABLE ONLY public.icons
    ADD CONSTRAINT fk606wfeabgec8a9kfjoxqvnb9b FOREIGN KEY (attachment_id) REFERENCES public.attachments(id);
 K   ALTER TABLE ONLY public.icons DROP CONSTRAINT fk606wfeabgec8a9kfjoxqvnb9b;
       public          postgres    false    215    3545    230                       2606    250122 "   client fk8qtotsujuuc1pnxleyt6w97xc    FK CONSTRAINT     �   ALTER TABLE ONLY public.client
    ADD CONSTRAINT fk8qtotsujuuc1pnxleyt6w97xc FOREIGN KEY (category_id) REFERENCES public.customer_category(id);
 L   ALTER TABLE ONLY public.client DROP CONSTRAINT fk8qtotsujuuc1pnxleyt6w97xc;
       public          postgres    false    219    227    3567                       2606    250117 ,   catalog_products fk984njuntlsmq2fjh6h0i5pmtx    FK CONSTRAINT     �   ALTER TABLE ONLY public.catalog_products
    ADD CONSTRAINT fk984njuntlsmq2fjh6h0i5pmtx FOREIGN KEY (catalog_id) REFERENCES public.catalog(id);
 V   ALTER TABLE ONLY public.catalog_products DROP CONSTRAINT fk984njuntlsmq2fjh6h0i5pmtx;
       public          postgres    false    3547    216    217            "           2606    250177 )   dealer_agents fkavm04c1k0u8lm0t2ocf8rxgpq    FK CONSTRAINT     �   ALTER TABLE ONLY public.dealer_agents
    ADD CONSTRAINT fkavm04c1k0u8lm0t2ocf8rxgpq FOREIGN KEY (agents_id) REFERENCES public.agents(id);
 S   ALTER TABLE ONLY public.dealer_agents DROP CONSTRAINT fkavm04c1k0u8lm0t2ocf8rxgpq;
       public          postgres    false    214    3541    229                       2606    250112 ,   catalog_products fkbjyagrjvhwcy4k32f0x1sf88m    FK CONSTRAINT     �   ALTER TABLE ONLY public.catalog_products
    ADD CONSTRAINT fkbjyagrjvhwcy4k32f0x1sf88m FOREIGN KEY (products_id) REFERENCES public.product(id);
 V   ALTER TABLE ONLY public.catalog_products DROP CONSTRAINT fkbjyagrjvhwcy4k32f0x1sf88m;
       public          postgres    false    233    3581    217                       2606    250157 -   currier_territory fkd03vj8n7d35ujidhqgd31bqpc    FK CONSTRAINT     �   ALTER TABLE ONLY public.currier_territory
    ADD CONSTRAINT fkd03vj8n7d35ujidhqgd31bqpc FOREIGN KEY (territory_id) REFERENCES public.territory(id);
 W   ALTER TABLE ONLY public.currier_territory DROP CONSTRAINT fkd03vj8n7d35ujidhqgd31bqpc;
       public          postgres    false    3599    225    238                       2606    250137 +   client_couriers fkep1kfhpa329cov83q9ql65ts5    FK CONSTRAINT     �   ALTER TABLE ONLY public.client_couriers
    ADD CONSTRAINT fkep1kfhpa329cov83q9ql65ts5 FOREIGN KEY (client_id) REFERENCES public.client(id);
 U   ALTER TABLE ONLY public.client_couriers DROP CONSTRAINT fkep1kfhpa329cov83q9ql65ts5;
       public          postgres    false    3553    219    220                       2606    250152 "   currier fkfyjy07a8i5i435c2nm1jt2x4    FK CONSTRAINT     �   ALTER TABLE ONLY public.currier
    ADD CONSTRAINT fkfyjy07a8i5i435c2nm1jt2x4 FOREIGN KEY (user_id) REFERENCES public.users(id);
 L   ALTER TABLE ONLY public.currier DROP CONSTRAINT fkfyjy07a8i5i435c2nm1jt2x4;
       public          postgres    false    224    239    3603                       2606    250162 -   currier_territory fkhho9onefavyuo9uag1c1ckmo2    FK CONSTRAINT     �   ALTER TABLE ONLY public.currier_territory
    ADD CONSTRAINT fkhho9onefavyuo9uag1c1ckmo2 FOREIGN KEY (currier_id) REFERENCES public.currier(id);
 W   ALTER TABLE ONLY public.currier_territory DROP CONSTRAINT fkhho9onefavyuo9uag1c1ckmo2;
       public          postgres    false    3561    225    224            %           2606    250197 )   order_product fkhnfgqyjx3i80qoymrssls3kno    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_product
    ADD CONSTRAINT fkhnfgqyjx3i80qoymrssls3kno FOREIGN KEY (product_id) REFERENCES public.product(id);
 S   ALTER TABLE ONLY public.order_product DROP CONSTRAINT fkhnfgqyjx3i80qoymrssls3kno;
       public          postgres    false    231    3581    233                       2606    250142 '   client_plan fkjm05cguoxy3ys4jp78hdcuexk    FK CONSTRAINT     �   ALTER TABLE ONLY public.client_plan
    ADD CONSTRAINT fkjm05cguoxy3ys4jp78hdcuexk FOREIGN KEY (client_id) REFERENCES public.client(id);
 Q   ALTER TABLE ONLY public.client_plan DROP CONSTRAINT fkjm05cguoxy3ys4jp78hdcuexk;
       public          postgres    false    219    221    3553            #           2606    250182 )   dealer_agents fkl29rbjruugfud1tokyyie8d8v    FK CONSTRAINT     �   ALTER TABLE ONLY public.dealer_agents
    ADD CONSTRAINT fkl29rbjruugfud1tokyyie8d8v FOREIGN KEY (dealer_id) REFERENCES public.dealer(id);
 S   ALTER TABLE ONLY public.dealer_agents DROP CONSTRAINT fkl29rbjruugfud1tokyyie8d8v;
       public          postgres    false    228    229    3569            &           2606    250192 )   order_product fkna2v7y2trgcxhtfpld8l581j9    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_product
    ADD CONSTRAINT fkna2v7y2trgcxhtfpld8l581j9 FOREIGN KEY (orders_id) REFERENCES public.orders(id);
 S   ALTER TABLE ONLY public.order_product DROP CONSTRAINT fkna2v7y2trgcxhtfpld8l581j9;
       public          postgres    false    232    3579    231                        2606    250167 -   customer_category fknbrrj5y4js69qgi7v6xxutsrm    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_category
    ADD CONSTRAINT fknbrrj5y4js69qgi7v6xxutsrm FOREIGN KEY (attachment_id) REFERENCES public.attachments(id);
 W   ALTER TABLE ONLY public.customer_category DROP CONSTRAINT fknbrrj5y4js69qgi7v6xxutsrm;
       public          postgres    false    227    215    3545                       2606    250147 #   company fknuqjmjk8qy8vokb5lfcx8pux3    FK CONSTRAINT     �   ALTER TABLE ONLY public.company
    ADD CONSTRAINT fknuqjmjk8qy8vokb5lfcx8pux3 FOREIGN KEY (super_visor_id) REFERENCES public.users(id);
 M   ALTER TABLE ONLY public.company DROP CONSTRAINT fknuqjmjk8qy8vokb5lfcx8pux3;
       public          postgres    false    239    223    3603                       2606    250132 +   client_couriers fks3g7cc6hyt6pcyolefhjil5lc    FK CONSTRAINT     �   ALTER TABLE ONLY public.client_couriers
    ADD CONSTRAINT fks3g7cc6hyt6pcyolefhjil5lc FOREIGN KEY (couriers_id) REFERENCES public.currier(id);
 U   ALTER TABLE ONLY public.client_couriers DROP CONSTRAINT fks3g7cc6hyt6pcyolefhjil5lc;
       public          postgres    false    3561    224    220            (           2606    250202 !   product fky2nmbxlov78vpu8oqc4faup    FK CONSTRAINT     �   ALTER TABLE ONLY public.product
    ADD CONSTRAINT fky2nmbxlov78vpu8oqc4faup FOREIGN KEY (attachment_id) REFERENCES public.attachments(id);
 K   ALTER TABLE ONLY public.product DROP CONSTRAINT fky2nmbxlov78vpu8oqc4faup;
       public          postgres    false    215    233    3545            �      x������ � �      �   (  x����n�0���S���(R�M�� �0�C%�&v�����W�1||���)���&*�@*"T�苯1dg� 4=�گ������'�i�ח�.o����?�2_n,z��h}j�����P"e.��h�@��u���u�����3D[-BJ�'.�[��9Mx����
��(΂"���K ��Zċ�lC3G�鱮���y�n�n�6�/b:y��W�J%��q"U!�Xa���hzx��k�{g�R�A���HX2k�蒳\�hrv<;J�-�8d76�9<v����Ƿe�v�B�=�.Q<P`��Fƭ�:;��4�/K��(9"t�w�2P��_�U��S%s��.��˶� ���\U���� � �ڢ�8�X�h�v�g]��]��Ίs^���Q��K�.����#����ҿ6�ɦ����[�F�K�C�n$"�1�(��;sK�1G��n���\��2�r$��R�#$S�q�]8pes���h��e>׽%QYd���y�86��"�#�t��lϺ���tss��;�E      �      x������ � �      �      x������ � �      �      x������ � �      �   #  x���KKA����]f���twn�\�BN��ydH��Y��"����UA�]�űC%YU�Ț�\��PIY�8JT�G�A�Q�G��oT@w-���
�:Uo������ uq�V�{-�K�G$�3w��j,�����^����v�Ū�;~�ʹ��cn�S;�/6�<��>ݝ�"J��˃�<��!�+�&Ba0��FQM(
bWR�ELK�9c8onT��'�)5�UK�T}�V}1	XR2v�[OU�O�����K���^�s��h�����њѯ�q�]��2�� �v�      �   b   x����� ���w��@���?;��U[�TB���҅�ɨ<��R�2��\��4� �D�.�E������d���Hr�zط��j�=�&      �      x������ � �      �   h   x���D0 ���W6�鴥s[~��˨�d������K��	:����z�����K�U���騣�)�Н�퐲,���^�-Cs^�|��!��������      �   �   x�-�=n�0@�>E��$Q�ҥkƲ��Z7���7�>�{wP��jN�5R(iN̹U�IMAHY��A��v�2W1�=�&E:F�ӥ����T}=/np~��-xA�509S��Z���`8=��m�>F�}N�?>��U�����\�ͽ��'�*��qgQ��������4M�OB9E      �   H   x����  �w�r���# ����6/vn<E5��n$�d�ĞϭT��hF��x��ֶ�1� ~4��      �   �   x���?k�0���)�eR�N���ءJK�d�rv丘ʩ"��W�R���{ۏw����H�R������n�%R�T͵����qI-�lC��1m]�C�[x�N!�9!�o�MCωE.��8ET-s�	����̟��~1_03�i��2��k��p�<%����s:��Ȣ+����,�U[�<p,�7����2���x��f 4��Qe������O����Q�o�?�<�=      �      x������ � �      �      x������ � �      �   �  x�mS��\7�u��?��ćD�q�:��4E��3����>\�Muq���󢭾�
*�K6�#��AZ��VN�a!	�����qս���g<Ώ���yU$4����.�1$�6x��l���>�\D�a�I����yv���������ki��ǄQ=��"��QY|�2jI^������[@�F�[{-x1i��
�xR_S��	'��є�w!1��&WX�����i{E�쏈�ۗ��C*"H�jf�ы��E��cVPi�/e'�c��'�S*��	ґ�2v����0���|�����?/�]�� #�B:(.�)1��*�l�E�ye�Ǔ�^��}�>����+N�>F���R�$ !:v�c��Eglu2��+pdg�����KpV-���?�W�sF?���t���5f?��ċ�㔱@��r�k��}*��	�|����՘��9��\_M������ur-e�oib	%�n���I#�o��׷�=�4[��!B�3�f��a��As�0��{*s�4�-�g���]�������-��$}���캑�dDkjȌ�,������T�p��yr�b�"�kZ������v�/U_���)7}��,�{>ì��=��K?\��-�g���T���V"r}��|��ޞ�����풑�Eh�#�u�|���;��ѥt���T@ɘ����"AL�w��������.��!�Y1�/�S����f&dV�%���hE�%y������"�ђ�����%ޮ�^�����:�      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �   �   x�u�Aj�@�������F�Iم֔@h��t�l��u�6^��>!��o��,�̇�&�����zD��,���h�L��'��,i�^���������:t/�����5iM�k�?�&�&
f��������Y����gG��{�Ԛ��c��8k�k��ɉ%۔��0���7bV�3M��K�9晀�U0*#V
dAż9��2�C�u&T^=      �   :  x�M�9N1E��)�@�w��!!# $��h$�G=M��1����T���ӠiC�T��� ���4T���v��ϛ�m�W[���tN�jk���U��ݼBB��"��r�8��m7��e�>��/�E�%Q0�iȅ	�S��"�<ٶ���*��R��֐g%��IJ�5�/qv��}'��z��W2�#&�>ZB9��SZd}?/w���Q��1N��;d�zQ�Fm�zD�e��~��o��B�K�vv���]���4}�8�l��Q-F^�^m��zN���,�\�GFF�R�uN>^��b��s���L      �   �   x�m�K
�0 �ur�_&�e)��]$M��� ���)2�LȘ86�!�����j�4#�wO�a�]�u�N�E�]��ez,���nӼEE��Dn�TB�D�d�J���2��U*ͥ��?u�����1��H+       �   v  x�}�?oA�k易K5+�c����h��G�����I��[q�	�tGc?Y�����}�hʒ,K�$
I����lLѣ #�@0�a�%�%�U%3��6��j��9���=��jim��|��?��}���r.S�B3{ND�<q��cb��-F6�W�W�m�ƶ���ʅ�s�j�Ъ�rw@������v��}�+�˳?�Q�����,��l�9�Dn���jC5	$���^C�Fan�]����=*�+燛�T^���!�;yg��)4�~~!��K�&��i��7� [K}S��2�|�o�����]2F2��O��Z��s��xG���r	��^zy|-�q6���r��|+��rz��y���78�[      �   �   x�5�IN�0 �ur�쐭�!��$����ǎ�R2���HH�<F#iWD �I�85�*�BD9u50y�� ���	���z��<~6�;6vޥj���ӾX����W[�s���Ļ�RHIhB/�t��Cd]��A��qI4�
�c#*�&��i��q�S���\g��f�T��~�>Um1�v~K�{�Ż�[���VƤ� �z����v����ž��v!G>      �   s   x�̱1����{ �zq���_��֫{�%̫���&T�ھu����Ó����{.�����6H�n'c��!��Zw�^������B�Mhp"���1�w0~�1���&�     