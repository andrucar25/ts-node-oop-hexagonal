import { Medic } from "../roots/medic";
import { MedicGetAllResult, MedicSaveResult } from "../../infrastructure/medic.infrastructure";

export interface MedicRepository {
  save(medic: Medic): MedicSaveResult;
  getAll(): MedicGetAllResult;
}