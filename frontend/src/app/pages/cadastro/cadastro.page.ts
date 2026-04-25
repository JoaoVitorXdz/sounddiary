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
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink,
    IonContent, IonItem, IonLabel, IonInput, IonButton],
})
export class CadastroPage {
  nome = '';
  email = '';
  senha = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  async cadastrar() {
    if (!this.nome || !this.email || !this.senha) {
      this.mostrarToast('Preencha todos os campos', 'warning');
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Criando conta...' });
    await loading.present();

    this.auth.cadastrar({ nome: this.nome, email: this.email, senha: this.senha }).subscribe({
      next: async () => {
        await loading.dismiss();
        this.mostrarToast('Conta criada com sucesso!', 'success');
        this.router.navigate(['/login']);
      },
      error: async (err: any) => {
        await loading.dismiss();
        this.mostrarToast(err.error?.erro || 'Erro ao cadastrar', 'danger');
      }
    });
  }

  async mostrarToast(msg: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: msg, duration: 2500, color, position: 'top'
    });
    toast.present();
  }
}