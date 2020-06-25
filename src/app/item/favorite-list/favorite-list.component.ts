import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss'],
})
export class FavoriteItemListComponent implements OnInit {
  responsive = true;
  cols = 1;
  items: any;

  constructor() {}

  ngOnInit(): void {
    this.items = JSON.parse(localStorage.getItem('favoriteItem'));
  }
}
