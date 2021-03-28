import { Geometry } from 'geojson';
import { Column, PrimaryGeneratedColumn, Timestamp, ViewEntity } from 'typeorm';

export enum PandStatus {
  BouwvergunningVerleend = 'Bouwvergunning verleend',
  NietGerealiseerdPand = 'Niet gerealiseerd pand',
  BouwGestart = 'Bouw gestart',
  PandInGebruikNietGemeten = 'Pand in gebruik (niet ingemeten)',
  PandInGebruik = 'Pand in gebruik',
  SloopvergunningVerleend = 'Sloopvergunning verleend',
  PandGesloopt = 'Pand gesloopt',
  PandBuitenGebruik = 'Pand buiten gebruik',
}

@ViewEntity({ schema: 'bag' })
class Pandactueel {
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

  @Column({ type: 'enum', enum: PandStatus })
  public pandstatus: PandStatus;

  @Column({ type: 'numeric' })
  public bouwjaar: number;

  @Column({ type: 'boolean' })
  public geom_valid: boolean;

  @Column({ type: 'geometry' })
  public geovlak: Geometry;
}

export default Pandactueel;
