import {
  HomeRounded,
  SettingsRounded,
  WebStoriesRounded,
} from "@mui/icons-material";

export const NAV_ROUTES = [
  {
    id: "1",
    title: "Home",
    link: "/",
    icon: <WebStoriesRounded />,
  },
  {
    id: "2",
    title: "Properties",
    link: "/property",
    icon: <HomeRounded />,
  },
  {
    id: "3",
    title: "Settings",
    link: "/settings",
    icon: <SettingsRounded />,
  },
];
