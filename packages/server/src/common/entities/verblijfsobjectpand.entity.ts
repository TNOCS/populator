import { Geometry } from 'geojson';
import {
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  ViewEntity,
} from 'typeorm';
import Pandactueel from './pand.entity';
import Verblijfsobjectactueel from './verblijfsobject.entity';

export enum VerblijfsobjectStatus {
  Gevormd = 'Verblijfsobject gevormd',
  NietGerealiseerd = 'Niet gerealiseerd verblijfsobject',
  InGebruikNietGemeten = 'Verblijfsobject in gebruik (niet ingemeten)',
  InGebruik = 'Verblijfsobject in gebruik',
  Ingetrokken = 'Verblijfsobject ingetrokken',
  BuitenGebruik = 'Verblijfsobject buiten gebruik',
}

@ViewEntity({ schema: 'bag' })
class Verblijfsobjectpandactueel {
  @PrimaryGeneratedColumn()
  public gid: number;

  @ManyToOne(() => Verblijfsobjectactueel, (voa) => voa.identificatie)
  @JoinColumn({ name: 'identificatie', referencedColumnName: 'identificatie' })
  @Column({ type: 'character varying' })
  public identificatie: string;

  @Column({ type: 'boolean' })
  public aanduidingrecordinactief: boolean;

  @Column({ type: 'integer' })
  public aanduidingrecordcorrectie: number;

  @Column({ type: 'timestamp with time zone' })
  public begindatumtijdvakgeldigheid: Timestamp;

  @Column({ type: 'timestamp with time zone' })
  public einddatumtijdvakgeldigheid: Timestamp;

  @ManyToOne(() => Pandactueel, (pandactueel) => pandactueel.identificatie)
  @JoinColumn({
    name: 'gerelateerdpand',
    referencedColumnName: 'identificatie',
  })
  @Column({ type: 'character varying' })
  public gerelateerdpand: string;

  @Column({ type: 'enum', enum: VerblijfsobjectStatus })
  public verblijfsobjectstatus: VerblijfsobjectStatus;

  @Column({ type: 'boolean' })
  public geom_valid: Geometry;
}

export default Verblijfsobjectpandactueel;
