import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SubscribeForm from './SubscribeForm';

export default {
    title: 'Earmuffjam/SubscribeForm',
    component: SubscribeForm,
    args: {

    }
} as ComponentMeta<typeof SubscribeForm>;

const Template: ComponentStory<typeof SubscribeForm> = args => <SubscribeForm {...args} />

export const WithHeadingDesc = Template.bind({});
WithHeadingDesc.args = {
    title: "Subscription and billing",
    desc: "Learn more about how to start, stop or update a subscription",
}
