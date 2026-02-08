// src/position/entities/position.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { ProjectMember } from 'src/project_members/project_member.entity';

@Entity('positions')
export class Position {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => ProjectMember, (member) => member.position)
  members: ProjectMember[];

  @CreateDateColumn()
  createdAt: Date;
}
