import React from 'react';
import Button from './Btn';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'Earmuffjam/Button',
    component: Button,
    argTypes: {
        variant: {
            options: ['text', 'contained'],
            control: { type: 'radio' },
        },
    }
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Submit = Template.bind({});
Submit.args = {
    variant: 'text',
    label: 'Submit',
};

export const Cancel = Template.bind({});
Cancel.args = {
    variant: 'text',
    label: 'Cancel',
};