import { Component, OnInit, Input, Output } from '@angular/core';
import { UserPostWithUser, User } from 'src/app/types/api-entities.types';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  constructor() {}

  @Input() public post: UserPostWithUser;

  @Output() public authorSelected = new Subject<User>();

  public selectAuthor(author: User) {
    this.authorSelected.next(author);
  }

  ngOnInit() {}
}
