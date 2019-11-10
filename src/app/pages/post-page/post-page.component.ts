import { Component, OnInit } from '@angular/core';
import { StoreState } from 'src/app/types/store.types';
import { Store } from '@ngrx/store';
import { UserPostWithUser } from 'src/app/types/api-entities.types';
import { Observable } from 'rxjs';
import { StoreService } from 'src/app/store/store.service';
import { tap } from 'rxjs/operators';
import { InfiniteScrollService } from 'src/app/infinite-scroll.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  public posts$: Observable<UserPostWithUser[]>;
  public busy$: Observable<boolean>;
  constructor(
    public store: Store<StoreState>,
    public storeService: StoreService,
    public infiniteScrollService: InfiniteScrollService,
  ) {}
  ngOnInit() {
    this.storeService.fetchPosts();
    this.storeService.fetchUsers();
    this.busy$ = this.storeService.fetchingPostsOrUser$;
    this.posts$ = this.infiniteScrollService.getElementsFromScrollPosition$(
      this.storeService.getPostsWithUser(),
    );
  }
}
