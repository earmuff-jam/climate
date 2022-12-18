import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CategoryAccordianItem from './CategoryAccordianItem';

export default {
    title: 'Earmuffjam/CategoryAccordianItem',
    component: CategoryAccordianItem,
    argTypes: {

    }
} as ComponentMeta<typeof CategoryAccordianItem>;

const Template: ComponentStory<typeof CategoryAccordianItem> = (args) => <CategoryAccordianItem {...args} />

export const CategoryAccordianItemDefault = Template.bind({});