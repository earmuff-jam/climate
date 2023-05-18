import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";

const MaintenanceTabs = () => {
  const data = [
    {
      label: "Work Orders",
      value: "work_orders",
      icon: Square3Stack3DIcon,
      desc: `Display current work order for the selected property. This list can have both completed and not completed work orders.`,
    },
    {
      label: "Current Tenants",
      value: "tenants",
      icon: UserCircleIcon,
      desc: `List of all your current tenants for your selected property.`,
    },
    {
      label: "Settings",
      value: "settings",
      icon: Cog6ToothIcon,
      desc: `This setting lets the user customize the ability electricians, plumbers etc etc`,
    },
    {
      label: "Vendors",
      value: "vendor",
      icon: Cog6ToothIcon,
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
  ];
  return (
    <Tabs value="dashboard">
      <TabsHeader>
        {data.map(({ label, value, icon }) => (
          <Tab key={value} value={value}>
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default MaintenanceTabs;
