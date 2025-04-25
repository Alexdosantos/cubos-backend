import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('movie')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  titleOriginal: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  sinopse: string;

  @Column({ type: 'int' })
  popularity: number;

  @Column({ type: 'int' })
  votes: number;

  @Column({ type: 'varchar' })
  situation: string;

  @Column({ type: 'varchar', array: true })
  language: string[];

  @Column({ type: 'date' })
  launchDate: Date;

  @Column({ type: 'varchar', array: true })
  genre: string[];

  @Column({ type: 'int' })
  duration: number;

  @Column({ type: 'int', nullable: true })
  budget: number;

  @Column({ type: 'int', nullable: true })
  revenue: number;

  @Column({ type: 'int', nullable: true })
  profit: number;

  @Column({ type: 'varchar' })
  cape: string;

  @Column({ type: 'varchar' })
  banner: string;

  @Column({ type: 'varchar' })
  trailer: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
