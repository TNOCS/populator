-- Table: bag.population

CREATE TABLE bag.population
(
    id numeric NOT NULL,
    parents_age_group character varying(15) COLLATE pg_catalog."default",
    parent_count numeric,
    ag_00_14 numeric(15,0),
    ag_15_24 numeric(15,0),
    ag_25_44 numeric(15,0),
    ag_45_64 numeric(15,0),
    ag_65_plus numeric(15,0),
    amount_of_children numeric(15,0),
    hh_size numeric(15,0),
    household_type character varying(50) COLLATE pg_catalog."default",
    bu_code character varying(20) COLLATE pg_catalog."default",
    identificatie character varying(20) COLLATE pg_catalog."default",
    oppervlakteverblijfsobject numeric(15,0),
    gebruiksdoelverblijfsobject character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT population_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE bag.population
    OWNER to postgis;