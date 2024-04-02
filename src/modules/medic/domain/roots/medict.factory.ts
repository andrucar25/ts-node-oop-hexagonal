import { Medic, MedicProperties } from "./medic";
import {validate} from "uuid";
import { UuidVO } from "./value-object/uuid.vo";

export class MedicFactory {
  private constructor() {}

  static create(props: MedicProperties): Medic{
    const uuidVO = UuidVO.create(props.id);
    
    if(props.age < 18) throw new Error ("el medico debe ser mayor de edad")
    if(props.age > 80) throw new Error ("el medico debe ser menor de 80")
    if(props.dni.length !== 8) throw new Error ("el dni debe tener 8 digitos")
    if(props.phone.length !== 9) throw new Error ("el telefono debe tener 9 digitos")
    if(props.cmp.length !== 5) throw new Error ("el CMP debe tener 5 digitos")
    if(props.address.length === 0) throw new Error ("el medico debe tener al menos 1 direccion")
    if(props.address.length > 3) throw new Error ("el medico no debe tener mas de 3 direcciones")
  
    return new Medic(props)
  }
}