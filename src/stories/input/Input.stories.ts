import { Meta, Story } from '@storybook/angular';
import InputComponent from './input.component';

export default {
  title: 'Example/Input',
  component: InputComponent,
} as Meta;

const Template: Story<InputComponent> = (args: InputComponent) => ({
  component: InputComponent,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  classes: [],
};

export const Gray = Template.bind({});
Gray.args = {
  classes: ['gray'],
};
