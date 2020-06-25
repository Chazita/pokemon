import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './pokemon/list/list.component';
import { PokemonComponent } from './pokemon/pokemon/pokemon.component';
import { FavoriteListComponent } from './pokemon/favorite-list/favorite-list.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { FavoriteItemListComponent } from './item/favorite-list/favorite-list.component';
import { HomeComponent } from './shared/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/register/register.module').then((m) => m.RegisterModule),
  },
  { path: 'pokemonList/:gen', component: ListComponent },
  { path: 'pokemon/:nombre', component: PokemonComponent },
  { path: 'pokemonFav', component: FavoriteListComponent },
  { path: 'itemFav', component: FavoriteItemListComponent },
  { path: 'items', component: ItemListComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
