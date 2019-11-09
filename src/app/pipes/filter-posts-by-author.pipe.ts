import { Pipe, PipeTransform } from '@angular/core';
import { UserPost, User } from '../types/api-entities.types';

@Pipe({
  name: 'filterPostsByAuthor',
})
export class FilterPostsByAuthorPipe implements PipeTransform {
  transform(posts: UserPost[], user: User): UserPost[] {
    if (user) {
      return posts.filter(post => post.userId === user.id);
    }
    return posts;
  }
}
