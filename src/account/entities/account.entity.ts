import { Owner } from 'src/owner/entities/owner.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountNumber: string;

  @Column()
  balance: number;

  @ManyToOne(() => Owner, (owner) => owner.account, { onDelete: 'SET NULL' })
  owner: Owner;
}
