import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ListRequestEffect } from './store/effects/list-request.effect';

const routes: Routes = [{ path: '' }, { path: 'post', loadChildren: () => import('./pages/post-page/post-page.module').then(m => m.PostPageModule) }];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    EffectsModule.forRoot([ListRequestEffect]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
