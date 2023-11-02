import { Board } from '@src/board/entities/board.entity';
import { USER_ROLES } from '@src/role/role.enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @Column()
  gender: string;

  @Column()
  birth: Date;

  @Column()
  role: USER_ROLES;

  @Column()
  signed_in: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column()
  last_sign_in: Date;

  @Column()
  fail_sign_in_count: number;

  @OneToMany(() => Board, (board) => board.user)
  boards: Board[];
}
