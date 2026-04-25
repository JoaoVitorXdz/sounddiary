import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonIcon, IonButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { musicalNotes, barChart, logOut, chevronForward, heart, person } from 'ionicons/icons';
import { AuthService } from '../../services/auth';
import { RegistroService } from '../../services/registro';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink,
    IonContent, IonHeader, IonToolbar, IonTitle, IonIcon, IonButton],
})
export class HomePage implements OnInit {
  usuario: any;
  stats: any = null;
  recentes: any[] = [];

  constructor(
    private auth: AuthService,
    private router: Router,
    private registroService: RegistroService
  ) {
    addIcons({ musicalNotes, barChart, logOut, chevronForward, heart, person });
    this.usuario = this.auth.getUsuario();
    if (!this.auth.estaLogado()) this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.registroService.estatisticas().subscribe({
      next: (data: any) => this.stats = data,
      error: () => {}
    });
    this.registroService.listar().subscribe({
      next: (data: any[]) => this.recentes = data.slice(0, 3),
      error: () => {}
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  getSaudacao() {
    const h = new Date().getHours();
    if (h < 12) return 'Bom dia';
    if (h < 18) return 'Boa tarde';
    return 'Boa noite';
  }
}