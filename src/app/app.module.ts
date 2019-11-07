import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreState } from './types/store.types';
import { entityListReducers } from './store/reducers/entity-list.reducer';
import { entitiesReducers } from './store/reducers/entity.reducer';
import { entityRequestReducers } from './store/reducers/enity-request.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot<StoreState>({
      entityLists: entityListReducers,
      entites: entitiesReducers,
      entityRequests: entityRequestReducers,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
