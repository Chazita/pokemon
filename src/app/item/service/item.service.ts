import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  petition: any;
  private pokemonURL = 'https://pokeapi.co/api/v2/';
  constructor(private http: HttpClient) {}

  public getItems(): Observable<any> {
    this.petition = this.http.get(this.pokemonURL + 'item?offset=0&limit=954"');
    return this.petition;
  }

  public getItemInfo(itemName: string): Observable<any> {
    this.petition = this.http.get(this.pokemonURL + 'item/' + itemName);
    return this.petition;
  }
}
