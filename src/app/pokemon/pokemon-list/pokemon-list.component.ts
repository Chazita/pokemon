import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from '../service/pokemon.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  @Input() generacion: string;

  algo;
  pokemonCtrl = new FormControl();
  filteredPokemons: Observable<any[]>;
  pokemonsShow: [];

  iconN: string;
  iconNumber: string;
  ascN: boolean;
  sortName = true;
  sortNumber = true;

  responsive = true;
  cols = 1;
  pokemons: [];

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.getPokemons();
  }
  getPokemons() {
    this.pokemonService.getPokemons(this.generacion).subscribe((data: any) => {
      this.pokemons = data.results;
      this.filteredPokemons = this.pokemonCtrl.valueChanges.pipe(
        startWith(''),
        map((value) => (value ? this._filter(value) : this.pokemons.slice()))
      );
      return this.pokemons;
    });
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  private _filter(value: string): any[] {
    const filterValue = value.toString().toLowerCase();
    return this.pokemons.filter(
      (option: any) =>
        option.name.toString().toLowerCase().indexOf(filterValue) === 0
    );
  }

  displayAutoComplete(subject) {
    return subject ? subject.name : undefined;
  }

  //#region Sort functions
  sortByName(sortName: boolean) {
    if (sortName) {
      this.iconNumber = '';
      this.pokemons.sort((a: any, b: any) => 0 - (a.name > b.name ? -1 : 1));
      this.iconN = 'rotate';
      this.sortName = false;
    } else {
      this.iconNumber = '';
      this.pokemons.sort((a: any, b: any) => 0 - (a.name > b.name ? 1 : -1));
      this.iconN = 'rotate down';
      this.sortName = true;
    }
    this.actualizarLista();
  }
  sortByNumber(sortNumber: boolean) {
    if (sortNumber) {
      this.iconN = '';
      this.pokemons.sort(
        (a: any, b: any) =>
          0 -
          (a.url.match(/\d+/g).map(Number)[1] >
          b.url.match(/\d+/g).map(Number)[1]
            ? 1
            : -1)
      );
      this.iconNumber = 'rotate';
      this.sortNumber = false;
    } else {
      this.iconN = '';
      this.pokemons.sort(
        (a: any, b: any) =>
          0 -
          (a.url.match(/\d+/g).map(Number)[1] >
          b.url.match(/\d+/g).map(Number)[1]
            ? -1
            : 1)
      );
      this.iconNumber = 'rotate down';
      this.sortNumber = true;
    }
    this.actualizarLista();
  }

  sortDefault() {
    this.pokemons.sort(
      (a: any, b: any) =>
        0 -
        (a.url.match(/\d+/g).map(Number)[1] > b.url.match(/\d+/g).map(Number)[1]
          ? -1
          : 1)
    );
    this.iconNumber = '';
    this.iconN = '';
    this.sortNumber = true;
    this.actualizarLista();
  }

  actualizarLista() {
    this.pokemonCtrl.setValue(' ');
    this.pokemonCtrl.setValue('');
  }
  //#endregion
}
