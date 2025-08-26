import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { SessionService } from '../../services/session.service';
import {RouterLink} from '@angular/router';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {MessageModule} from 'primeng/message';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, CardModule, ButtonModule, MessageModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public sessionService: SessionService) {}
}
