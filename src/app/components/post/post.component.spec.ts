import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should renderCorrectValues', () => {
    const bodyText = 'this is body';
    const titleText = 'this is title';
    const nameText = 'this is name';
    component.post = {
      body: bodyText,
      id: 1,
      title: titleText,
      user$: of({
        id: 1,
        name: nameText,
      }),
      userId: 1,
    };
    fixture.detectChanges();
    const element = fixture.nativeElement as Element;
    const title = element.getElementsByClassName(
      'post__title',
    )[0] as HTMLDivElement;
    const author = element.getElementsByClassName(
      'post__author',
    )[0] as HTMLDivElement;
    const body = element.getElementsByClassName(
      'post__body',
    )[0] as HTMLDivElement;
    fixture.detectChanges();
    expect(title.innerText).toBe(titleText);
    expect(author.innerText).toBe(nameText);
    expect(body.innerText).toBe(bodyText);
  });
});
