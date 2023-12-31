import { ApiProperty } from '@nestjs/swagger/dist';
import { User } from '@src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DeleteDateColumn } from 'typeorm/decorator/columns/DeleteDateColumn';

@Entity()
export class Board extends BaseEntity {
  @ApiProperty({ example: 1, description: '게시판 PK' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '테스트 제목', description: '게시판 제목' })
  @Column()
  title: string;

  @ApiProperty({ example: '테스트 내용.....', description: '게시판 내용' })
  @Column()
  content: string;

  @ApiProperty({ example: 1, description: '작성자 PK' })
  @Column()
  author: number;

  @ApiProperty({ example: 0, description: '게시판 노출 순서' })
  @Column()
  sequence: number;

  @ApiProperty({
    examples: ['2023-10-12', null],
    description: '게시글 삭제 시간',
    required: false,
    nullable: true,
  })
  @DeleteDateColumn()
  deleted_at: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.boards, {
    cascade: true,
  })
  @JoinColumn({
    name: 'author',
  })
  user: User;
}
