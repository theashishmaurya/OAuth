// src/users/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  password: string; // Store hashed passwords, not plain text!

  @Column({ nullable: true })
  hashnodeUserId: string;

  @Column({ nullable: true })
  hashnodeApiKey: string;

  // Add other user properties as needed
}
