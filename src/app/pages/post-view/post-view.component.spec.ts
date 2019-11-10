import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostViewComponent } from './post-view.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentsModule } from 'src/app/components/components.module';
import { getBaseTestStoreProvider } from 'src/app/testing/unit-test-helpers';

describe('PostViewComponent', () => {
  let component: PostViewComponent;
  let fixture: ComponentFixture<PostViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostViewComponent],
      imports: [RouterTestingModule, ComponentsModule],
      providers: [getBaseTestStoreProvider()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
