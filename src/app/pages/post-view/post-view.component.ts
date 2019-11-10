import { Component, OnInit } from '@angular/core';
import {
  UserPostWithUser,
  PostComment,
} from 'src/app/types/api-entities.types';
import { StoreService } from 'src/app/store/store.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter, first, tap } from 'rxjs/operators';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss'],
})
export class PostViewComponent implements OnInit {
  public post$: Observable<UserPostWithUser>;
  public comments$: Observable<PostComment[]>;
  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
  ) {}

  ngOnInit() {
    const postId = this.route.snapshot.params.id;
    this.post$ = this.storeService.selectEntity(postId, 'post').pipe(
      filter(post => !!post),
      first(),
      tap(post => this.storeService.fetchUser(post.userId)),
      map(post => this.storeService.mapPostToPostWithUser(post)),
    );
    this.comments$ = this.storeService.selectEntityList(
      'comment',
      this.storeService.buildListKey(postId),
    ) as Observable<PostComment[]>;
    this.storeService.fetchPost(postId);
    this.storeService.fetchComments(postId);
  }
}
