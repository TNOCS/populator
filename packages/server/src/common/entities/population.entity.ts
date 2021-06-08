import { IsNumber, IsOptional } from 'class-validator';
import {
  AfterLoad,
  Column,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  ViewEntity,
} from 'typeorm';
import Verblijfsobjectactueelbestaand from './verblijfsobject.entity';

@ViewEntity({ schema: 'bag' })
class Population {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'character varying' })
  public parents_age_group: string;

  @Column({ type: 'integer' })
  public parent_count: number;

  @Column({ type: 'numeric' })
  public ag_00_14: number;

  @Column({ type: 'numeric' })
  public ag_15_24: number;

  @Column({ type: 'numeric' })
  public ag_25_44: number;

  @Column({ type: 'numeric' })
  public ag_45_64: number;

  @Column({ type: 'numeric' })
  public ag_65_plus: number;

  @Column({ type: 'numeric' })
  public amount_of_children: number;

  @Column({ type: 'numeric' })
  public hh_size: number;

  @Column({ type: 'character varying' })
  public household_type: string;

  @Column({ type: 'character varying' })
  public bu_code: string;

  @Column({ type: 'character varying' })
  public identificatie: string;

  @Column({ type: 'numeric' })
  public oppervlakteverblijfsobject: number;

  @Column({ type: 'character' })
  public gebruiksdoelverblijfsobject: string;

  @ManyToOne(() => Verblijfsobjectactueelbestaand, (verb) => verb.population)
  @JoinColumn({ name: 'identificatie', referencedColumnName: 'identificatie' })
  public verblijfsobject: Verblijfsobjectactueelbestaand;

  @IsOptional()
  @IsNumber()
  protected people_present: number;

  @AfterLoad()
  calculatePeoplePresent(): void {
    // this.people_present = Math.round(this.hh_size * )
  }
}

export default Population;
