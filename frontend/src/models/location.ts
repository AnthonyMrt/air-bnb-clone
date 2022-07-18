export default class Location {
  // 1. Typage des propiétés d'une location.
  id: number;
  title: string = '';
  description: string = '';
  location: string = '';
  picture: string = '';
  stars: number = 0;
  numberOfRooms: number = 0;
  price: number = 0;
  categoryId: number = 0;
  category: [number, string, string] = [1000, '', ''];
  // 2. Définition des valeurs par défaut des propriétés d'une location.
  constructor(id: number) {
    // 3. Initialisation des propiétés d'une locations.
    this.id = id;
  }
}
