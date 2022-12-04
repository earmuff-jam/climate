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

const defaultInputRowsAllowed = 4;
const requestFeatureEmailInputLabel = 'Email Address';
const requestFeatureInputNoErrMsg = 'Please add more details';
const requestFeatureInputLabel = 'How can we make the application better?';
const requestFeatureInputErrMsg = 'All submitted comments will remain anonymous.';
const requestFeatureEmailInputHelper = 'Participation is 100 % free and voluntary.';

export const AddFeatureFormDefault = Template.bind({});

AddFeatureFormDefault.args = {
    requestFeatureInputLabel: requestFeatureInputLabel,
    defaultInputRowsAllowed: defaultInputRowsAllowed,
    requestFeatureInputNoErrMsg: requestFeatureInputNoErrMsg,
    requestFeatureInputErrMsg: requestFeatureInputErrMsg,
    requestFeatureEmailInputLabel: requestFeatureEmailInputLabel,
    requestFeatureEmailInputHelper: requestFeatureEmailInputHelper,
}