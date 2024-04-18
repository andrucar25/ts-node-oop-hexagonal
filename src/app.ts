import express, { Application } from "express";
import MedicRouter from "./modules/medic/presentation/medic.routes";
import { HandlerErrors } from "./core/helpers/errors";

class App {
  private readonly app: Application

  constructor(){
    this.app = express();
    this.mountHealthCheck();
    this.mountMiddlewares();
    this.mountRoutes();
    this.mountHandlerErrors();
  }

  mountHealthCheck(): void {
    this.app.get("/health", (req, res) => {
      res.send("ok")
    })
  }

  mountMiddlewares(): void {
    //el express.json y el urlencoded se habilitan para transformar la data a json que se envia en el request.body 
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}))
  }

  mountRoutes(): void {
    this.app.use("/medic", MedicRouter);
  }
  mountHandlerErrors(): void{
    this.app.use(HandlerErrors.generic)
  }

  getApp(): Application{
    return this.app
  }

}



export default new App().getApp();