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
  category: {
    id: number;
    name: string;
    description: string;
  };
}
