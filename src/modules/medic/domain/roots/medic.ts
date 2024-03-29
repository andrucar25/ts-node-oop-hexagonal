import { Address } from "../entities/address";
import { Disease } from "../entities/disease";
import { Specialty } from "../entities/specialty";

type GENDER = "M" | "F"

interface Props {
  id: string;
  name: string;
  lastname: string;
  dni: string;
  email: string;
  phone: string;
  gender: GENDER;
  address: Address[];
  nationality: string;
  cmp: string;
  specialty: Specialty;
  diseases: Disease[];
  age: number;
}

class Medic {
  private readonly id: string;
  private name: string;
  private lastname: string;
  private dni: string;
  private readonly email: string;
  private phone: string;
  private address: Address[];
  private nationality: string;
  private cmp: string;
  private gender: GENDER
  private specialty: Specialty;
  private diseases: Disease[];
  private age: number;

  constructor(props: Props) {
    if(props.age < 18) throw new Error ("el medico debe ser mayor de edad")
    if(props.age > 80) throw new Error ("el medico debe ser menor de 80")
    if(props.dni.length !== 8) throw new Error ("el dni debe tener 8 digitos")
    if(props.phone.length !== 9) throw new Error ("el telefono debe tener 9 digitos")
    if(props.cmp.length !== 5) throw new Error ("el CMP debe tener 5 digitos")
    if(props.address.length === 0) throw new Error ("el medico debe tener al menos 1 direccion")
    if(props.address.length > 3) throw new Error ("el medico no debe tener mas de 3 direcciones")
    Object.assign(this, props)
    // this.id = props.id;
    // this.name = props.name;
    // this.lastname = props.lastname;
    // this.dni = props.dni;
    // this.email = props.email;
    // this.phone = props.phone;
    // this.address = props.address;
    // this.nationality = props.nationality;
    // this.cmp = props.cmp;
    // this.specialty = props.specialty;
    // this.diseases = props.diseases;
    // this.age = props.age;
    // this.gender = props.gender
  }
}

const props : Props = {
  id: "01e668c2-4007-46a2-a6d9-a478d9027966",
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

const medic = new Medic(props)

console.log(medic);
