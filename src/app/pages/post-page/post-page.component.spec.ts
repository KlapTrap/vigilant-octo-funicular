import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { PostPageComponent } from './post-page.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { getBaseInitialState } from 'src/app/store/reducers/reducers.helpers';

describe('PostPageComponent', () => {
  let component: PostPageComponent;
  let fixture: ComponentFixture<PostPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostPageComponent],
      imports: [ComponentsModule],
      providers: [
        provideMockStore({
          initialState: getBaseInitialState(),
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
