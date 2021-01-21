import { Component, Input } from '@angular/core';

@Component({
  selector: 'storybook-tags',
  template: `<tag-input [(ngModel)]="data" [ngClass]="classes"></tag-input>`,
  styleUrls: ['./tags.scss'],
})
export default class TagsComponent {
  /**
   * Data
   *
   * @required
   */
  @Input()
  data = ['Tag 1'];

  /**
   * Classes
   *
   * @required
   */
  @Input()
  classes: string[] = [];
}
