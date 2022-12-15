import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import RoiCalculator from './RoiCalculator';

export default {
    title: 'Earmuffjam/RoiCalculator',
    component: RoiCalculator,
    argsTypes: {

    }
} as ComponentMeta<typeof RoiCalculator>;

const Template: ComponentStory<typeof RoiCalculator> = (args) => <RoiCalculator {...args} />

export const RoiCalculatorDefault = Template.bind({});
RoiCalculatorDefault.args = {
    
}