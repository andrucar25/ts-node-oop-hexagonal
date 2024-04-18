import { NextFunction, Request, Response } from "express";
import { IError } from "../error/error.interface";

export class HandlerErrors {
  static generic(error: IError, req: Request, res: Response, next: NextFunction){
    const messageError: Record<string, any> = {
      name: error.name || "Internal Server Error",
      message: error.message || "Internal Server Error"
    }

    if(process.env.NODE_ENV !== 'production'){
      messageError.stack = error.stack
    }
    
    return res.status(error.status || 500).json(messageError);
  }
}