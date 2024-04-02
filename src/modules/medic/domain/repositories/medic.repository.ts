import { DatabaseException } from "../../infrastructure/exceptions/database.exception";
import { Medic } from "../roots/medic";

export interface MedicRepository {
  save(medic: Medic): Medic | DatabaseException;
}