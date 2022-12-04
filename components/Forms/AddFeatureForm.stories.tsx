import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddFeatureForm from './AddFeatureForm';

export default {
    title: 'Earmuffjam/AddFeatureForm',
    component: AddFeatureForm,
    argTypes: {
    }
} as ComponentMeta<typeof AddFeatureForm>;

const Template: ComponentStory<typeof AddFeatureForm> = (args) => <AddFeatureForm {...args} />

export const AddFeatureFormDefault = Template.bind({});
AddFeatureFormDefault.args = {
    
}