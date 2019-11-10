import { Component, OnInit } from '@angular/core';
import { StoreState } from 'src/app/types/store.types';
import { Store } from '@ngrx/store';
import { startCreateEntity } from 'src/app/store/actions/entity.actions';
import { HttpRequest, HttpHeaders } from '@angular/common/http';
import { UserPost } from 'src/app/types/api-entities.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
  public content: string;
  public title: string;
  constructor(public store: Store<StoreState>, public router: Router) {}
  public submit() {
    this.store.dispatch(
      startCreateEntity({
        entityType: 'post',
        newEntity: {
          title: this.title,
          body: this.content,
          userId: 1,
        },
      }),
    );
    this.router.navigate(['/']);
  }
  ngOnInit() {}
}
