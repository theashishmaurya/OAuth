import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Name of the client

  @Column()
  clientId: string;

  @Column()
  clientSecret: string;

  @Column()
  redirectUri: string; // Where the user is redirected after authorization

  @Column({ default: true })
  grantTypes: string; // Types of grants allowed for the client

  @Column({ default: true })
  scope: string; // Scope of access requested

  @Column({ type: 'boolean', default: true })
  isActive: boolean; // Whether the client is active
}
