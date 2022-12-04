import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ButtonGroup from './ButtonGroup';

export default {
    title: 'Earmuffjam/ButtonGroup',
    component: ButtonGroup,
    argTypes: {

    }
} as ComponentMeta<typeof ButtonGroup>;

const Template: ComponentStory<typeof ButtonGroup> = (args) => <ButtonGroup {...args} />

export const RatingButtonsDefault = Template.bind({});

RatingButtonsDefault.args = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: "20vh",
    submitLabel: "submit",
    handleSubmit: () => { console.log('handle submit clicked') },
    cancelLabel: "cancel",
    handleCancel: () => { console.log('handle cancel clicked') },
}