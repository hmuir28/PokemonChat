
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { pokemonsUrl, serverUrl } from '../config/api';

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

  createPokemon(userPokemon: UserPokemon, url = serverUrl): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(url, userPokemon);
  }

  getPokemons(url = pokemonsUrl): Promise<IPokemonsResponse> {
    return this.http.get<IPokemonsResponse>(url).toPromise();
  }

  getUserPokemons(uid: string, url = serverUrl): Promise<HttpResponse> {
    return this.http.get<HttpResponse>(`${url}/user/${uid}/pokemons`).toPromise();
  }

  getUserPokemon(uid: string, pokemonId: string, url = serverUrl): Promise<HttpResponse> {
    return this.http.get<HttpResponse>(`${url}/user/${uid}/pokemon/${pokemonId}`).toPromise();
  }

  getPokemon(url: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(url);
  }

  updatePokemon(uid: string, pokemonId: string, userPokemon: UserPokemon, url = serverUrl): Observable<HttpResponse> {
    return this.http.put<HttpResponse>(`${url}/user/${uid}/pokemon/${pokemonId}`, userPokemon);
  }
}
