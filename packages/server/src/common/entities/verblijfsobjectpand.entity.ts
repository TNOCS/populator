import { Geometry } from 'geojson';
import { Column, PrimaryGeneratedColumn, Timestamp, ViewEntity } from 'typeorm';

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

  @Column({ type: 'character varying' })
  public gerelateerdpand: string;

  @Column({ type: 'enum', enum: VerblijfsobjectStatus })
  public verblijfsobjectstatus: VerblijfsobjectStatus;

  @Column({ type: 'boolean' })
  public geom_valid: Geometry;
}

export default Verblijfsobjectpandactueel;
