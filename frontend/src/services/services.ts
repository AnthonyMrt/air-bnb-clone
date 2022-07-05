import Location from '../models/location';
import { LocationDTO } from './dto/location.dto';
import { CategoriesDTO } from './dto/categories.dto';

export default class LocationAPI {
  static async getAll(): Promise<LocationDTO[]> {
    return await fetch('http://localhost:8000/locations')
      .then((response) => response.json())
      .then((data) => (this.isEmpty(data) ? null : data))
      .catch((error) => this.handleError(error));
  }

  static async getCategories(): Promise<CategoriesDTO[]> {
    return await fetch(`http://localhost:8000/categories`)
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async getLocationById(id: number): Promise<LocationDTO[]> {
    return await fetch(`http://localhost:8000/locations/${id}`)
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async addLocation(location: Location): Promise<LocationDTO[]> {
    console.log(location.category);
    return await fetch('http://localhost:8000/locations/create', {
      method: 'POST',
      body: JSON.stringify(location),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async updateLocation(id: number, input: LocationDTO) {
    return await fetch(`http://localhost:8000/locations/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify(input),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async deleteLocation(id: number): Promise<{}> {
    return await fetch(`http://localhost:8000/locations/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static searchLocation(title: string): Promise<LocationDTO[]> {
    return fetch(`http://localhost:8000/locations/search?title=${title}`)
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }

  static handleError(error: Error): void {
    console.log(error);
  }
}
