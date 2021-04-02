
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { pokemonsUrl } from '../../config/api';
import { Pokemon } from '../../models/pokemon';

interface IPokemonResponse {
  results: Pokemon[],
};

@Injectable({
  providedIn: 'root'
})
export class ItemTableService {
  
  constructor(private http: HttpClient) {}

  getPokemons() {
    return this.http.get<IPokemonResponse>(`${pokemonsUrl}?limit=100&offset=200`);
  }

}
