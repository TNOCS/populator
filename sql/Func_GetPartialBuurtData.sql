create or replace function GetPartialBuurtData (
   geom geometry
) 
returns table ( 
	gid integer,
	bu_naam character varying(60),
	bu_code character varying(20),
	wk_naam character varying(60),
	gm_naam character varying(60),
	postcode character varying(10),
	aant_inw integer,
	p_00_14_jr integer,
	t_00_14_jr integer,
	p_15_24_jr integer,
	t_15_24_jr integer,
	p_25_44_jr integer,
	t_25_44_jr integer,
	p_45_64_jr integer,
	t_45_64_jr integer,
	p_65_eo_jr integer,
	t_65_eo_jr integer,
	aantal_hh integer,
	p_eenp_hh integer,
	t_eenp_hh integer,
	p_hh_z_k integer,
	t_hh_z_k integer,
	p_hh_m_k integer,
	t_hh_m_k integer,
	gem_hh_gr numeric,
	p_west_al integer,
	p_n_w_al integer,
	p_marokko integer,
	p_ant_aru integer,
	p_surinam integer,
	p_turkije integer,
	p_over_nw integer,
	geovlak geometry
) 
language plpgsql
as $func$
begin
	return query WITH
	partial_buurten as (select st_intersection(geom, b.geovlak) as geom
						from cbs.buurten b
						where st_overlaps(geom, b.geovlak)),
	population as (select
					sum(parent_count) filter (where parents_age_group = '00-14') over (partition by pop.bu_code) as count_parents_00_14,
					sum(parent_count) filter (where parents_age_group = '15-24') over (partition by pop.bu_code) as count_parents_15_24,
					sum(parent_count) filter (where parents_age_group = '25-44') over (partition by pop.bu_code) as count_parents_25_44,
					sum(parent_count) filter (where parents_age_group = '45-64') over (partition by pop.bu_code) as count_parents_45_64,
					sum(parent_count) filter (where parents_age_group = '65plus') over (partition by pop.bu_code) as count_parents_65_plus,
					count(*) filter (where household_type = 'couples with children') over (partition by pop.bu_code) as total_couples_with_children,
					count(*) filter (where household_type = 'couples without children') over (partition by pop.bu_code) as total_couples_without_children,
					count(*) filter (where household_type = 'single parent') over (partition by pop.bu_code) as total_single_parent,
					count(*) filter (where household_type = 'single') over (partition by pop.bu_code) as total_singles,
					pop.*, pb.geom
					from 
						bag.population pop, 
						bag.verblijfsobjectactueelbestaand vbo,
						partial_buurten pb
					where st_intersects(pb.geom, vbo.geopunt)
					and pop.gebruiksdoelverblijfsobject = 'woonfunctie'
					and vbo.identificatie = pop.identificatie),
	partial_buurt_data as (select
					coalesce(max(pop.count_parents_00_14),0) as count_parents_00_14,
					coalesce(max(pop.count_parents_15_24),0) as count_parents_15_24,
					coalesce(max(pop.count_parents_25_44),0) as count_parents_25_44,
					coalesce(max(pop.count_parents_45_64),0) as count_parents_45_64,
					coalesce(max(pop.count_parents_65_plus),0) as count_parents_65_plus,
					coalesce(max(pop.total_couples_with_children),0) as total_couples_with_children,
					coalesce(max(pop.total_couples_without_children),0) as total_couples_without_children,
					coalesce(max(pop.total_single_parent),0) as total_single_parent,
					coalesce(max(pop.total_singles),0) as total_singles,
					coalesce(sum(ag_00_14),0) as count_children_00_14,
					coalesce(sum(ag_15_24),0) as count_children_15_24,
					coalesce(sum(ag_25_44),0) as count_children_25_44,
					coalesce(sum(ag_45_64),0) as count_children_45_64,
					coalesce(sum(ag_65_plus),0) as count_children_65_plus,
					coalesce(sum(hh_size),0) as total_inwoners,
					coalesce(sum(amount_of_children),0) as total_children,
					coalesce(sum(parent_count),0) as total_parents,
					coalesce(count(pop.bu_code),0) as total_hh,
					pop.bu_code,
					pop.geom
					from population pop
					group by pop.bu_code, pop.geom)
	select 
		bu.gid,
		bu.bu_naam,
		pbd.bu_code,
		bu.wk_naam,
		bu.gm_naam,
		bu.postcode,
		cast(pbd.total_inwoners as int) as aant_inw,
		cast(round(100.0/pbd.total_inwoners * (pbd.count_parents_00_14 + pbd.count_children_00_14)) as int) as p_00_14_jr,
		cast(pbd.count_parents_00_14 + pbd.count_children_00_14 as int) as t_00_14_jr,
		cast(round(100.0/pbd.total_inwoners * (pbd.count_parents_15_24 + pbd.count_children_15_24)) as int) as p_15_24_jr,
		cast(pbd.count_parents_15_24 + pbd.count_children_15_24 as int) as t_15_24_jr,
		cast(round(100.0/pbd.total_inwoners * (pbd.count_parents_25_44 + pbd.count_children_25_44)) as int) as p_25_44_jr,
		cast(pbd.count_parents_25_44 + pbd.count_children_25_44 as int) as t_25_44_jr,
		cast(round(100.0/pbd.total_inwoners * (pbd.count_parents_45_64 + pbd.count_children_45_64)) as int) as p_45_64_jr,
		cast(pbd.count_parents_45_64 + pbd.count_children_45_64 as int) as t_45_64_jr,
		cast(round(100.0/pbd.total_inwoners * (pbd.count_parents_65_plus + pbd.count_children_65_plus)) as int) as p_65_eo_jr,
		cast(pbd.count_parents_65_plus + pbd.count_children_65_plus as int) as t_65_eo_jr,
		cast(pbd.total_hh as int) as aantal_hh,
		cast(round(100.0/pbd.total_hh * pbd.total_singles) as int) as p_eenp_hh,
		cast(pbd.total_singles as int) as t_eenp_hh,
		cast(round(100.0/pbd.total_hh * pbd.total_couples_without_children) as int) as p_hh_z_k,
		cast(pbd.total_couples_without_children as int) as t_hh_z_k,
		cast(round(100.0/pbd.total_hh * (pbd.total_single_parent + pbd.total_couples_with_children)) as  int) as p_hh_m_k,
		cast(pbd.total_single_parent + pbd.total_couples_with_children as int) as t_hh_m_k,
		round((cast(pbd.total_inwoners as numeric) / pbd.total_hh), 1) as gem_hh_gr,
		cast(bu.p_west_al as int),
		cast(bu.p_n_w_al as int),
		cast(bu.p_marokko as int),
		cast(bu.p_ant_aru as int),
		cast(bu.p_surinam as int),
		cast(bu.p_turkije as int),
		cast(bu.p_over_nw as int),
		pbd.geom as geovlak
	from partial_buurt_data pbd
	left join cbs.buurten bu
	on bu.bu_code = pbd.bu_code;
end; $func$ 