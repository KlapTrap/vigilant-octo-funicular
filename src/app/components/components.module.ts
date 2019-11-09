import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list/post-list.component';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [PostListComponent, PostComponent],
  exports: [PostListComponent, PostComponent],
  imports: [CommonModule],
})
export class ComponentsModule {}
