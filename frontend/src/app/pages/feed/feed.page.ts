import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButton,
  IonIcon, IonSearchbar, ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBack, add, heart, heartOutline, trashOutline } from 'ionicons/icons';
import { RegistroService } from '../../services/registro';
import { MusicaService } from '../../services/musica';

declare var window: any;

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule,
    IonContent, IonHeader, IonToolbar, IonTitle, IonButton,
    IonIcon, IonSearchbar],
})
export class FeedPage implements OnInit {
  registros: any[] = [];
  registrosFiltrados: any[] = [];
  musicas: any[] = [];
  favoritos: Set<number> = new Set();
  mostrarForm = false;
  termoBusca = '';
  tocandoAgora: any = null;
  novoRegistro = { musica_id: '', avaliacao: 5, comentario: '' };

  constructor(
    private registroService: RegistroService,
    private musicaService: MusicaService,
    private router: Router,
    private toastCtrl: ToastController
  ) {
    addIcons({ arrowBack, add, heart, heartOutline, trashOutline });
  }

  ngOnInit() {
    this.carregarTudo();
  }

  carregarTudo() {
    this.registroService.listar().subscribe({
      next: (data: any[]) => {
        this.registros = data;
        this.registrosFiltrados = data;
      }
    });
    this.musicaService.listar().subscribe({
      next: (data: any[]) => this.musicas = data
    });
    this.musicaService.listarFavoritos().subscribe({
      next: (data: any[]) => {
        this.favoritos = new Set(data.map((f: any) => f.musica_id));
      }
    });
  }

  filtrar(event: any) {
    const termo = event.detail.value?.toLowerCase() || '';
    this.termoBusca = termo;
    this.registrosFiltrados = this.registros.filter(r =>
      r.titulo.toLowerCase().includes(termo) ||
      r.artista.toLowerCase().includes(termo)
    );
  }

  tocar(registro: any) {
    if (this.tocandoAgora?.musica_id === registro.musica_id) {
      this.fecharPlayer();
      return;
    }
    this.tocandoAgora = registro;
    const query = encodeURIComponent(`${registro.titulo} ${registro.artista}`);
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
  }

  fecharPlayer() {
    this.tocandoAgora = null;
  }

  async deletarRegistro(id: number, event: Event) {
  event.stopPropagation();
  const toast = await this.toastCtrl.create({
    message: 'Registro deletado',
    duration: 2000,
    color: 'danger',
    position: 'top'
  });

  this.registroService.deletar(id).subscribe({
    next: () => {
      this.registros = this.registros.filter(r => r.id !== id);
      this.registrosFiltrados = this.registrosFiltrados.filter(r => r.id !== id);
      toast.present();
    }
  });
}

  async toggleFavorito(musica_id: number, event: Event) {
    event.stopPropagation();
    if (this.favoritos.has(musica_id)) {
      this.musicaService.removerFavorito(musica_id).subscribe({
        next: () => {
          this.favoritos.delete(musica_id);
          this.favoritos = new Set(this.favoritos);
        }
      });
    } else {
      this.musicaService.adicionarFavorito(musica_id).subscribe({
        next: () => {
          this.favoritos.add(musica_id);
          this.favoritos = new Set(this.favoritos);
        },
        error: async () => {
          const t = await this.toastCtrl.create({ message: 'Já favoritado!', duration: 1500, color: 'warning', position: 'top' });
          t.present();
        }
      });
    }
  }

  async salvarRegistro() {
    if (!this.novoRegistro.musica_id) {
      const t = await this.toastCtrl.create({ message: 'Selecione uma música', duration: 2000, color: 'warning', position: 'top' });
      t.present(); return;
    }
    this.registroService.criar(this.novoRegistro).subscribe({
      next: async () => {
        const t = await this.toastCtrl.create({ message: 'Registro salvo!', duration: 2000, color: 'success', position: 'top' });
        t.present();
        this.mostrarForm = false;
        this.novoRegistro = { musica_id: '', avaliacao: 5, comentario: '' };
        this.carregarTudo();
      },
      error: async () => {
        const t = await this.toastCtrl.create({ message: 'Erro ao salvar', duration: 2000, color: 'danger', position: 'top' });
        t.present();
      }
    });
  }

  estrelas(n: number) { return Array(n).fill(0); }
  voltar() { this.router.navigate(['/home']); }
}