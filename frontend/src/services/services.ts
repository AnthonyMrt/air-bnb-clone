import Location from '../models/location';
import { CategoriesInt } from '../interfaces/categories.interface';
import { LocationInt } from '../interfaces/location.interface';

export default class LocationAPI {
  static async getAll(): Promise<LocationInt[]> {
    return await fetch('http://localhost:8000/locations')
      .then((response) => response.json())
      .then((data) => (this.isEmpty(data) ? null : data))
      .catch((error) => this.handleError(error));
  }

  static async getCategories(): Promise<CategoriesInt[]> {
    return await fetch(`http://localhost:8000/categories`)
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async fetchCountries(): Promise<any> {
    return await fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async getLocationById(id: number): Promise<LocationInt[]> {
    return await fetch(`http://localhost:8000/locations/location/${id}`)
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async addLocation(location: Location, token: string | null): Promise<LocationInt[]> {
    console.log(location);
    return await fetch('http://localhost:8000/locations/create', {
      method: 'POST',
      body: JSON.stringify(location),
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async updateLocation(id: number, input: LocationInt) {
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

  static searchLocation(title: string): Promise<LocationInt[]> {
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
