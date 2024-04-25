import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: "user"})
export class UserEntity {
  @PrimaryColumn({type: "uuid"})
  id: string

  @Column({type: "varchar", length: 50})
  name: string

  @Column({type: "varchar", length: 50})
  lastname: string

  @Column({type: "varchar", length: 50, unique: true})
  email: string

  @Column({type: "varchar", length: 100})
  password: string

  @Column({type: "varchar", length: 100, nullable: true})
  photo: string

  @Column({type: "bool", default: true})
  isActive: boolean

  @Column({type: "varchar", length: 300})
  refreshToken: string

  @Column({type: "datetime"})
  createdAt: Date;

  @Column({type: "datetime", nullable: true})
  updatedAt: Date | null

  @Column({type: "datetime", nullable: true})
  deletedAt: Date | null

}