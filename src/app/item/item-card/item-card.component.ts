import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
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
    const array: any = JSON.parse(localStorage.getItem('favoriteItem'));
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
    if (this.name[0] === 't' && this.name[1] === 'm') {
      this.picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-normal.png`;
    } else {
      this.picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${this.name}.png`;
    }
    if (this.name[0] === 'h' && this.name[1] === 'm') {
      this.picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/hm-normal.png`;
    }
  }

  setFav() {
    const itemFav = JSON.parse(localStorage.getItem('favoriteItem'));
    itemFav.favorites.push({ name: this.name, url: this.url });
    localStorage.setItem('favoriteItem', JSON.stringify(itemFav));
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.location.path()]);
    });
  }
  removeFav() {
    const itemFav = JSON.parse(localStorage.getItem('favoriteItem'));
    itemFav.favorites = itemFav.favorites.filter(
      (item) => item.name !== this.name
    );
    localStorage.setItem('favoriteItem', JSON.stringify(itemFav));
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.location.path()]);
    });
  }
}
