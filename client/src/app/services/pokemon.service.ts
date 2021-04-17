
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { defaultServerUrl, pokemonsUrl } from '../config/api';

import HttpResponse from '../models/http-response';
import Pokemon from '../models/pokemon';
import PokemonDetails from '../models/pokemon-details';
import UserPokemon from '../models/user-pokemon';

export interface IPokemonsResponse {
  next: string,
  results: Pokemon[],
};

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  
  constructor(private http: HttpClient) {}

  createPokemon(userPokemon: UserPokemon, url = `${defaultServerUrl}/pokemons`): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(url, userPokemon);
  }

  getPokemons(url = pokemonsUrl): Promise<IPokemonsResponse> {
    return this.http.get<IPokemonsResponse>(url).toPromise();
  }

  getPokemon(url: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(url);
  }
}
