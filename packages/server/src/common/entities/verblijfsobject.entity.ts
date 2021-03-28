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
class Verblijfsobjectactueel {
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
}

export default Verblijfsobjectactueel;
