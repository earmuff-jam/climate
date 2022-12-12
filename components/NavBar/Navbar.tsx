import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { useRouter } from "next/router";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import CssBaseline from "@mui/material/CssBaseline";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import WebStoriesIcon from "@mui/icons-material/WebStories";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import SubscriptionsRoundedIcon from "@mui/icons-material/SubscriptionsRounded";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";

const drawerWidth = 220;

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
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
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
  const router = useRouter();

  const currentRoutes = [
    {
      title: "Home",
      link: "/",
      icon: <WebStoriesIcon />,
    },
    {
      title: "Subscribe",
      link: "/subscribe",
      icon: <SubscriptionsRoundedIcon />,
    },
    {
      title: "Feeback",
      link: "/feedback",
      icon: <QuestionAnswerRoundedIcon />,
    },
    {
      title: "Profile",
      link: "/profile",
      icon: <Person2RoundedIcon />,
    },
  ];

  const handleNav = (index: number) => {
    const routesList = currentRoutes[index];
    router.push(routesList.link);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <List>
          {currentRoutes.map((route, index) => {
            return (
              <ListItem
                key={route.title}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => handleNav(index)}
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
                  <ListItemText
                    primary={route.title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <ListItem
          disablePadding
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
