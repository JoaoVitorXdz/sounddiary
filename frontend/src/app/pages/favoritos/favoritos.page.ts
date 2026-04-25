import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBack, heart, heartOutline } from 'ionicons/icons';
import { MusicaService } from '../../services/musica';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon],
})
export class FavoritosPage implements OnInit {
  favoritos: any[] = [];

  constructor(private musicaService: MusicaService, private router: Router) {
    addIcons({ arrowBack, heart, heartOutline });
  }

  ngOnInit() {
    this.musicaService.listarFavoritos().subscribe({
      next: (data: any[]) => this.favoritos = data,
      error: () => {}
    });
  }

  remover(musica_id: number) {
    this.musicaService.removerFavorito(musica_id).subscribe({
      next: () => {
        this.favoritos = this.favoritos.filter(f => f.musica_id !== musica_id);
      }
    });
  }

  voltar() { this.router.navigate(['/home']); }
}