import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostCreateRoutingModule } from './post-create-routing.module';
import { PostCreateComponent } from './post-create.component';


@NgModule({
  declarations: [PostCreateComponent],
  imports: [
    CommonModule,
    PostCreateRoutingModule
  ]
})
export class PostCreateModule { }
