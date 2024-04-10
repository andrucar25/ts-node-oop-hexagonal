import { Result, err, ok } from "neverthrow";
import { MedicRepository } from "../domain/repositories/medic.repository";
import { GENDER, Medic, MedicProperties } from "../domain/roots/medic";
import { DatabaseException } from "./exceptions/database.exception";
import { Disease } from "../domain/entities/disease";

export type MedicSaveResult = Result<Medic, DatabaseException>
export type MedicGetAllResult = Result<Medic[], Error>
export class MedicInfrastructure implements MedicRepository{
  
  save(medic: Medic): MedicSaveResult{
    return ok(medic);
  }

  getAll(): MedicGetAllResult {
    const medic = {
      id: "c3800ee5-0945-4c6a-913b-e355c1948c93",
      mombre: "juan",
      apellido: "perez",
      dni: "12345678",
      email: "perez@gmail.com",
      telefono: "123456789",
      direccion: "calle los olivos",
      distrito: "lima",
      provincia: "lima",
      departamento: "lima",
      nacionalidad: "peruano",
      cmp: "12345",
      especialidad: "cardiologia",
      descripcion: "especialidad que estudia el corazion",
      especialidadId: "24f5bbd5-4572-440b-ae39-c8398a76f015",
      enfermedad1: "diabetes",
      enfermedad2: "hipertension",
      edad: 40,
      sexo: "M"
    }

    const listMedic = [medic, medic, medic, medic];
    let errorMatch: any;

    const list: Array<Medic> = listMedic.map(medic => {
      const properties: MedicProperties = {
        id: medic.id,
        name: medic.mombre,
        lastname: medic.apellido,
        dni: medic.dni,
        email: medic.email,
        phone: medic.telefono,
        cmp: medic.cmp,
        address: [
          {
            address: medic.direccion,
            district: medic.distrito,
            province: medic.provincia,
            department: medic.departamento
          }
        ],
        nationality: medic.nacionalidad,
        specialty: {
          id: medic.especialidadId,
          name: medic.especialidad,
          description: medic.descripcion
        },
        diseases: [
          new Disease(medic.enfermedad1),
          new Disease(medic.enfermedad2)
        ],
        age: medic.edad,
        gender: medic.sexo as GENDER
      };

      const result = Medic.reconstitute(properties);

      if(!result.isErr()){
        return result.value
      }else{
        errorMatch = result.error;
      }
    })

    if(errorMatch){
      return err(errorMatch);
    }

    return ok(list);
  }
}

// if(result.isErr()){
//   return err(new Error(result.error.message))
// } else {
//   return ok(result.value);
// }