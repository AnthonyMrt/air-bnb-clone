import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Location } from '../locations/Location.entity';

/**
 * - You should make sure they are properly decorated for typeorm
 */
@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', name: 'name' })
  name: string;

  @Column({ type: 'text', name: 'username', unique: true })
  username: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'text', name: 'password' })
  password: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdDate: Date;

  @OneToMany(() => Location, (location) => location.category)
  @JoinColumn({ name: 'location_id', referencedColumnName: 'id' })
  locations: Location;
}
