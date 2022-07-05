import { CategoriesDTO } from './categories.dto';

/* eslint-disable no-unused-vars */
export interface LocationDTO {
  id: number;
  title: string;
  description: string;
  location: string;
  picture: string;
  stars: number;
  numberOfRooms: number;
  price: number;
  categoryId: number;
  category: CategoriesDTO;
}
