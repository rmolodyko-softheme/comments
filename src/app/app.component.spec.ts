import { AppComponent } from './app.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should have router outlet', () => {
    expect(spectator.query('router-outlet')).toExist();
  });
});
