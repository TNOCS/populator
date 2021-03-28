import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('wijken_geovlak_idx', ['geovlak'], {})
@Index('wijken_pkey', ['gid'], { unique: true })
@Entity('wijken', { schema: 'cbs' })
export class Wijken {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'gid' })
  gid: number;

  @Column('character varying', { name: 'wk_code', nullable: true, length: 8 })
  wkCode: string | null;

  @Column('character varying', {
    name: 'jrstatcode',
    nullable: true,
    length: 12,
  })
  jrstatcode: string | null;

  @Column('character varying', { name: 'wk_naam', nullable: true, length: 60 })
  wkNaam: string | null;

  @Column('character varying', { name: 'gm_code', nullable: true, length: 6 })
  gmCode: string | null;

  @Column('character varying', { name: 'gm_naam', nullable: true, length: 60 })
  gmNaam: string | null;

  @Column('double precision', {
    name: 'ind_wbi',
    nullable: true,
    precision: 53,
  })
  indWbi: number | null;

  @Column('character varying', { name: 'water', nullable: true, length: 4 })
  water: string | null;

  @Column('double precision', { name: 'oad', nullable: true, precision: 53 })
  oad: number | null;

  @Column('double precision', { name: 'sted', nullable: true, precision: 53 })
  sted: number | null;

  @Column('double precision', {
    name: 'bev_dichth',
    nullable: true,
    precision: 53,
  })
  bevDichth: number | null;

  @Column('double precision', {
    name: 'aant_inw',
    nullable: true,
    precision: 53,
  })
  aantInw: number | null;

  @Column('double precision', {
    name: 'aant_man',
    nullable: true,
    precision: 53,
  })
  aantMan: number | null;

  @Column('double precision', {
    name: 'aant_vrouw',
    nullable: true,
    precision: 53,
  })
  aantVrouw: number | null;

  @Column('double precision', {
    name: 'p_00_14_jr',
    nullable: true,
    precision: 53,
  })
  p_00_14Jr: number | null;

  @Column('double precision', {
    name: 'p_15_24_jr',
    nullable: true,
    precision: 53,
  })
  p_15_24Jr: number | null;

  @Column('double precision', {
    name: 'p_25_44_jr',
    nullable: true,
    precision: 53,
  })
  p_25_44Jr: number | null;

  @Column('double precision', {
    name: 'p_45_64_jr',
    nullable: true,
    precision: 53,
  })
  p_45_64Jr: number | null;

  @Column('double precision', {
    name: 'p_65_eo_jr',
    nullable: true,
    precision: 53,
  })
  p_65EoJr: number | null;

  @Column('double precision', {
    name: 'p_ongehuwd',
    nullable: true,
    precision: 53,
  })
  pOngehuwd: number | null;

  @Column('double precision', {
    name: 'p_gehuwd',
    nullable: true,
    precision: 53,
  })
  pGehuwd: number | null;

  @Column('double precision', {
    name: 'p_gescheid',
    nullable: true,
    precision: 53,
  })
  pGescheid: number | null;

  @Column('double precision', {
    name: 'p_verweduw',
    nullable: true,
    precision: 53,
  })
  pVerweduw: number | null;

  @Column('double precision', {
    name: 'aantal_hh',
    nullable: true,
    precision: 53,
  })
  aantalHh: number | null;

  @Column('double precision', {
    name: 'p_eenp_hh',
    nullable: true,
    precision: 53,
  })
  pEenpHh: number | null;

  @Column('double precision', {
    name: 'p_hh_z_k',
    nullable: true,
    precision: 53,
  })
  pHhZK: number | null;

  @Column('double precision', {
    name: 'p_hh_m_k',
    nullable: true,
    precision: 53,
  })
  pHhMK: number | null;

  @Column('numeric', { name: 'gem_hh_gr', nullable: true })
  gemHhGr: string | null;

  @Column('double precision', {
    name: 'p_west_al',
    nullable: true,
    precision: 53,
  })
  pWestAl: number | null;

  @Column('double precision', {
    name: 'p_n_w_al',
    nullable: true,
    precision: 53,
  })
  pNWAl: number | null;

  @Column('double precision', {
    name: 'p_marokko',
    nullable: true,
    precision: 53,
  })
  pMarokko: number | null;

  @Column('double precision', {
    name: 'p_ant_aru',
    nullable: true,
    precision: 53,
  })
  pAntAru: number | null;

  @Column('double precision', {
    name: 'p_surinam',
    nullable: true,
    precision: 53,
  })
  pSurinam: number | null;

  @Column('double precision', {
    name: 'p_turkije',
    nullable: true,
    precision: 53,
  })
  pTurkije: number | null;

  @Column('double precision', {
    name: 'p_over_nw',
    nullable: true,
    precision: 53,
  })
  pOverNw: number | null;

  @Column('double precision', {
    name: 'opp_tot',
    nullable: true,
    precision: 53,
  })
  oppTot: number | null;

  @Column('double precision', {
    name: 'opp_land',
    nullable: true,
    precision: 53,
  })
  oppLand: number | null;

  @Column('double precision', {
    name: 'opp_water',
    nullable: true,
    precision: 53,
  })
  oppWater: number | null;

  @Column('numeric', { name: 'shape_leng', nullable: true })
  shapeLeng: string | null;

  @Column('numeric', { name: 'shape_area', nullable: true })
  shapeArea: string | null;

  @Column('geometry', { name: 'geovlak', nullable: true })
  geovlak: string | null;
}
