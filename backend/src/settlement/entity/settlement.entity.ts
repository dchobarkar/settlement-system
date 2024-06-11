import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Settlement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  status: string;

  @Column()
  lastModifiedBy: string;
}
