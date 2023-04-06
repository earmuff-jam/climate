import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import RatingButtons from './RatingButtons';

export default {
    title: 'Earmuffjam/RatingButton',
    component: RatingButtons,
    argTypes: {

    }
} as ComponentMeta<typeof RatingButtons>;

const Template: ComponentStory<typeof RatingButtons> = (args) => <RatingButtons {...args} />

export const RatingButtonsDefault = Template.bind({});
RatingButtonsDefault.args = {
    value: '5',
    label: 'Please rate us',
    row: true,
    display: 'flex',
    flexDirection: 'column',
    handleChange: () => { console.log('handle change clicked') }
}