import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DataTable  from './DataTable';

export default {
  title: 'Example/DataTable',
  component: DataTable,
} as ComponentMeta<typeof DataTable>;

const Template: ComponentStory<typeof DataTable> = (args) => <DataTable {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  /* the args you need here will depend on your component */
};