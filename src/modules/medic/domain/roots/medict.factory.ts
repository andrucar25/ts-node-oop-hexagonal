import { Result, err, ok } from 'neverthrow';
import { MedicAgeException } from '../exceptions/age.exception';
import { Medic, MedicProperties } from './medic';
import { UuidVO } from '../value-object/uuid.vo';
import { MedicDNIException } from '../exceptions/dni.exception';
import { MedicPhoneException } from '../exceptions/phone.exception';
import { MedicCMPException } from '../exceptions/cmp.exception';
import {
  MedicAddressEmptyException,
  MedicAddressMaximumException,
} from '../exceptions/address.exception';
import { UUIDException } from '../exceptions/uuid.exception';

export type MedicFactoryResult = Result<
  Medic,
  | MedicAgeException
  | MedicDNIException
  | MedicPhoneException
  | MedicCMPException
  | MedicAddressEmptyException
  | MedicAddressMaximumException
  | UUIDException
>;
export class MedicFactory {
  private constructor() {}

  static create(props: MedicProperties): MedicFactoryResult {
    const resultUuid = UuidVO.create(props.id);
    if (resultUuid.isErr()) return err(resultUuid.error);

    if (props.age < 18 || props.age > 80) return err(new MedicAgeException());
    if (props.dni.length !== 8) return err(new MedicDNIException());
    if (props.phone.length !== 9)
      return err(new MedicPhoneException('el telefono debe tener 9 digitos'));
    if (props.cmp.length !== 5)
      return err(new MedicCMPException('el CMP debe tener 5 digitos'));
    if (props.address.length === 0)
      return err(
        new MedicAddressEmptyException(
          'el medico debe tener al menos 1 direccion',
        ),
      );
    if (props.address.length > 3)
      return err(
        new MedicAddressMaximumException(
          'el medico no debe tener mas de 3 direcciones',
        ),
      );

    return ok(new Medic(props));
  }
}
