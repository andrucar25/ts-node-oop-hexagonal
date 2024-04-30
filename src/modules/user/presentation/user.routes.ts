import { Router } from "express";
import { UserRepository } from "../domain/repositories/user.repository";
import { UserInfrastructure } from "../infrastructure/user.infrastructure";
import { UserApplication } from "../application/user.application";
import { UserController } from "./user.controller";
import { RoleRepository } from "../../roles/domain/repositories/role.repository";
import { RoleInfrastructure } from "../../roles/infrastructure/role.infrastructure";
import { Validator } from "../../../core/presentation/middlewares/validator";
import { UserCreateDto } from "./dtos/requests/user-create.dto";
import { UserIdDto } from "./dtos/requests/user-id.dto";
import { UserUpdateDto } from "./dtos/requests/user-update.dto";
import { UserByPageDto } from "./dtos/requests/user-by-page.dto";
import { CacheMiddleware } from "../../../core/presentation/middlewares/cache";
import { Upload, UploadBuilder, UploadOptions } from "../../../core/presentation/middlewares/upload";
import { AuthorizationMiddleware } from "../../../core/presentation/middlewares/authorization";

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
    const uploadOptions: UploadOptions = new UploadBuilder()
      .addFieldName("photo")
      .addMaxSize(1024 * 1024 * 5)
      .addAllowedMimeTypes(["image/jpeg", "image/png", "image/jpg"])
      .addDestination("photos/profile")
      .addIsPublic(true)
      .build();

    this.router.post("/", AuthorizationMiddleware.canActive("ADMIN", "MEDIC") ,Upload.save(uploadOptions), 
      Validator.execute({body: new UserCreateDto()}), userController.insert.bind(userController));  //el bind esta puesto para que busque el objeto de contexto dentro de la clase userController
    this.router.get("/", CacheMiddleware.build("user"),userController.getAll.bind(userController));
    this.router.get("/page/:page/:pageSize", CacheMiddleware.build("userByPage"), Validator.execute({params: new UserByPageDto()}),userController.getByPage.bind(userController));
    this.router.delete("/:id", Validator.execute({params: new UserIdDto(), body: new UserUpdateDto()}) ,userController.remove.bind(userController));
    this.router.put("/:id", Validator.execute({params: new UserIdDto()}), userController.update.bind(userController));
  }
}

export default new UserRoutes().router;