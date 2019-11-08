import { Component, OnInit, Input } from '@angular/core';
import { UserPostWithUser } from 'src/app/types/api-entities.types';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  constructor() {}

  @Input() post: UserPostWithUser;

  ngOnInit() {}
}
