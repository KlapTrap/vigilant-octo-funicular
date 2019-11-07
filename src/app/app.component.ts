import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreState } from './types/store.types';
import { startFetchEntityList } from './store/actions/entity-list.actions';
import { HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(store: Store<StoreState>) {
    store.dispatch(
      startFetchEntityList({
        entityType: 'post',
        listKey: 'allPosts',
        request: new HttpRequest(
          'GET',
          'https://jsonplaceholder.typicode.com/posts',
        ),
      }),
    );
  }
  title = 'vigilant-octo-funicular';
}
