import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class RegistroService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers() {
    return new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` });
  }

  listar() {
    return this.http.get<any[]>(`${this.api}/registros`, { headers: this.headers() });
  }

  criar(registro: any) {
    return this.http.post(`${this.api}/registros`, registro, { headers: this.headers() });
  }

  estatisticas() {
    return this.http.get<any>(`${this.api}/registros/estatisticas`, { headers: this.headers() });
  }

  deletar(id: number) {
    return this.http.delete(`${this.api}/registros/${id}`, { headers: this.headers() });
  }
}