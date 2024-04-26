import { Router } from "express";
import { UserRepository } from "../domain/repositories/user.repository";
import { UserInfrastructure } from "../infrastructure/user.infrastructure";
import { UserApplication } from "../application/user.application";
import { UserController } from "./user.controller";
import { RoleRepository } from "../../roles/domain/repositories/role.repository";
import { RoleInfrastructure } from "../../roles/infrastructure/role.infrastructure";

const userRepository: UserRepository = new UserInfrastructure();
const roleRepository: RoleRepository = new RoleInfrastructure();
const userApplication: UserApplication = new UserApplication(
  userRepository, roleRepository
);
const userController = new UserController(userApplication);

class UserRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.addRoutes();
  }

  addRoutes() {
    this.router.post("/", userController.insert.bind(userController));  //el bind esta puesto para que busque el objeto de contexto dentro de la clase userController
    this.router.get("/", userController.getAll.bind(userController));
  }
}

export default new UserRoutes().router;