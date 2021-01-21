import { Component, Input } from '@angular/core';

@Component({
  selector: 'storybook-input',
  template: `<div><input type="text" class="input" [ngClass]="classes" /></div>
    <div><textarea class="textarea" [ngClass]="classes"></textarea></div>`,
  styleUrls: ['./input.scss'],
})
export default class InputComponent {
  /**
   * Classes
   *
   * @required
   */
  @Input()
  classes: string[] = [];
}
