import { Request } from 'express';
import multer from 'multer';
import multer_s3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
//esto usa el patron builder
export class UploadBuilder {
  private _fieldName: string; //se coloca _ como prefijo para indicar que es una propiedad privada, solo es algo semantico
  private _maxSize: number;
  private _allowedMimeTypes: string[];
  private _destination: string;
  private _isPublic: boolean;

  get fieldName() {
    return this._fieldName;
  }

  get maxSize() {
    return this._maxSize;
  }

  get allowedMimeTypes() {
    return this._allowedMimeTypes;
  }

  get destination() {
    return this._destination;
  }

  get isPublic() {
    return this._isPublic;
  }

  addFieldName(fieldName: string) {
    this._fieldName = fieldName;
    return this;
  }

  addMaxSize(maxSize: number) {
    this._maxSize = maxSize;
    return this;
  }

  addAllowedMimeTypes(allowedMimeTypes: string[]) {
    this._allowedMimeTypes = allowedMimeTypes;
    return this;
  }

  addDestination(destination: string) {
    this._destination = destination;
    return this;
  }

  addIsPublic(isPublic: boolean) {
    this._isPublic = isPublic;
    return this;
  }

  build() {
    //el patron builder setea los parametros de esta clase Upload
    return new UploadOptions(this);
  }
}

export class UploadOptions {
  readonly fieldName: string;
  readonly maxSize: number;
  readonly allowedMimeTypes: string[];
  readonly destination: string;
  readonly isPublic: boolean;

  constructor(instance: UploadBuilder) {
    this.fieldName = instance.fieldName;
    this.maxSize = instance.maxSize;
    this.allowedMimeTypes = instance.allowedMimeTypes;
    this.destination = instance.destination;
    this.isPublic = instance.isPublic;
  }
}

export class Upload {
  static save(options: UploadOptions) {
    return multer({
      // multer devuelve un middleware con req, res y next
      limits: { fileSize: options.maxSize },
      storage: multer_s3({
        s3: new S3Client({}),
        bucket: 'coursets-hexagonal-oop',
        acl: options.isPublic ? 'public-read' : 'private',
        metadata(req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key(req: Request, file, cb) {
          const mimeType = file.mimetype;
          const isFileAllowed = options.allowedMimeTypes.includes(mimeType);
          if (!isFileAllowed) {
            cb(new Error('File type not allowed'));
          }

          const partsFileName = file.originalname.split('.');
          const extension = partsFileName[partsFileName.length - 1];
          const fileName = `${options.destination}/${Date.now()}.${extension}`;
          req.body[options.fieldName] = fileName;

          cb(null, fileName);
        },
      }),
    }).single(options.fieldName);
  }
}
