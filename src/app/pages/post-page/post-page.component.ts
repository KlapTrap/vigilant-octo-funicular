import { Component, OnInit } from '@angular/core';
import { StoreState } from 'src/app/types/store.types';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  constructor(public store: Store<StoreState>) {}

  ngOnInit() {}
}
