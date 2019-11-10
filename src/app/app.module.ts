import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreState } from './types/store.types';
import { entityListReducers } from './store/reducers/entity-list.reducer';
import { entitiesReducers } from './store/reducers/entity.reducer';
import { entityRequestReducers } from './store/reducers/enity-request.reducer';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from './components/components.module';
import { PipesModule } from './pipes/pipes.module';
import { ListRequestEffect } from './store/effects/list-request.effect';
import { EntityCreateEffect } from './store/effects/entity-create.effect';
import { EntityFetchEffect } from './store/effects/entity-fetch.effect';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    EffectsModule.forRoot([
      ListRequestEffect,
      EntityCreateEffect,
      EntityFetchEffect,
    ]),
    StoreModule.forRoot<StoreState>(
      {
        entityLists: entityListReducers,
        entites: entitiesReducers,
        entityRequests: entityRequestReducers,
      },
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
          strictStateSerializability: true,
        },
      },
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    ComponentsModule,
    PipesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
