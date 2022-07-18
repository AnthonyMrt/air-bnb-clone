import { CategoriesInt } from './categories.interface';

export interface LocationInt {
  id: number;
  title: string;
  description: string;
  location: string;
  picture: string;
  stars: number;
  numberOfRooms: number;
  price: number;
  categoryId: number;
  category: CategoriesInt;
}
