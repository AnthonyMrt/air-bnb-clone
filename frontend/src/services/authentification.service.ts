import User from '../models/user';
import { UserInt } from '../interfaces/user.interface';

export default class AuthenticationService {
  static async register(user: User): Promise<UserInt[]> {
    console.log(user);
    return await fetch('http://localhost:8000/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => (this.isEmpty(data) ? null : data))
      .catch((error) => this.handleError(error));
  }

  static isAuthenticated: boolean = false;

  static async login(user: User): Promise<any> {
    const signIn = await fetch('http://localhost:8000/auth/signin', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    const data = signIn.json();
    if (signIn) {
      this.isAuthenticated = true;
    }

    return data;
  }

  static async checkEmail(email: string | undefined): Promise<UserInt[]> {
    return await fetch('http://localhost:8000/users/checkEmail', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async checkUsername(username: string | undefined): Promise<UserInt[]> {
    return await fetch('http://localhost:8000/users/checkUsername', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ username })
    })
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
