import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CategoryList from './CategoryList';

export default {
    title: 'Earmuffjam/CategoryList',
    component: CategoryList,
    argTypes: {

    }
} as ComponentMeta<typeof CategoryList>;

const Template: ComponentStory<typeof CategoryList> = (args) => <CategoryList {...args} />

export const CategoryListDefault = Template.bind({});