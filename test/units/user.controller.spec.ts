import * as httpMocks from 'node-mocks-http';
import { UserController } from '../../src/modules/user/presentation/user.controller';
import { UserApplication } from '../../src/modules/user/application/user.application';
import { UserRepository } from '../../src/modules/user/domain/repositories/user.repository';
import { UserInfrastructure } from '../../src/modules/user/infrastructure/user.infrastructure';
import { RoleInfrastructure } from '../../src/modules/roles/infrastructure/role.infrastructure';
import { RoleRepository } from '../../src/modules/roles/domain/repositories/role.repository';
import mockUsers from '../mocks/users.json';
import RedisBootstrap from '../../src/bootstrap/Redis.bootstrap';
import { UserFactory } from '../../src/modules/user/domain/roots/user.factory';

let request: any;
let response: any;
let next: any;

describe('UserController', () => {
  beforeAll(() => {
    mockUsers;

    (UserApplication as jest.Mock) = jest.fn().mockReturnValue({
      getAll: jest.fn().mockResolvedValue({
        isErr: () => false,
        isOk: () => true,
        value: mockUsers.map((el: any) => {
          el["properties"] = () => el;     //esto es que la clase tiene el metodo properties que devuelve la data completa
          return el
        })
      }),
      create: jest.fn().mockResolvedValue({
        isErr: () => false,
        isOk: () => true,
        value: {
          id: mockUsers[0].id,
          name: mockUsers[0].name,
          lastname: mockUsers[0].lastname,
          email: mockUsers[0].email,
          roles: [{ name: 'admin' }],
        }
      }),
    });

    (UserInfrastructure as jest.Mock) = jest.fn();
    (RoleInfrastructure as jest.Mock) = jest.fn();
  });

  beforeEach(() => {
    request = httpMocks.createRequest();
    response = httpMocks.createResponse();
    next = jest.fn();
  })

  it("getAll should return 200 and a list of users", async () => {
    //Arrange
    const mockSet = jest.fn();
    RedisBootstrap.set = mockSet;

    const userInfrastructure: UserRepository = new UserInfrastructure();
    const roleInfrastructure: RoleRepository = new RoleInfrastructure();
    const userAppllication = new UserApplication(userInfrastructure, roleInfrastructure);
    const userController = new UserController(userAppllication);

    //Act
    await userController.getAll(request, response, next);

    //Assert
    expect(response.statusCode).toBe(200);
    expect(mockSet).toHaveBeenCalled();
    expect(userAppllication.getAll).toHaveBeenCalled();
    expect(mockSet).toHaveBeenCalledTimes(1);
    expect(userAppllication.getAll).toHaveBeenCalledTimes(1);
  });

  it('insert should return 201 and a user', async () => {
    //Arrange
    const mockCreate = jest.fn().mockReturnValue({
      isErr: () => false,
      isOk: () => true,
      value: {},
    });

    UserFactory.create = mockCreate;
    const userInfrastructure: UserRepository = new UserInfrastructure();
    const roleInfrastructure: RoleRepository = new RoleInfrastructure();
    const userAppllication = new UserApplication(userInfrastructure, roleInfrastructure);
    const userController = new UserController(userAppllication);

    //Act
    await userController.insert(request, response, next);

    expect(response.statusCode).toBe(201);
    expect(mockCreate).toHaveBeenCalled();
    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(response._getJSONData()).toEqual({
      id: mockUsers[0].id,
      name: mockUsers[0].name,
      lastname: mockUsers[0].lastname,
      email: mockUsers[0].email,
      roles: [{ name: 'admin' }],
    });

  });
});