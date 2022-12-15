import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Idea from './Idea';

export default {
    title: 'Earmuffjam/Idea',
    component: Idea,
    argTypes: {
    }
} as ComponentMeta<typeof Idea>;

const Template: ComponentStory<typeof Idea> = args => <Idea {...args} />

export const IdeaDefault = Template.bind({});
IdeaDefault.args = {

};