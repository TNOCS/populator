import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('buurtdata', { schema: 'cbs' })
export class Buurten {
  @PrimaryGeneratedColumn()
  gid: number;

  @Column('character varying', { name: 'bu_code', nullable: true, length: 10 })
  bu_code: string | null;

  @Column('character varying', {
    name: 'jrstatcode',
    nullable: true,
    length: 14,
  })
  jrstatcode: string | null;

  @Column('character varying', { name: 'bu_naam', nullable: true, length: 60 })
  bu_naam: string | null;

  @Column('character varying', { name: 'wk_naam', nullable: true, length: 60 })
  wk_naam: string | null;

  @Column('character varying', { name: 'gm_naam', nullable: true, length: 60 })
  gm_naam: string | null;

  @Column('character varying', { name: 'postcode', nullable: true, length: 10 })
  postcode: string | null;

  @Column('double precision', {
    name: 'aant_inw',
    nullable: true,
    precision: 53,
  })
  aant_inw: number | null;

  @Column('double precision', {
    name: 'p_00_14_jr',
    nullable: true,
    precision: 53,
  })
  p_00_14_jr: number | null;

  @Column('double precision', {
    name: 't_00_14_jr',
    nullable: true,
    precision: 53,
  })
  t_00_14_jr: number | null;

  @Column('double precision', {
    name: 'p_15_24_jr',
    nullable: true,
    precision: 53,
  })
  p_15_24_jr: number | null;

  @Column('double precision', {
    name: 't_15_24_jr',
    nullable: true,
    precision: 53,
  })
  t_15_24_jr: number | null;

  @Column('double precision', {
    name: 'p_25_44_jr',
    nullable: true,
    precision: 53,
  })
  p_25_44_jr: number | null;

  @Column('double precision', {
    name: 't_25_44_jr',
    nullable: true,
    precision: 53,
  })
  t_25_44_jr: number | null;

  @Column('double precision', {
    name: 'p_45_64_jr',
    nullable: true,
    precision: 53,
  })
  p_45_64_jr: number | null;

  @Column('double precision', {
    name: 't_45_64_jr',
    nullable: true,
    precision: 53,
  })
  t_45_64_jr: number | null;

  @Column('double precision', {
    name: 'p_65_eo_jr',
    nullable: true,
    precision: 53,
  })
  p_65_eo_jr: number | null;

  @Column('double precision', {
    name: 't_65_eo_jr',
    nullable: true,
    precision: 53,
  })
  t_65_eo_jr: number | null;

  @Column('double precision', {
    name: 'aantal_hh',
    nullable: true,
    precision: 53,
  })
  aantal_hh: number | null;

  @Column('double precision', {
    name: 'p_eenp_hh',
    nullable: true,
    precision: 53,
  })
  p_eenp_hh: number | null;

  @Column('double precision', {
    name: 't_eenp_hh',
    nullable: true,
    precision: 53,
  })
  t_eenp_hh: number | null;

  @Column('double precision', {
    name: 'p_hh_z_k',
    nullable: true,
    precision: 53,
  })
  p_hh_z_k: number | null;

  @Column('double precision', {
    name: 't_hh_z_k',
    nullable: true,
    precision: 53,
  })
  t_hh_z_k: number | null;

  @Column('double precision', {
    name: 'p_hh_m_k',
    nullable: true,
    precision: 53,
  })
  p_hh_m_k: number | null;

  @Column('double precision', {
    name: 't_hh_m_k',
    nullable: true,
    precision: 53,
  })
  t_hh_m_k: number | null;

  @Column('numeric', { name: 'gem_hh_gr', nullable: true })
  gem_hh_gr: number | null;

  @Column('double precision', {
    name: 'p_west_al',
    nullable: true,
    precision: 53,
  })
  p_west_al: number | null;

  @Column('double precision', {
    name: 'p_n_w_al',
    nullable: true,
    precision: 53,
  })
  p_n_w_al: number | null;

  @Column('double precision', {
    name: 'p_marokko',
    nullable: true,
    precision: 53,
  })
  p_marokko: number | null;

  @Column('double precision', {
    name: 'p_ant_aru',
    nullable: true,
    precision: 53,
  })
  p_ant_aru: number | null;

  @Column('double precision', {
    name: 'p_surinam',
    nullable: true,
    precision: 53,
  })
  p_surinam: number | null;

  @Column('double precision', {
    name: 'p_turkije',
    nullable: true,
    precision: 53,
  })
  p_turkije: number | null;

  @Column('double precision', {
    name: 'p_over_nw',
    nullable: true,
    precision: 53,
  })
  p_over_nw: number | null;

  @Column('geometry', { name: 'geovlak', nullable: true })
  geovlak: string | null;
}
