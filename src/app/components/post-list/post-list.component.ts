import { Component, Input, Output } from '@angular/core';
import { UserPostWithUser, User } from 'src/app/types/api-entities.types';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent {
  @Input() posts: UserPostWithUser[];
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
