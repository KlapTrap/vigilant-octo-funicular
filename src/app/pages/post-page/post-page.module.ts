import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostPageRoutingModule } from './post-page-routing.module';
import { PostPageComponent } from './post-page.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [PostPageComponent],
  exports: [PostPageComponent],
  imports: [StoreModule, CommonModule, PostPageRoutingModule, ComponentsModule],
})
export class PostPageModule {}
