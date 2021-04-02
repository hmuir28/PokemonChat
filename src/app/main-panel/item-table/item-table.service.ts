import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ItemTableService {
  
  constructor(private http: HttpClient) {}

  getPokemons() {
    return this.http.get('?limit=100&offset=200');
  }

}
