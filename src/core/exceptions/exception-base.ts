export enum ExceptionCode {
  Default = 'DEFAULT_EXCEPTION',

  //Domain
  MedicAgeException = 'MEDIC_AGE_EXCEPTION',
  MedicDNIException = 'MEDIC_DNI_EXCEPTION',
  MedicPhoneException = 'MEDIC_PHONE_EXCEPTION',
  MedicCMPException = 'MEDIC_CMP_EXCEPTION',
  MedicAddressEmptyException = 'MEDIC_ADDRESS_EMPTY_EXCEPTION',
  MedicAddressMaximumException = 'MEDIC_ADDRESS_MAXIMUM_EXCEPTION',
  UUIDException = 'UUID_EXCEPTION',
  UserNameInvalidLengthException = 'USER_NAME_INVALID_NAME_EXCEPTION',
  UserEmailInvalidException = 'USER_EMAIL_INVALID_NAME_EXCEPTION',

  //Infrastructure
  DatabaseMedicException = 'DATABASE_MEDIC_EXCEPTION',
}

export class ExceptionBase extends Error {
  code: string;

  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, ExceptionBase.prototype);
  }
}
