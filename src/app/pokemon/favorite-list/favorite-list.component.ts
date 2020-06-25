import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css'],
})
export class FavoriteListComponent implements OnInit {
  responsive = true;
  cols = 1;
  pokemons: any;

  constructor() {}

  ngOnInit(): void {
    this.pokemons = JSON.parse(localStorage.getItem('favorite'));
  }
}
