import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonItem, IonLabel, IonInput,
  IonButton, LoadingController, ToastController
} from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink,
    IonContent, IonItem, IonLabel, IonInput, IonButton],
})
export class LoginPage {
  email = '';
  senha = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  async login() {
    if (!this.email || !this.senha) {
      this.mostrarToast('Preencha todos os campos', 'warning');
      return;
    }
    const loading = await this.loadingCtrl.create({ message: 'Entrando...' });
    await loading.present();

    this.auth.login({ email: this.email, senha: this.senha }).subscribe({
      next: async (res: any) => {
        this.auth.salvarToken(res.token, res.usuario);
        await loading.dismiss();
        this.router.navigate(['/home']);
      },
      error: async () => {
        await loading.dismiss();
        this.mostrarToast('Email ou senha inválidos', 'danger');
      }
    });
  }

  async mostrarToast(msg: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: msg, duration: 2000, color, position: 'top'
    });
    toast.present();
  }
}