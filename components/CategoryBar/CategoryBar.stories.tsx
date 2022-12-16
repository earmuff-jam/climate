import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CategoryBar from './CategoryBar';

export default {
    title: 'Earmuffjam/CategoryBar',
    component: CategoryBar,
    argTypes: {

    }
} as ComponentMeta<typeof CategoryBar>;

const Template: ComponentStory<typeof CategoryBar> = (args) => <CategoryBar {...args} />

export const CategoryBarDefault = Template.bind({});

CategoryBarDefault.args = {
    appBarSx: {
        textAlign: 'center',
        backgroundColor: '#FFFCF4',
        color: 'black',
    },
    title: ''
}
