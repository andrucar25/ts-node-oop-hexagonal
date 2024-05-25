import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { validate } from 'class-validator';
import 'reflect-metadata';
import { MedicApplication } from '../application/medic.application';
import { MedicProperties } from '../domain/roots/medic';
import { Disease } from '../domain/entities/disease';
import { MedicCreateResponse } from './dtos/responses/medic-created.dto';
import { MedicGetAllResponse } from './dtos/responses/medic-got-all.dto';
import logger from '../../../core/helpers/logger';
import { MedicCreateDto } from './dtos/requests/medic-create.dto';
import { IError } from 'src/core/error/error.interface';

export class MedicController {
  private application: MedicApplication;

  constructor(app: MedicApplication) {
    this.application = app;
    // this.getAll = this.getAll.bind(this); //esto es para que cuando se llame a getAll,
    //busque application en la clase, como es llamada por definicion,
    //no lo encuentra por default asi que hay que hacer este truco
  }

  async insert(req: Request, res: Response, next: NextFunction) {
    const medicCreateDto = new MedicCreateDto();
    medicCreateDto.id = req.body.id;
    medicCreateDto.name = req.body.name;
    medicCreateDto.lastname = req.body.lastname;
    medicCreateDto.dni = req.body.dni;
    medicCreateDto.email = req.body.email;
    medicCreateDto.phone = req.body.phone;
    medicCreateDto.address = req.body.address;
    medicCreateDto.cmp = req.body.cmp;
    medicCreateDto.specialty = req.body.specialty;
    medicCreateDto.diseases = req.body.diseases;
    medicCreateDto.nationality = req.body.nationality;
    medicCreateDto.age = req.body.age;
    medicCreateDto.gender = req.body.gender;

    const errors = await validate(medicCreateDto);

    if (errors.length > 0) {
      const listErrors: string[] = [];
      for (const error of errors) {
        for (const constraint in error.constraints) {
          listErrors.push(error.constraints[constraint]);
        }
      }

      const err: IError = new Error();
      err.name = 'ValidationError';
      err.message = 'Validation Error';
      err.stack = listErrors.join(' || ');
      err.status = 411;

      return next(err);
      // return res.status(411).json(listErrors);
      // return res.status(err.status).json(err);
    }

    const props: MedicProperties = {
      id: uuidv4(),
      name: 'juan',
      lastname: 'perez',
      dni: '12345678',
      email: 'juan@gmail',
      phone: '123455678',
      address: [
        {
          address: 'avenida 1',
          district: 'san isidro',
          province: 'lima',
          department: 'lima',
        },
        {
          address: 'avenida 2',
          district: 'san isidro',
          province: 'lima',
          department: 'lima',
        },
      ],
      nationality: 'peruvian',
      cmp: '12345',
      gender: 'M',
      specialty: {
        id: '1',
        name: 'CArdiologia',
        description: 'ejemplo',
      },
      diseases: [new Disease('Diabetes'), new Disease('hipertension')],
      age: 30,
    };

    const result = this.application.create(props);

    if (result.isErr()) {
      logger.error(result.error.name, result.error.message);
    } else {
      const response = MedicCreateResponse.fromDomainToResponse(result.value);
      return res.status(200).json(response);
    }
  }

  getAll(req: Request, res: Response) {
    const result = this.application.getAll();
    if (result.isErr()) {
      logger.error(result.error.message);
    } else {
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
