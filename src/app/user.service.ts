import { Injectable } from '@angular/core';
import usersData from '../assets/data/users.json';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = usersData;
  constructor() {}

  checkLogin(user1: User): boolean {
    for (let user of this.users) {
      if (user.username == user1.username && user.password == user1.password) {
        return true;
      }
    }
    return false;
  }

  addUser(user: User): void {
    console.log(this.users);
    this.users.push(user);
    console.log(this.users);
  }
}
