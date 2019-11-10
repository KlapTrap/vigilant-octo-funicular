import { Injectable } from '@angular/core';
import { Observable, fromEvent, combineLatest } from 'rxjs';
import { startWith, filter, map, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InfiniteScrollService {
  private defaultScrollElement: HTMLElement = document.body;
  private scroll$ = fromEvent(this.defaultScrollElement, 'scroll');
  private isAtBottom() {
    return (
      this.defaultScrollElement.scrollHeight -
        this.defaultScrollElement.scrollTop ===
      this.defaultScrollElement.clientHeight
    );
  }
  public getElementsFromScrollPosition$(elements$: Observable<Array<any>>) {
    const startingMaxIndex = 9;
    const scrollBounds$ = this.scroll$.pipe(
      map(() => this.isAtBottom()),
      startWith(this.isAtBottom()),
      distinctUntilChanged(),
      filter(shouldAdd => shouldAdd),
      map((_, page) => ({
        minIndex: page * (startingMaxIndex + 1),
        maxIndex: page * (startingMaxIndex + 1) + startingMaxIndex + 1,
      })),
      startWith({
        minIndex: 0,
        maxIndex: startingMaxIndex,
      }),
    );
    return combineLatest(scrollBounds$, elements$).pipe(
      map(([bounds, elements]) =>
        bounds.maxIndex >= elements.length
          ? elements
          : elements.slice(0, bounds.maxIndex),
      ),
      distinctUntilChanged(),
    );
  }
  constructor() {}
}
