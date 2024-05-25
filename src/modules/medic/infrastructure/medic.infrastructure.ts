import { Result, ok } from 'neverthrow';
import { MedicRepository } from '../domain/repositories/medic.repository';
import { Medic } from '../domain/roots/medic';
import { DatabaseException } from '../../../core/exceptions/database.exception';
import { MedicGetAllDto } from './dtos/get-all.dto';

export type MedicSaveResult = Result<Medic, DatabaseException>;
export type MedicGetAllResult = Result<Medic[], Error>;
export class MedicInfrastructure implements MedicRepository {
  save(medic: Medic): MedicSaveResult {
    return ok(medic);
  }

  getAll(): MedicGetAllResult {
    const medic = {
      id: 'c3800ee5-0945-4c6a-913b-e355c1948c93',
      mombre: 'juan',
      apellido: 'perez',
      dni: '12345678',
      email: 'perez@gmail.com',
      telefono: '123456789',
      direccion: 'calle los olivos',
      distrito: 'lima',
      provincia: 'lima',
      departamento: 'lima',
      nacionalidad: 'peruano',
      cmp: '12345',
      especialidad: 'cardiologia',
      descripcion: 'especialidad que estudia el corazion',
      especialidadId: '24f5bbd5-4572-440b-ae39-c8398a76f015',
      enfermedad1: 'diabetes',
      enfermedad2: 'hipertension',
      edad: 40,
      sexo: 'M',
    };

    const listMedic = [medic, medic, medic, medic];

    return MedicGetAllDto.fromDataToDomain(listMedic);
  }
}

// if(result.isErr()){
//   return err(new Error(result.error.message))
// } else {
//   return ok(result.value);
// }
