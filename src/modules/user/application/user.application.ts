import bcryptjs from 'bcryptjs';
import { UserRepository } from '../domain/repositories/user.repository';
import { User, UserProperties } from '../domain/roots/user';

export class UserApplication {
  constructor(private readonly userRepository:UserRepository){}
  
  async create(user: User){
    const passwordHashed = await bcryptjs.hash(user.properties().password, 10)  //el 10 indica un nivel de complejidad  de cifrado 
    const userProperties: UserProperties = {
      ...user.properties(),
      password: passwordHashed
    };
    const userHash = User.reconstitute(userProperties);
    
    return await this.userRepository.save(userHash);
  }
}