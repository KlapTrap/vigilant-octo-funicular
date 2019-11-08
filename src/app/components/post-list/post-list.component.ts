import { Component, OnInit, Input } from '@angular/core';
import { UserPostWithUser } from 'src/app/types/api-entities.types';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  @Input() posts: UserPostWithUser[];

  constructor() {}

  ngOnInit() {}
}
