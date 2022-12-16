import React from 'react';
import CategorySingleItem from './CategorySingleItem';
import supabaseIcon from "../../public/supabaseIcon.png";
import { ComponentStory, ComponentMeta } from '@storybook/react';


export default {
    title: 'Earmuffjam/CategorySingleItem',
    component: CategorySingleItem,
    argTypes: {

    }
} as ComponentMeta<typeof CategorySingleItem>;

const Template: ComponentStory<typeof CategorySingleItem> = (args) => <CategorySingleItem {...args} />

export const CategorySingleItemDefault = Template.bind({});

CategorySingleItemDefault.args = {
     title: 'Corn flower 1/2 pound',
     tags: ['food', 'pantry'],
     expiresAt: '12/12/2022',
     imageSx: {
        id: 1,
        width: 30,
        height: 30,
        src: supabaseIcon,
        alt: "supabase icon that leads to supabase page"
     },
}