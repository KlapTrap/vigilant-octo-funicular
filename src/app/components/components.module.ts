import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list/post-list.component';
import { PostComponent } from './post/post.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [PostListComponent, PostComponent],
  exports: [PostListComponent, PostComponent],
  imports: [CommonModule, PipesModule],
})
export class ComponentsModule {}
