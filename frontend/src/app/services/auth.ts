import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) { }

  cadastrar(dados: any) {
    return this.http.post(`${this.api}/auth/cadastrar`, dados);
  }

  login(dados: any) {
    return this.http.post<any>(`${this.api}/auth/login`, dados);
  }

  salvarToken(token: string, usuario: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUsuario() {
    const u = localStorage.getItem('usuario');
    return u ? JSON.parse(u) : null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  estaLogado() {
    return !!this.getToken();
  }
  atualizarFoto(foto_perfil: string) {
    const usuario = this.getUsuario();
    if (usuario) {
      usuario.foto_perfil = foto_perfil;
      localStorage.setItem('usuario', JSON.stringify(usuario));
    }
  }
}