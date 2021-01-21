import { Meta, Story } from '@storybook/angular';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/preview/types';
import TagsComponent from './tags.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Example/Tags control',
  component: TagsComponent,
} as Meta;

const Template: Story<TagsComponent> = (args: TagsComponent) =>
  ({
    component: TagsComponent,
    props: args,
    moduleMetadata: {
      imports: [CommonModule, TagInputModule, FormsModule, BrowserAnimationsModule],
    },
  } as StoryFnAngularReturnType);

export const Readonly = Template.bind({});
Readonly.args = {
  data: ['Tag 1', 'Tag 2'],
  classes: ['tag', 'readonly'],
};

export const Editable = Template.bind({});
Editable.args = {
  data: ['Tag 1', 'Tag 2'],
  classes: ['tag'],
};
