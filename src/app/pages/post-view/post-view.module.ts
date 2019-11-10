import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostViewRoutingModule } from './post-view-routing.module';
import { PostViewComponent } from './post-view.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [PostViewComponent],
  imports: [CommonModule, PostViewRoutingModule, ComponentsModule],
})
export class PostViewModule {}
