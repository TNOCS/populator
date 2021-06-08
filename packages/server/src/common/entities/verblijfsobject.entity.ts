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

  @Column({ type: 'character varying' })
  public identificatie: string;

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

  @Column({ type: 'character varying' })
  public hoofdadres: string;

  @Column({ type: 'enum', enum: VerblijfsobjectStatus })
  public verblijfsobjectstatus: VerblijfsobjectStatus;

  @Column({ type: 'geometry' })
  public geopunt: Geometry;

  @Column({ type: 'geometry' })
  public geovlak: Geometry;

  @OneToMany(() => Population, (pop) => pop.verblijfsobject)
  @JoinColumn({ name: 'identificatie', referencedColumnName: 'identificatie' })
  public population: Population[];

  @ManyToMany(
    () => Pandactueelbestaand,
    (pand: Pandactueelbestaand) => pand.verblijfsobjecten,
  )
  @JoinTable({
    name: 'verblijfsobjectpandactueelbestaand',
    joinColumns: [
      { name: 'identificatie', referencedColumnName: 'identificatie' },
    ],
    inverseJoinColumns: [
      { name: 'gerelateerdpand', referencedColumnName: 'identificatie' },
    ],
  })
  public panden: Pandactueelbestaand[];
}

export default Verblijfsobjectactueelbestaand;
