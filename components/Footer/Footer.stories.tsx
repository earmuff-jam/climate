import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Footer  from './Footer';

export default {
  title: 'Example/Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  /* the args you need here will depend on your component */
};