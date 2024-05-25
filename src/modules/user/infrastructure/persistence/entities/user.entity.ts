import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { RoleEntity } from '../../../../roles/infrastructure/persistence/entities/role.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  lastname: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  photo: string;

  @Column({ type: 'bool', default: true })
  isActive: boolean;

  @Column({ type: 'varchar', length: 300 })
  refreshToken: string;

  @Column({ type: 'datetime' })
  createdAt: Date;

  @Column({ type: 'datetime', nullable: true })
  updatedAt: Date | null;

  @Column({ type: 'datetime', nullable: true })
  deletedAt: Date | null;

  @ManyToMany(() => RoleEntity, (role) => role.users, { eager: true }) //el eager hace el populate, la otra forma de hacerlo es con relations en infrastructure
  // @ManyToMany(()=> RoleEntity, (role) => role.users)
  @JoinTable() //esto especifica quien manda en la relacion con la otra tabla
  roles: RoleEntity[];
}
