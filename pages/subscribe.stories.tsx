import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Subscribe from './subscribe';

export default {
    title: 'Earmuffjam/SubscribePage',
    component: Subscribe,
    args: {

    }
} as ComponentMeta<typeof Subscribe>;

const Template: ComponentStory<typeof Subscribe> = () => <Subscribe />;

export const FullPageView = Template.bind({});

FullPageView.args = {

}