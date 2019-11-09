import { Component, OnInit } from '@angular/core';
import { StoreState } from 'src/app/types/store.types';
import { Store } from '@ngrx/store';
import { UserPostWithUser } from 'src/app/types/api-entities.types';
import { Observable } from 'rxjs';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  public posts$: Observable<UserPostWithUser[]>;
  constructor(
    public store: Store<StoreState>,
    public storeService: StoreService,
  ) {}
  ngOnInit() {
    this.storeService.fetchPosts();
    this.storeService.fetchUsers();
    this.posts$ = this.storeService.getPostsWithUser();
  }
}
