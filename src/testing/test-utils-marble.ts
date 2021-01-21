import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { Observable } from 'rxjs';

export interface CustomRunHelpers extends RunHelpers {
  e: typeof TestScheduler.prototype.expectObservable;
}

export function expectMarble(
  cb: (helpers: CustomRunHelpers) => Observable<any>,
  marble: string,
  values?: { [key: string]: unknown },
  error?: unknown
): void {
  new TestScheduler((actual, expected) => expect(actual).toEqual(expected)).run((helpers) => {
    const expectObservable = helpers.expectObservable(cb({ ...helpers, e: helpers.expectObservable }));
    expectObservable.toBe(marble, values, error);
  });
}
