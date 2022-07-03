export default class Location {
  // 1. Typage des propiétés d'une location.
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
  // 2. Définition des valeurs par défaut des propriétés d'une location.
  constructor(
    id: number,
    title: string = 'new Location',
    description: string = 'new description',
    location: string = 'emplacement à défnir',
    picture: string = 'https://images.unsplash.com/photo-1532089957061-ceb61a40b6be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
    stars: number,
    numberOfRooms: number,
    price: number,
    categoryId: number,
    category: {
      id: number;
      name: string;
      description: string;
    }
  ) {
    // 3. Initialisation des propiétés d'une locations.
    this.id = id;
    this.title = title;
    this.description = description;
    this.location = location;
    this.picture = picture;
    this.stars = stars;
    this.numberOfRooms = numberOfRooms;
    this.price = price;
    this.categoryId = categoryId;
    this.category = category;
  }
}
