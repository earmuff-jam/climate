import {
  styled,
  useTheme,
  Theme,
  CSSObject,
} from "@mui/material/styles";

import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { useRouter } from "next/router";
import MuiDrawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import MailIcon from "@mui/icons-material/Mail";
import SourceIcon from "@mui/icons-material/Source";
import CssBaseline from "@mui/material/CssBaseline";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import WebStoriesIcon from "@mui/icons-material/WebStories";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import FeedbackRoundedIcon from '@mui/icons-material/FeedbackRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import Drawer from "@mui/material/Drawer";
import { Typography } from "@mui/material";


const drawerWidth = 170;

const currentRoutes = [
  {
    title: "Home",
    link: "/",
    icon: <WebStoriesIcon />,
    isSelected: (val: string): boolean => val === "/",
  },
  {
    title: "Subscribe",
    link: "/subscribe",
    icon: <MailIcon />,
    isSelected: (val: string): boolean => val === "/subscribe",
  },
  {
    title: "Stuff",
    link: "/stuff",
    icon: <SourceIcon />,
    isSelected: (val: string): boolean => val === "/stuff",
  },
  {
    title: "Feedback",
    link: "/feedback",
    icon: <FeedbackRoundedIcon />,
    isSelected: (val: string): boolean => val === "/feedback",
  }
];


interface NavProps {
  open?: boolean;
  toggleDrawer: any;
};


const NavBar = ({ open, toggleDrawer }: NavProps) => {

  const theme = useTheme();
  const { pathname } = useRouter();
  const supabase = useSupabaseClient();

  return (
    <Box>
      <CssBaseline />
      <Drawer variant="permanent" open={true} >
        <List>
          {currentRoutes.map((route, index) => {
            return (
              <ListItem
                key={route.title}
                dense
                disablePadding
                disableGutters
                divider={index === currentRoutes.length - 1}
                sx={{ display: "block", position: "relative" }}
              >
                <Link href={route.link}>
                  <ListItemButton
                    selected={route.isSelected(pathname)}
                    sx={{
                      minHeight: 48,
                      justifyContent: "left",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        mr: 3,
                        justifyContent: "left",
                      }}
                    >
                      {route.icon}
                    </ListItemIcon>
                    <Typography>{route.title}</Typography>
                  </ListItemButton>
                </Link>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
};

export default NavBar;
