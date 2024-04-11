import express, { Application } from "express";
import MedicRouter from "./modules/medic/presentation/medic.routes";

class App {
  private readonly app: Application

  constructor(){
    this.app = express();
    this.mountMiddlewares();
    this.mountRoutes();
  }

  mountMiddlewares(): void {
    //el express.json y el urlencoded se habilitan para reconocer la data que se envia en el request 
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}))
  }

  mountRoutes(): void {
    this.app.use("/medic", MedicRouter);
  }

  getApp(): Application{
    return this.app
  }

}



export default new App().getApp();