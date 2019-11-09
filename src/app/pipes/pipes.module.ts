import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPostsByAuthorPipe } from './filter-posts-by-author.pipe';

@NgModule({
  declarations: [FilterPostsByAuthorPipe],
  exports: [FilterPostsByAuthorPipe],
  imports: [CommonModule],
})
export class PipesModule {}
