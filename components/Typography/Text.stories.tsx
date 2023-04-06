import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Text from './Text';

export default {
    title: 'Earmuffjam/Text',
    component: Text,
    args: {

    }
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = args => <Text {...args} />

export const HeadingFourText = Template.bind({});
HeadingFourText.args = {
    variant: "h4",
    children: "Subscription and billing",
}

export const BodyText = Template.bind({});
BodyText.args = {
    variant: "body2",
    children: "Learn more about how to start, stop or update a subscription",
}
