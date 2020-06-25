import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
})
export class PokemonCardComponent implements OnInit {
  @Input() name: string;
  @Input() url: string;
  number: number;
  picture: string;
  user;

  isIn = false;

  constructor(private router: Router, private location: Location) {
    this.user = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this.getPicture();
    const array: any = JSON.parse(localStorage.getItem('favorite'));
    if (array != null) {
      for (let i = 0; i < array.favorites.length; i++) {
        if (array.favorites[i].name === this.name) {
          this.isIn = true;
        }
      }
    }
  }

  getPicture() {
    this.number = this.url.match(/\d+/g).map(Number)[1];
    this.picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.number}.png`;
  }

  setFav() {
    const pokemonFav = JSON.parse(localStorage.getItem('favorite'));
    pokemonFav.favorites.push({ name: this.name, url: this.url });
    localStorage.setItem('favorite', JSON.stringify(pokemonFav));
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.location.path()]);
    });
  }
  removeFav() {
    const pokemonFav = JSON.parse(localStorage.getItem('favorite'));
    pokemonFav.favorites = pokemonFav.favorites.filter(
      (item) => item.name !== this.name
    );
    localStorage.setItem('favorite', JSON.stringify(pokemonFav));
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.location.path()]);
    });
  }
}
