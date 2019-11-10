import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list/post-list.component';
import { PostComponent } from './post/post.component';
import { PipesModule } from '../pipes/pipes.module';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentComponent } from './comment/comment.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PostListComponent,
    PostComponent,
    CommentListComponent,
    CommentComponent,
  ],
  exports: [PostListComponent, PostComponent, CommentListComponent],
  imports: [CommonModule, PipesModule, RouterModule],
})
export class ComponentsModule {}
