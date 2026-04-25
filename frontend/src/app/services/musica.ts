import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class MusicaService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers() {
    return new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` });
  }

  listar() {
    return this.http.get<any[]>(`${this.api}/musicas`, { headers: this.headers() });
  }

  buscar(q: string) {
    return this.http.get<any[]>(`${this.api}/musicas/buscar?q=${q}`, { headers: this.headers() });
  }

  criar(musica: any) {
    return this.http.post(`${this.api}/musicas`, musica, { headers: this.headers() });
  }
  listarFavoritos() {
  return this.http.get<any[]>(`${this.api}/favoritos`, { headers: this.headers() });
}

adicionarFavorito(musica_id: number) {
  return this.http.post(`${this.api}/favoritos`, { musica_id }, { headers: this.headers() });
}

removerFavorito(musica_id: number) {
  return this.http.delete(`${this.api}/favoritos/${musica_id}`, { headers: this.headers() });
}
}