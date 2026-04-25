import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBack, musicalNotes, star, headset } from 'ionicons/icons';
import { RegistroService } from '../../services/registro';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon],
})
export class DashboardPage implements OnInit {
  stats: any = null;

  constructor(private registroService: RegistroService, private router: Router) {
    addIcons({ arrowBack, musicalNotes, star, headset });
  }

  ngOnInit() {
    this.registroService.estatisticas().subscribe({
      next: (data: any) => this.stats = data,
      error: () => {}
    });
  }

  getPct(qtd: number) {
    if (!this.stats?.total) return 0;
    return Math.round((qtd / this.stats.total) * 100);
  }

  getEstrelas(media: number) {
    return Array(Math.round(media)).fill(0);
  }

  getVazias(media: number) {
    return Array(5 - Math.round(media)).fill(0);
  }

  voltar() { this.router.navigate(['/home']); }
}