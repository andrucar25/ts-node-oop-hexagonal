import { v4 as uuidv4 } from 'uuid';
import { MedicApplication } from "../application/medic.application";
import { MedicProperties } from "../domain/roots/medic";
import { Disease } from '../domain/entities/disease';
import { MedicRepository } from '../domain/repositories/medic.repository';
import { MedicInfrastructure } from '../infrastructure/medic.infrastructure';

export class MedicController {
  private application: MedicApplication;

  constructor(app: MedicApplication) {
    this.application = app;
  }

  insert(){
    const props : MedicProperties = {
      id: uuidv4(),
      name: "juan",
      lastname: "perez",
      dni: "12345678",
      email: "juan@gmail",
      phone: "123455678",
      address: [
        {
          address: "avenida 1",
          district: "san isidro",
          province: "lima",
          department: "lima",
        },
        {
          address: "avenida 2",
          district: "san isidro",
          province: "lima",
          department: "lima",
        },
      ],
      nationality: "peruvian",
      cmp: "12345",
      gender: "M",
      specialty: {
        id: "1",
        name: "CArdiologia",
        description: "ejemplo",
      },
      diseases: [new Disease("Diabetes"), new Disease("hipertension")],
      age: 30
    }

    const result = this.application.create(props);
    
    if(result.isErr()){
      console.log(result.error.name, result.error.message);
    }else {
      return result.value
    }

  }
}

const infrastructure: MedicRepository = new MedicInfrastructure();
const application = new MedicApplication(infrastructure);
const controller = new MedicController(application);
console.log(controller.insert());

