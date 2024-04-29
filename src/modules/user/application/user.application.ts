import bcryptjs from 'bcryptjs';
import { UserRepository } from '../domain/repositories/user.repository';
import { User, UserProperties } from '../domain/roots/user';
import { RoleRepository } from '../../roles/domain/repositories/role.repository';

export class UserApplication {
  constructor(private readonly userRepository:UserRepository, private readonly roleRepository:RoleRepository){}
  
  async getAll(){
    return await this.userRepository.getAll();
  }

  async getById(id: string){
    return await this.userRepository.getById(id);
  }

  async create(user: User){

    let rolesUser;
    const rolesGetByIdsResult =  await this.roleRepository.getByIds(user.properties().roles as number[]);
    
    if(rolesGetByIdsResult.isErr()){

    }else{
      rolesUser = rolesGetByIdsResult.value;
    }
    
    const passwordHashed = await bcryptjs.hash(user.properties().password, 10)  //el 10 indica un nivel de complejidad  de cifrado 
    const userProperties: UserProperties = {
      ...user.properties(),
      password: passwordHashed,
      roles: rolesUser
    };
    const userHash = User.reconstitute(userProperties);
    
    return await this.userRepository.save(userHash);
  }

  async remove(user: User){
    return await this.userRepository.save(user);
  }

  async update(user: User){
    return await this.userRepository.save(user);
  }

  async getByPage(page: number, pageSize: number){
    return await this.userRepository.getByPage(page, pageSize);
  }
}