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
    tags: [{ id: 1, tag: 'food' }, { id: 2, tag: 'garage' }],
    expiresAt: '12/12/2022',
    imgSrc: supabaseIcon,
    imgSx: {
        id: "1",
        width: 30,
        height: 30,
        alt: "supabase icon that leads to supabase page"
    },
}