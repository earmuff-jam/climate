import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SideBar from "./SideBar";

export default {
  title: "Earmuffjam/SideBar",
  component: SideBar,
  argTypes: {},
} as ComponentMeta<typeof SideBar>;

const Template: ComponentStory<typeof SideBar> = (args) => (
  <SideBar {...args} />
);

export const SideBarDefault = Template.bind({});
