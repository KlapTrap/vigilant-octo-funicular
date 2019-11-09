import { Component, Input, Output } from '@angular/core';
import { UserPostWithUser, User } from 'src/app/types/api-entities.types';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class PostListComponent {
  @Input() posts: UserPostWithUser[];
  @Input() public busy = false;

  public selectedAuthor: User;
  constructor() {}

  public clearSelection() {
    this.selectedAuthor = null;
  }
  public setAuthor(author: User) {
    this.selectedAuthor = author;
  }
  public trackBy(index: number, post: UserPostWithUser) {
    return post.id;
  }
}
