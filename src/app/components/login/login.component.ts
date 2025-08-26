import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // pour *ngIf
import { FormsModule } from '@angular/forms';    // pour ngModel
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SessionService } from '../../services/session.service';
import { User } from '../../core/models/user';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import {Message} from 'primeng/message';
import {Divider} from 'primeng/divider';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModule, ButtonModule, InputTextModule, PasswordModule, Message, Divider],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private sessionService: SessionService
  ) {}

  login(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        const user = users.find((u: User) => u.username === this.username && u.password === this.password);
        if (user) {
          this.sessionService.logIn(user);
          this.sessionService.saveUsersInSession(users);
          if (user.role === 'support') {
            this.router.navigate(['chat']);
          } else {
            this.router.navigate(['home']);
          }
        } else {
          this.errorMessage = 'Mauvais utilisateur ou mot de passe';
        }
      },
      error: (err) => {
        console.error('Erreur avec le fichier json des users', err);
        this.errorMessage = 'Erreur lors du login';
      }
    });
  }
}
