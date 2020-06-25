import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { PokemonCardComponent } from './pokemon/pokemon-card/pokemon-card.component';
import { FavoriteListComponent } from './pokemon/favorite-list/favorite-list.component';
import { PokemonComponent } from './pokemon/pokemon/pokemon.component';
import { ListComponent } from './pokemon/list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/service/auth.service';
import { PokemonService } from './pokemon/service/pokemon.service';
import { HttpClientModule } from '@angular/common/http';
import { ItemComponent } from './item/item/item.component';
import { ItemCardComponent } from './item/item-card/item-card.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { ItemService } from './item/service/item.service';
import { FavoriteItemListComponent } from './item/favorite-list/favorite-list.component';
import { HomeComponent } from './shared/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PokemonListComponent,
    PokemonCardComponent,
    PokemonComponent,
    FavoriteListComponent,
    ListComponent,
    ItemComponent,
    ItemCardComponent,
    ItemListComponent,
    FavoriteItemListComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [AuthService, PokemonService, ItemService],
  bootstrap: [AppComponent],
})
export class AppModule {}
