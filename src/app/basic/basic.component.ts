import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, fromEvent, map, of, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
})
export class BasicComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  subArray!: Subscription;
  subFrom!: Subscription;
  subEvent!: Subscription;
  keyEvent!: Subscription;
  subApples!: Subscription;
  subNumbers!: Subscription;
  ngOnInit(): void {
    //subscribe will pass the value receive as a whole, in this case 2, then 4 and then 6
    this.sub = of(2, 4, 6).subscribe((item) =>
      console.log('Value from of:', item)
    );
    //subscribe in this case will pass the whole array
    this.subArray = of([2, 4, 6]).subscribe((item) =>
      console.log('Value from of array:', item)
    );

    // from handles the observable knowing the existence of the array and will split each of the values
    this.subFrom = from([20, 15, 10, 5]).subscribe({
      next: (item) => console.log('From item:', item),
      error: (err) => console.log('From error:', err),
      complete: () => console.log('From complete'),
    });

    // this is the general callback functions for the subscribe method, this enables the data to process, still it can be handled without the object typing
    this.subFrom = from([20, 15, 10, 5]).subscribe({
      next: (item) => console.log('From item:', item),
      error: (err) => console.log('From error:', err),
      complete: () => console.log('From complete'),
    });

    // this is deprecated but also valid
    //Updated so even if deprecated shows it works in console
    this.subFrom = from([1, 2, 3, 5]).subscribe(
      (item) => console.log(item),
      (err) => console.log(err),
      () => {
        console.log('complete');
      }
    );

    this.subEvent = fromEvent(document, 'click').subscribe({
      next: (ev) => console.log('Click event', ev.target),
      error: (err) => console.log('Found an error on click'),
      complete: () => console.log('Finished'),
    });

    const pressedKeys: string[] = [];
    //Event occurs in document and event type is key down, for more events https://developer.mozilla.org/en-US/docs/Web/API/Element#events
    this.keyEvent = fromEvent(document, 'keydown').subscribe({
      next: (ev) => {
        pressedKeys.push((ev as KeyboardEvent).key);
        console.log('Key event:', pressedKeys);
      },
    });

    const apples$ = from([
      { id: 1, type: 'macintosh' },
      { id: 2, type: 'gala' },
      { id: 3, type: 'fuji' },
    ]);

    this.subApples = apples$
      .pipe(map((a) => ({ ...a, color: 'red' })))
      .subscribe((x) => console.log('Apple:', x));

    const numbers$ = of(1, 2, 3, 4, 5)
      .pipe(
        map((n) => n * 2),
        tap((v) => console.log('Map x2 on tap:', v))
      )
      .subscribe((x) => console.log('Map x2:', x));

    this.subApples = apples$
      .pipe(
        map((a) => ({ ...a, color: 'red' })),
        tap((v) => console.log(v))
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.subArray.unsubscribe();
    this.subFrom.unsubscribe();
    this.subApples.unsubscribe();
  }
}
