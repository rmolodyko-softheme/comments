import { Meta, Story } from '@storybook/angular';
import Button from './button.component';

export default {
  title: 'Example/Button',
  component: Button,
} as Meta;

const Template: Story<Button> = (args: Button) => ({
  component: Button,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  classes: [],
};

export const Primary = Template.bind({});
Primary.args = {
  classes: ['primary'],
};

export const Secondary = Template.bind({});
Secondary.args = {
  classes: ['secondary'],
};

export const Outline = Template.bind({});
Outline.args = {
  classes: ['outline'],
};

export const Danger = Template.bind({});
Danger.args = {
  classes: ['danger'],
};

export const DangerOutline = Template.bind({});
DangerOutline.args = {
  classes: ['danger outline'],
};

export const Small = Template.bind({});
Small.args = {
  classes: ['small'],
};

export const Medium = Template.bind({});
Medium.args = {
  classes: ['medium'],
};

export const Large = Template.bind({});
Large.args = {
  classes: ['large'],
};
