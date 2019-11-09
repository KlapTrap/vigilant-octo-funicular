import { FilterPostsByAuthorPipe } from './filter-posts-by-author.pipe';

describe('FilterPostsByAuthorPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterPostsByAuthorPipe();
    expect(pipe).toBeTruthy();
  });
});
