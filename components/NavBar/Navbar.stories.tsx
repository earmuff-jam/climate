import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import NavBar from './Navbar';


export default {
    title : 'Earmuffjam/Navbar',
    component: NavBar,
    argTypes: {

    }
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = args => <NavBar {...args} />

export const NavBarDefault = Template.bind({});

NavBarDefault.args = {
    
}