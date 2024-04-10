import express, { Application } from "express";
import MedicRouter from "./modules/medic/presentation/medic.routes";

class App {
  private readonly app: Application

  constructor(){
    this.app = express();
    this.mountRoutes();
  }

  mountRoutes(): void {
    this.app.use("/medic", MedicRouter);
  }

  getApp(): Application{
    return this.app
  }

}



export default new App().getApp();