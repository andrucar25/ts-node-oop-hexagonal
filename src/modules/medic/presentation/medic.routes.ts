import {Router} from "express";
import { MedicController } from "./medic.controller";
import { MedicApplication } from "../application/medic.application";
import { MedicInfrastructure } from "../infrastructure/medic.infrastructure";

export class MedicRouter {
  private readonly router: Router

  constructor(){
    this.router = Router();
    this.mountRoutes();
  }

  mountRoutes(): void {
    const infrastructure = new MedicInfrastructure();
    const application = new MedicApplication(infrastructure);
    const controller = new MedicController(application);
    
    // this.router.get("/", controller.getAll); //aca se le esta pasando la definicion del metodo para que solo se ejecute cuando llegue a la rut
    this.router.get("/", (req, res) => {  //aca se llama directamente al metodo getAll para que no haya proeblemas en el controller y no tener que
      controller.getAll(req,res)          //llamar esta linea this.getAll = this.getAll.bind(this)
    });

    this.router.post("/", (req: any, res:any, next:any) => {
      controller.insert(req, res, next)
    })
  }

  getRouter(): Router{
    return this.router
  }
}

export default new MedicRouter().getRouter();

