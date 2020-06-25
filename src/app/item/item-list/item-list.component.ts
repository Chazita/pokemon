import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from '../service/item.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  @Input() generacion: string;

  algo;
  itemCtrl = new FormControl();
  filteredItem: Observable<any[]>;
  pokemonsShow: [];

  iconN: string;
  iconNumber: string;
  ascN: boolean;
  sortName = true;
  sortNumber = true;

  responsive = true;
  cols = 1;
  items: [];

  constructor(private itemService: ItemService, private router: Router) {}

  ngOnInit(): void {
    this.getItems();
  }
  getItems() {
    this.itemService.getItems().subscribe((data: any) => {
      this.items = data.results;
      this.filteredItem = this.itemCtrl.valueChanges.pipe(
        startWith(''),
        map((value) => (value ? this._filter(value) : this.items.slice()))
      );
      return this.items;
    });
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  private _filter(value: string): any[] {
    const filterValue = value.toString().toLowerCase();
    return this.items.filter(
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
      this.items.sort((a: any, b: any) => 0 - (a.name > b.name ? -1 : 1));
      this.iconN = 'rotate';
      this.sortName = false;
    } else {
      this.iconNumber = '';
      this.items.sort((a: any, b: any) => 0 - (a.name > b.name ? 1 : -1));
      this.iconN = 'rotate down';
      this.sortName = true;
    }
    this.actualizarLista();
  }
  sortByNumber(sortNumber: boolean) {
    if (sortNumber) {
      this.iconN = '';
      this.items.sort(
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
      this.items.sort(
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
    this.items.sort(
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
    this.itemCtrl.setValue(' ');
    this.itemCtrl.setValue('');
  }
  //#endregion
}
