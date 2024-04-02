import { MedicRepository } from "../domain/repositories/medic.repository";
import { Medic } from "../domain/roots/medic";
import { DatabaseException } from "./exceptions/database.exception";

export class MedicInfrastructure implements MedicRepository{
  save(medic: Medic): Medic | DatabaseException {
    const random = Math.random()
    if(random > 0.5){
      throw new DatabaseException("Exception in database while saving medic");
    }else {
      return medic
    }

  }
}