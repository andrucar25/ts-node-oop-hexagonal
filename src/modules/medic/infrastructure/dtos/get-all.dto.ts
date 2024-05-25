import { err, ok } from 'neverthrow';

import { Disease } from '../../domain/entities/disease';
import { GENDER, Medic, MedicProperties } from '../../domain/roots/medic';

export class MedicGetAllDto {
  static fromDataToDomain(listMedic: any[]) {
    let errorMatch: any;
    const list: Array<Medic> = listMedic.map((medic) => {
      const properties: MedicProperties = {
        id: medic.id,
        name: medic.nombre,
        lastname: medic.apellido,
        dni: medic.dni,
        email: medic.email,
        phone: medic.telefono,
        address: [
          {
            address: medic.direccion,
            district: medic.distrito,
            province: medic.provincia,
            department: medic.departamento,
          },
        ],
        nationality: medic.nacionalidad,
        cmp: medic.cmp,
        specialty: {
          id: medic.especialidadId,
          name: medic.especialidad,
          description: medic.descripcion,
        },
        diseases: [
          new Disease(medic.enfermedad1),
          new Disease(medic.enfermedad2),
        ],
        age: medic.edad,
        gender: medic.sexo as GENDER,
      };
      const result = Medic.reconstitute(properties);

      if (!result.isErr()) {
        return result.value;
      }
      errorMatch = result.error;
    });

    if (errorMatch) {
      return err(errorMatch);
    }
    return ok(list);
  }
}
