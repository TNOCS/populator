import { Geometry } from 'geojson';
import {
  Column,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  ViewEntity,
} from 'typeorm';
import Pandactueelbestaand from './pand.entity';
import Population from './population.entity';

export enum VerblijfsobjectStatus {
  Gevormd = 'Verblijfsobject gevormd',
  NietGerealiseerd = 'Niet gerealiseerd verblijfsobject',
  InGebruikNietGemeten = 'Verblijfsobject in gebruik (niet ingemeten)',
  InGebruik = 'Verblijfsobject in gebruik',
  Ingetrokken = 'Verblijfsobject ingetrokken',
  BuitenGebruik = 'Verblijfsobject buiten gebruik',
}

@ViewEntity({ schema: 'bag' })
class Verblijfsobjectactueelbestaand {
  @PrimaryGeneratedColumn()
  public gid: number;

  @Column({ type: 'character varying', name: 'identificatie' })
  public id: string;

  @Column({ type: 'boolean' })
  public aanduidingrecordinactief: boolean;

  @Column({ type: 'integer' })
  public aanduidingrecordcorrectie: number;

  @Column({ type: 'boolean' })
  public officieel: boolean;

  @Column({ type: 'boolean' })
  public inonderzoek: boolean;

  @Column({ type: 'timestamp with time zone' })
  public begindatumtijdvakgeldigheid: Timestamp;

  @Column({ type: 'timestamp with time zone' })
  public einddatumtijdvakgeldigheid: Timestamp;

  @Column({ type: 'character varying' })
  public documentnummer: string;

  @Column({ type: 'date' })
  public documentdatum: Date;

  @Column({ type: 'character varying', name: 'hoofdadres' })
  public addr: string;

  @Column({
    type: 'enum',
    enum: VerblijfsobjectStatus,
    name: 'verblijfsobjectstatus',
  })
  public sts: VerblijfsobjectStatus;

  @Column({ type: 'geometry' })
  public geopunt: Geometry;

  @Column({ type: 'geometry', srid: 4326 })
  public geovlak: Geometry;

  @OneToMany(() => Population, (pop) => pop.verblijfsobject)
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  public pop: Population[];

  @ManyToMany(
    () => Pandactueelbestaand,
    (pand: Pandactueelbestaand) => pand.verblijfsobjecten,
  )
  @JoinTable({
    name: 'verblijfsobjectpandactueelbestaand',
    joinColumns: [{ name: 'identificatie', referencedColumnName: 'id' }],
    inverseJoinColumns: [
      { name: 'gerelateerdpand', referencedColumnName: 'id' },
    ],
  })
  public panden: Pandactueelbestaand[];
}

export default Verblijfsobjectactueelbestaand;
