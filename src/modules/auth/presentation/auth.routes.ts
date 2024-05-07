import { Router } from "express";
import { Validator } from "../../../core/presentation/middlewares/validator";
import { AuthLoginDto } from "./dtos/requests/auth-login.dto";
import { AuthController } from "./auth.controller";
import { AuthApplication } from '../application/auth.application';
import { UserApplication } from '../../user/application/user.application';
import { UserInfrastructure } from '../../user/infrastructure/user.infrastructure';
import { RoleInfrastructure } from '../../roles/infrastructure/role.infrastructure';


const roleRepository = new RoleInfrastructure();
const userRepository = new UserInfrastructure();
const userApplication = new UserApplication(userRepository, roleRepository);
const authApplication = new AuthApplication(userApplication);
const authController = new AuthController(authApplication);

class AuthRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.addRoutes();
  }

  addRoutes() {
    this.router.post("/login", Validator.execute({body: new AuthLoginDto()}), authController.login.bind(authController)); 
  }
}

export default new AuthRoutes().router;