import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonButton, IonIcon, ToastController, LoadingController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBack, logOut, create, checkmark, close, camera } from 'ionicons/icons';
import { AuthService } from '../../services/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule,
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonButton, IonIcon],
})
export class PerfilPage implements OnInit {
  usuario: any;
  editando = false;
  form = { nome: '', email: '', senha_atual: '', nova_senha: '' };

  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpClient,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {
    addIcons({ arrowBack, logOut, create, checkmark, close, camera });
    this.usuario = this.auth.getUsuario();
  }

  ngOnInit() {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` });
    this.http.get<any>(`${environment.apiUrl}/usuarios/perfil`, { headers }).subscribe({
      next: (data) => {
        this.usuario = data;
        this.auth.salvarToken(this.auth.getToken()!, data);
      }
    });
  }

  escolherFoto() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/jpeg,image/png,image/webp';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) this.uploadFoto(file);
    };
    input.click();
  }

  async uploadFoto(file: File) {
    const loading = await this.loadingCtrl.create({ message: 'Enviando foto...' });
    await loading.present();

    const formData = new FormData();
    formData.append('foto', file);

    const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` });

    this.http.post<any>(`${environment.apiUrl}/usuarios/perfil/foto`, formData, { headers }).subscribe({
      next: async (res) => {
        await loading.dismiss();
        this.usuario.foto_perfil = res.foto_perfil;
        this.auth.atualizarFoto(res.foto_perfil);
        this.toast('Foto atualizada!', 'success');
      },
      error: async () => {
        await loading.dismiss();
        this.toast('Erro ao enviar foto', 'danger');
      }
    });
  }

  iniciarEdicao() {
    this.form = { nome: this.usuario.nome, email: this.usuario.email, senha_atual: '', nova_senha: '' };
    this.editando = true;
  }

  cancelar() { this.editando = false; }

  async salvar() {
    if (!this.form.nome || !this.form.email) {
      this.toast('Preencha nome e email', 'warning'); return;
    }
    const loading = await this.loadingCtrl.create({ message: 'Salvando...' });
    await loading.present();

    const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` });
    const body: any = { nome: this.form.nome, email: this.form.email };
    if (this.form.senha_atual) {
      body.senha_atual = this.form.senha_atual;
      body.nova_senha = this.form.nova_senha;
    }

    this.http.put<any>(`${environment.apiUrl}/usuarios/perfil`, body, { headers }).subscribe({
      next: async (res) => {
        await loading.dismiss();
        this.auth.salvarToken(this.auth.getToken()!, res.usuario);
        this.usuario = { ...this.usuario, ...res.usuario };
        this.editando = false;
        this.toast('Perfil atualizado!', 'success');
      },
      error: async (err) => {
        await loading.dismiss();
        this.toast(err.error?.erro || 'Erro ao atualizar', 'danger');
      }
    });
  }

  async logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  async toast(msg: string, color: string) {
    const t = await this.toastCtrl.create({ message: msg, duration: 2500, color, position: 'top' });
    t.present();
  }

  voltar() { this.router.navigate(['/home']); }
  getIniciais() { return this.usuario?.nome?.charAt(0)?.toUpperCase() || '?'; }
}