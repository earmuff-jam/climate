import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SingleTextField from './SingleTextField';

export default {
    title: 'Earmuffjam/SingleTextField',
    component: SingleTextField,
    argsTypes: {

    }
} as ComponentMeta<typeof SingleTextField>;

const Template: ComponentStory<typeof SingleTextField> = (args) => <SingleTextField {...args} />

export const SubscribeEmailAddress = Template.bind({});
SubscribeEmailAddress.args = {
    error: false,
    label: 'Please enter your email address',
    value: '',
    helperText: 'Participation is 100% voluntary',
};