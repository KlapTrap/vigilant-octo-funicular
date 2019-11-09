import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { NEVER } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { getBaseInitialState } from 'src/app/store/reducers/reducers.helpers';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent],
      providers: [
        provideMockStore({
          initialState: getBaseInitialState(),
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    component.post = {
      body: 'body',
      id: 1,
      title: 'title',
      user$: NEVER,
      userId: 1,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
