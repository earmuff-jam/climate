import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  AccountCircleRounded,
  Home,
  ListAlt,
  Settings,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useSideNavigationHooks } from "./SideNavHooks";

const drawerWidth = 280;

const DrawerWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}));

const NavHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: theme.spacing(2),
}));

const SideNav = () => {
  const { selectedItem, handleItemSelection, handleSignOut } =
    useSideNavigationHooks();

  return (
    <Drawer variant="permanent" sx={{ width: drawerWidth }}>
      <DrawerWrapper>
        <NavHeader>
          <Typography variant="h5" sx={{ fontWeight: "bold", mr: 1 }}>
            PropertyCo
          </Typography>
          <AccountCircleRounded />
        </NavHeader>
        <Divider sx={{ mb: 2 }} />
        <List>
          <ListItemButton
            selected={selectedItem === "dashboard"}
            onClick={() => handleItemSelection("")}
          >
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton
            selected={selectedItem === "properties"}
            onClick={() => handleItemSelection("property")}
          >
            <ListItemIcon>
              <ListAlt />
            </ListItemIcon>
            <ListItemText primary="Properties" />
          </ListItemButton>
          <ListItemButton
            selected={selectedItem === "settings"}
            onClick={() => handleItemSelection("settings")}
          >
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
          <ListItemButton onClick={handleSignOut}>
            <ListItemIcon>
              <AccountCircleRounded sx={{ mr: 1 }} />
            </ListItemIcon>
            <ListItemText primary="Sign out" />
          </ListItemButton>
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="body2" sx={{ mb: 2 }}>
          © 2023 PropertyCo All rights reserved.
        </Typography>
      </DrawerWrapper>
    </Drawer>
  );
};

export default SideNav;
