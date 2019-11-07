import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ListRequestEffect } from './store/effects/list-request.effect';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    EffectsModule.forRoot([ListRequestEffect]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
