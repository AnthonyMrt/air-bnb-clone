import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../categories/Category.entity';
import { Users } from '../users/Users.entity';

/**
 * This class represents a simplified version of a Location.
 * Which is the central entity around which Holis Test's logic is organized.
 */
@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @Column()
  picture: string;

  @Column()
  stars: number;

  @Column({ type: 'integer', name: 'number_of_rooms' })
  numberOfRooms: number;

  @Column()
  price: number;

  @Column({ type: 'integer', name: 'category_id' })
  categoryId: number;

  @ManyToOne(() => Category, (cat) => cat.name)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: Category;

  @ManyToOne(() => Users, (user) => user.id)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: Users;
}
