import { IsNumber, IsOptional } from 'class-validator';
import { Geometry } from 'geojson';
import {
  AfterLoad,
  Column,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  ViewEntity,
} from 'typeorm';
import Verblijfsobjectactueelbestaand from './verblijfsobject.entity';

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
class Pandactueelbestaand {
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

  @Column({ type: 'geometry' })
  public geovlak: Geometry;

  @ManyToMany(
    () => Verblijfsobjectactueelbestaand,
    (verbObj: Verblijfsobjectactueelbestaand) => verbObj.panden,
  )
  @JoinTable({
    name: 'verblijfsobjectpandactueelbestaand',
    joinColumns: [
      { name: 'gerelateerdpand', referencedColumnName: 'identificatie' },
    ],
    inverseJoinColumns: [
      { name: 'identificatie', referencedColumnName: 'identificatie' },
    ],
  })
  public verblijfsobjecten: Verblijfsobjectactueelbestaand[];

  @IsOptional()
  @IsNumber()
  protected peoplePresentInBuilding: number;

  @AfterLoad()
  calculatePeopleInBuilding(): void {
    this.peoplePresentInBuilding = this.verblijfsobjecten.reduce(
      (x, y) => x + y.population.reduce((a, b) => a + b.hh_size, 0),
      0,
    );
  }
}

export default Pandactueelbestaand;
