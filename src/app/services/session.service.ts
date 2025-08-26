import {Injectable} from '@angular/core';
import {User} from '../core/models/user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public userSession: User = {
    id: '',
    username: '',
    password: '',
    email: '',
    photoUrl: '',
    welcomeMessage: '',
    role: ''
  };

  public usersSession: User[] = [];

  public logIn(user: User): void {
    this.userSession = user;
  }

  public saveUsersInSession(users: User[]): void {
    this.usersSession = users;
  }

}
