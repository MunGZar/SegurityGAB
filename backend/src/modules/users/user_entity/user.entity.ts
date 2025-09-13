import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column({length: 50, unique: true })
  Username: string;

  @Column({length: 100, unique: true })
  email: string;

  @Column({length: 250})
  password: string;

  @Column({
    type:'enum' ,
    enum: ['Admin', 'Cliente', 'Proveedor']})
  rol: 'Admin' | 'Cliente' | 'Proveedor';
}
