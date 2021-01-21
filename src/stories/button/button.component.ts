import { Component, Input } from '@angular/core';

@Component({
  selector: 'storybook-button',
  template: ` <button type="button" class="btn" [ngClass]="classes">Button</button>`,
  styleUrls: ['./button.scss'],
})
export default class ButtonComponent {
  /**
   * Button classes
   *
   * @required
   */
  @Input()
  classes: string[] = [];
}
