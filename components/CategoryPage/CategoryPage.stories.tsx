import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CategoryPage from './CategoryPage';

export default {
    title: 'Earmuffjam/CategoryPage',
    component: CategoryPage,
    argTypes: {

    }
} as ComponentMeta<typeof CategoryPage>;

const Template: ComponentStory<typeof CategoryPage> = (args) => <CategoryPage {...args} />

export const CategoryPageDefault = Template.bind({});
