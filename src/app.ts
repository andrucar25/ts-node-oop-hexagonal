import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import { HandlerErrors } from "./core/helpers/errors";
import MedicRouter from "./modules/medic/presentation/medic.routes";
import UserRouter from "./modules/user/presentation/user.routes";
import RedisBootstrap from "./bootstrap/Redis.bootstrap";
import { AuthenticationMiddleware } from "./core/presentation/middlewares/authentication";

class App {
  private readonly app: Application

  constructor(){
    this.app = express();
    this.mountHealthCheck();
    this.mountMiddlewares();
    this.mountRoutes();
    this.mountHandlerErrors();  //el middleware de errores va despues del las rutas para controlar los errores de rutas
  }

  mountHealthCheck(): void {
    this.app.get("/health", (req, res) => {
      res.send("ok")
    })
  }

  mountMiddlewares(): void {
    this.app.use(cors());  //el cors hace que cualquier dominio tenga response de este backend 
    this.app.use(helmet());  //esto hace que no muestre alguna informacion del backend en el network, pone proteccion y bloquea que se usen los endpoints en un iframe
    //el express.json y el urlencoded se habilitan para transformar la data a json que se envia en el request.body 
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}))
  }

  mountRoutes(): void {
    this.app.use("/medic", MedicRouter);
    this.app.use("/user", AuthenticationMiddleware.canActive, UserRouter);
    this.app.get("/invalidate-cache", RedisBootstrap.clearCache)   //este endpoint se creo para eliminar la cache
  }
  
  mountHandlerErrors(): void{
    this.app.use(HandlerErrors.notFound);  
    this.app.use(HandlerErrors.generic)
  }

  getApp(): Application{
    return this.app
  }

}



export default new App().getApp();