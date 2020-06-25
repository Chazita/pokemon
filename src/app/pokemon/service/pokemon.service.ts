import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private pokemonURL = 'https://pokeapi.co/api/v2/';
  constructor(private http: HttpClient) {}
  petition: any;
  public getPokemons(gen: string): Observable<any> {
    switch (gen) {
      case 'gen1':
        this.petition = this.http.get(
          this.pokemonURL + 'pokemon?offset=0&limit=151'
        );
        break;
      case 'gen2':
        this.petition = this.http.get(
          this.pokemonURL + 'pokemon?offset=151&limit=100'
        );
        break;
      case 'gen3':
        this.petition = this.http.get(
          this.pokemonURL + 'pokemon?offset=251&limit=135'
        );
        break;
      case 'gen4':
        this.petition = this.http.get(
          this.pokemonURL + 'pokemon?offset=386&limit=107'
        );
        break;
      case 'gen5':
        this.petition = this.http.get(
          this.pokemonURL + 'pokemon?offset=493&limit=156'
        );
        break;
      case 'gen6':
        this.petition = this.http.get(
          this.pokemonURL + 'pokemon?offset=649&limit=72'
        );
        break;
      case 'gen7':
        this.petition = this.http.get(
          this.pokemonURL + 'pokemon?offset=721&limit=86'
        );
        break;
      case 'all':
        this.petition = this.http.get(
          this.pokemonURL + 'pokemon?offset=0&limit=807'
        );
        break;
    }
    return this.petition;
  }

  public getPokemonInfo(pokemonName: string): Observable<any> {
    this.petition = this.http.get(this.pokemonURL + 'pokemon/' + pokemonName);
    return this.petition;
  }
}
