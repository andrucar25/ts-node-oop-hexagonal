import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import "reflect-metadata";
import { MedicApplication } from "../application/medic.application";
import { MedicProperties } from "../domain/roots/medic";
import { Disease } from '../domain/entities/disease';
import { MedicCreateResponse } from './dtos/medic-create.dto';
import { MedicGetAllResponse } from './dtos/medic-get-all.dto';

export class MedicController {
  private application: MedicApplication;

  constructor(app: MedicApplication) {
    this.application = app;
    // this.getAll = this.getAll.bind(this); //esto es para que cuando se llame a getAll, 
                                          //busque application en la clase, como es llamada por definicion, 
                                          //no lo encuentra por default asi que hay que hacer este truco
  }

  insert(req: Request, res: Response){
    console.log("🚀 ~ MedicController ~ req:", req.body)
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
      const response = MedicCreateResponse.fromDomainToResponse(result.value);
      return res.status(200).json(response);
    }

  }

  getAll(req: Request, res: Response){
    const result = this.application.getAll();
    if(result.isErr()){
      console.log(result.error.message);
    }else{
      const response = MedicGetAllResponse.fromDomainToResponse(result.value);
      return res.status(200).json(response);
    }
  }
}


// const props : MedicProperties = {
//   id: uuidv4(),
//   name: "juan",
//   lastname: "perez",
//   dni: "12345678",
//   email: "juan@gmail",
//   phone: "123455678",
//   address: [
//     {
//       address: "avenida 1",
//       district: "san isidro",
//       province: "lima",
//       department: "lima",
//     },
//     {
//       address: "avenida 2",
//       district: "san isidro",
//       province: "lima",
//       department: "lima",
//     },
//   ],
//   nationality: "peruvian",
//   cmp: "12345",
//   gender: "M",
//   specialty: {
//     id: "1",
//     name: "CArdiologia",
//     description: "ejemplo",
//   },
//   diseases: [new Disease("Diabetes"), new Disease("hipertension")],
//   age: 30
// }