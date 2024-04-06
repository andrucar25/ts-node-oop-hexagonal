import { Address } from "../entities/address";
import { Disease } from "../entities/disease";
import { Specialty } from "../entities/specialty";
import { MedicFactory } from "./medict.factory";

export type GENDER = "M" | "F"

export interface MedicEssentials {
  readonly id: string;
  readonly name: string;
  readonly lastname: string;
  readonly dni: string;
  readonly email: string;
  readonly cmp: string;
}
export interface MedicOptionals {
  readonly phone: string;
  readonly gender: GENDER;
  readonly address: Address[];
  readonly nationality: string;
  readonly specialty: Specialty;
  readonly diseases: Disease[];
  readonly age: number;
  readonly active: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date | null;
  readonly deletedAt: Date | null;
}

export type MedicUpdate = Partial<Omit<MedicEssentials, "id" | "email"> & Omit<MedicOptionals, "createdAt" | "updatedAt" | "deletedAt">>

export type MedicProperties =  MedicEssentials & Partial<MedicOptionals>

export class Medic {
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
  private active: boolean;
  private readonly createdAt: Date;
  private updatedAt: Date
  private deletedAt: Date

  constructor(props: MedicProperties) {
    Object.assign(this, props)
    this.active = true
    this.createdAt = new Date();
  }

  update(props: MedicUpdate) {
    if(!this.active) return ;
    Object.assign(this, props);
    this.updatedAt = new Date();
  }

  delete() {
    this.active = false
    this.deletedAt = new Date();
  }

  properties(): MedicProperties {
    return Object.assign({},{
      id: this.id,
      name: this.name,
      lastname: this.lastname,
      dni: this.dni,
      email: this.email,
      cmp: this.cmp,

      phone: this.phone,
      gender: this.gender,
      address: this.address,
      nationality: this.nationality,
      specialty: this.specialty,
      diseases: this.diseases,
      age: this.age,
      active: this.active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt

      }
    )
  }

  static reconstitute(props: MedicProperties){
    return MedicFactory.create(props);
  }
}

// const props : Props = {
//   id: "01e668c2-4007-46a2-a6d9-a478d9027966",
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
