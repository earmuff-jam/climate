import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import WebStoriesIcon from "@mui/icons-material/WebStories";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SourceIcon from "@mui/icons-material/Source";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";


const drawerWidth = 150;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(5)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(5)} + 1px)`,
  },
});

const openTextMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("opacity", {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const NavBarText = styled(ListItemText, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  ...openTextMixin(theme),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
type NavProps = {
  open?: boolean;
  toggleDrawer: any;
};
const NavBar = ({ open, toggleDrawer }: NavProps) => {
  const theme = useTheme();

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
      title: "Contact",
      link: "/feedback",
      icon: <InboxIcon />,
      isSelected: (val: string): boolean => val === "/feedback",
    },
  ];
  const { pathname } = useRouter();
  const supabase = useSupabaseClient();

  return (
    <Box>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <List>
          {currentRoutes.map((route, index) => {
            return (
              <ListItem
                key={route.title}
                dense
                disablePadding
                disableGutters
                divider={index === currentRoutes.length - 1}
                selected={route.isSelected(pathname) || false}
                sx={{ display: "block", position: "relative" }}
              >
                <Link href={route.link}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {route.icon}
                    </ListItemIcon>
                    <NavBarText
                      primary={route.title}
                      sx={{ opacity: open ? 1 : 0 }}
                      secondary={route.link}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            );
          })}
        </List>
        <Button onClick={async () => {
          await supabase.auth.signOut();
        }}> Log out </Button>
        <ListItem
          disablePadding
          divider
          sx={{
            display: "absolute",
            bottom: 0,
          }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
            onClick={() => toggleDrawer()}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </ListItemIcon>
            <ListItemText primary={"Close Me"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </Drawer>
    </Box>
  );
};

export default NavBar;
