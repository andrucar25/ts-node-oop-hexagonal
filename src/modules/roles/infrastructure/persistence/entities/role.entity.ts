import { UserEntity } from "../../../../user/infrastructure/persistence/entities/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "role"})
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar", length: 50, unique: true})
  name: string;

  @ManyToMany(() => UserEntity, (user) => user.roles )
  users: UserEntity[];
}