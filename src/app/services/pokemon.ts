
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { pokemonsUrl } from '../config/api';
import { Observable } from 'rxjs';

import Pokemon from '../models/pokemon';
import PokemonDetails from '../models/pokemon-details';

interface IPokemonsResponse {
  results: Pokemon[],
};

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  
  constructor(private http: HttpClient) {}

  getPokemons(): Observable<IPokemonsResponse> {
    return this.http.get<IPokemonsResponse>(`${pokemonsUrl}?limit=100&offset=200`);
  }

  getPokemon(url: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(url);
  }
}
