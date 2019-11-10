import { Component, OnInit, Input } from '@angular/core';
import { PostComment } from 'src/app/types/api-entities.types';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  @Input() comments: PostComment[];
  constructor() {}

  ngOnInit() {}
}
