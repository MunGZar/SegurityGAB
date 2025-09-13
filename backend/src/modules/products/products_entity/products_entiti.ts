import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('products')
export class Products {
  @PrimaryGeneratedColumn()
  idProducts: number;

  @Column({length: 50, unique: true })
  nameProducts: string;

  @Column({length: 100, unique: true })
  e: string;



}
