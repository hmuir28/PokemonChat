
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { pokemonsUrl } from '../config/api';
import { Observable } from 'rxjs';

import Pokemon from '../models/pokemon';
import PokemonDetails from '../models/pokemon-details';

export interface IPokemonsResponse {
  next: string,
  results: Pokemon[],
};

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  
  constructor(private http: HttpClient) {}

  getPokemons(url = pokemonsUrl): Promise<IPokemonsResponse> {
    return this.http.get<IPokemonsResponse>(url).toPromise();
  }

  getPokemon(url: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(url);
  }
}
