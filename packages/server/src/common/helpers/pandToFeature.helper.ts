import { plainToClass } from 'class-transformer';
import { FeatureDto } from '../dtos/Feature.dto';
import { GeoJsonObjectDto } from '../dtos/GeoJsonObject.dto';
import Pandactueelbestaand from '../entities/pand.entity';

export function pandToFeature(pand: Pandactueelbestaand): FeatureDto {
  const GeoJsonObject = plainToClass(GeoJsonObjectDto, pand.geovlak);
  const pandFeature = new FeatureDto();
  pandFeature.geometry = GeoJsonObject;

  delete pand.geovlak;

  if (pand.verblijfsobjecten.length != 0) {
    const verblijfsobjectFeatureCollection = {
      type: 'FeatureCollection',
      features: pand.verblijfsobjecten.map((vbo) => {
        const GeoJsonObject = plainToClass(GeoJsonObjectDto, vbo.geopunt);
        const vboFeature = new FeatureDto();
        vboFeature.geometry = GeoJsonObject;
        vboFeature.id = vbo.gid;
        delete vbo.geopunt;

        vboFeature.properties = vbo;

        return vboFeature;
      }),
    };
    delete pand.verblijfsobjecten;
    pandFeature.properties = pand;
    pandFeature.properties.vbos = verblijfsobjectFeatureCollection;
  } else {
    delete pand.verblijfsobjecten;
    pandFeature.properties = pand;
  }

  return pandFeature;
}
