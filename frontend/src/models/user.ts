export default class User {
  id: number;
  name: string = '';
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(id: number) {
    this.id = id;
  }
}
