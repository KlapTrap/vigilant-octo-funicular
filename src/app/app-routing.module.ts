import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/post-page/post-page.module').then(m => m.PostPageModule),
  },
  {
    path: 'create-post',
    loadChildren: () =>
      import('./pages/post-create/post-create.module').then(
        m => m.PostCreateModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
