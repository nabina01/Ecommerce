import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'uploads' })
export class Upload {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'public_id' })
  publicId: string;

  @Column({ name: 'secure_url' })
  secureUrl: string;

  @Column({ name: 'original_filename', nullable: true })
  originalFilename?: string;

  @Column({ type: 'bigint', nullable: true })
  bytes?: number;

  @Column({ nullable: true })
  format?: string;

  @Column({ type: 'int', nullable: true })
  width?: number;

  @Column({ type: 'int', nullable: true })
  height?: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
