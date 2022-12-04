import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from './Btn';

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
    children: 'Submit',
};

export const Cancel = Template.bind({});
Cancel.args = {
    variant: 'text',
    children: 'Cancel',
};

