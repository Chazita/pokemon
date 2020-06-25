import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../service/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnInit {
  typesNumber: string;
  displayedColumns = ['Name', 'Base'];
  private pokemonName: string;
  pokemonData: any;
  constructor(
    private pokemonService: PokemonService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params) => {
      this.pokemonName = params['nombre'];
    });
    this.pokemonService.getPokemonInfo(this.pokemonName).subscribe((data) => {
      this.pokemonData = data;
      if (this.pokemonData.types.length === 1) {
        this.typesNumber = 'type1';
      } else {
        this.typesNumber = 'type2';
      }
    });
  }
}
