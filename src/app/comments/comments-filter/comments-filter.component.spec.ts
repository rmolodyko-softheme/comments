import { CommentsFilterComponent } from './comments-filter.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TagInputModule } from 'ngx-chips';
import { TAGS } from '../../../testing/mock-data';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CommentsFilterComponent', () => {
  let spectator: Spectator<CommentsFilterComponent>;
  const createComponent = createComponentFactory({
    component: CommentsFilterComponent,
    imports: [TagInputModule, FormsModule, ReactiveFormsModule],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should have router outlet', () => {
    spectator.component.filterChanged.emit = jest.fn();
    spectator.component._control.setValue(TAGS);

    // expect(spectator.component.filterChanged.emit).toHaveBeenCalledWith(TAGS);
  });
});
