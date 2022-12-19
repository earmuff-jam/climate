import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CategoryToolbar from './CategoryToolbar';


export default {
    title: 'Earmuffjam/CategoryToolbar',
    component: CategoryToolbar,
    argTypes: {

    }
} as ComponentMeta<typeof CategoryToolbar>;

const Template: ComponentStory<typeof CategoryToolbar> = (args) => <CategoryToolbar {...args} />

export const CategoryToolbarDefault = Template.bind({});