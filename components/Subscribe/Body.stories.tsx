import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Body from './Body';

export default {
    title: 'Earmuffjam/SubscribeForm',
    component: Body,
    args: {

    }
} as ComponentMeta<typeof Body>;

const Template: ComponentStory<typeof Body> = args => <Body {...args} />

export const SubscribeFormPageView = Template.bind({});
SubscribeFormPageView.args = {
    title: "Subscription and billing",
    desc: "Learn more about how to start, stop or update a subscription",
    display: "flex",
}