import { Medic } from "../roots/medic";
import { MedicSaveResult } from "../../infrastructure/medic.infrastructure";

export interface MedicRepository {
  save(medic: Medic): MedicSaveResult;
}