import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ChatTalkjsComponent } from './components/chat-talkjs/chat-talkjs.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { title: 'Your Car Your Way - Login', path: '', component: LoginComponent },
  { title: 'Your Car Your Way - Bienvenue', path: 'home', component: HomeComponent },
  { title: 'Your Car Your Way - Chat', path: 'chat', component: ChatTalkjsComponent },
];
