import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PostCreateRoutingModule } from './post-create-routing.module';
import { PostCreateComponent } from './post-create.component';

@NgModule({
  declarations: [PostCreateComponent],
  imports: [CommonModule, PostCreateRoutingModule, FormsModule],
})
export class PostCreateModule {}
