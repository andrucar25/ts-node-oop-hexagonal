import { Result, err, ok } from "neverthrow";
import { MedicRepository } from "../domain/repositories/medic.repository";
import { Medic } from "../domain/roots/medic";
import { DatabaseException } from "./exceptions/database.exception";

export type MedicSaveResult = Result<Medic, DatabaseException>
export class MedicInfrastructure implements MedicRepository{
  save(medic: Medic): MedicSaveResult{
    // const random = Math.random()
    // if(random > 0.5){
    //   return err(new DatabaseException("Exception in database while saving medic"))
    // }else {
    //   return ok(medic);
    // }
    return ok(medic);
  }
}