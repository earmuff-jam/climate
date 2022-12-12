import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import IdeaWithText from './IdeaWithText';

export default {
    title: 'Earmuffjam/IdeaWithText',
    component: IdeaWithText,
    argsTypes: {

    }
} as ComponentMeta<typeof IdeaWithText>;

const Template: ComponentStory<typeof IdeaWithText> = (args) => <IdeaWithText {...args} />

export const IdeaWithTextDefault = Template.bind({});
IdeaWithTextDefault.args = {
    
}