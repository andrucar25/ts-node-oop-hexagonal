import { MedicProperties } from "../domain/roots/medic";
import { MedicFactory } from "../domain/roots/medict.factory";
import { MedicRepository } from "../domain/repositories/medic.repository";


export class MedicApplication {
  private repository: MedicRepository;
  
  constructor(infrastructure: MedicRepository) {
    this.repository = infrastructure
  }

  create(props: MedicProperties) {
    const medic = MedicFactory.create(props);
    return this.repository.save(medic);
  }
}