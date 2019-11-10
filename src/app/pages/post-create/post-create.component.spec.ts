import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCreateComponent } from './post-create.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import {
  getBaseInitialState,
  getBaseInitialListState,
} from 'src/app/store/reducers/reducers.helpers';
import { getBaseTestStoreProvider } from 'src/app/testing/unit-test-helpers';

describe('PostCreateComponent', () => {
  let component: PostCreateComponent;
  let fixture: ComponentFixture<PostCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostCreateComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [getBaseTestStoreProvider()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
