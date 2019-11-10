import { Component, OnInit, Input, Output } from '@angular/core';
import { UserPostWithUser, User } from 'src/app/types/api-entities.types';
import { Subject } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  constructor() {}
  @Input() link: string;
  @Input() public post?: UserPostWithUser;

  @Input() public busy = false;

  @Output() public authorSelected = new Subject<User>();

  public selectAuthor(author: User) {
    this.authorSelected.next(author);
  }

  ngOnInit() {}
}
