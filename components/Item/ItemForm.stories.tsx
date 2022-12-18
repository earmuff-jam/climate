import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ItemForm from './ItemForm';

export default {
    title: 'Earmuffjam/ItemForm',
    component: ItemForm,
    argTypes: {

    }
} as ComponentMeta<typeof ItemForm>;

const Template: ComponentStory<typeof ItemForm> = (args) => <ItemForm {...args} />

export const ItemFormDefault = Template.bind({});