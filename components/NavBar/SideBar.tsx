import * as React from "react";
import { styled } from "@mui/material/styles";
import { Stack, Box, Divider } from "@mui/material";
interface SideBardIprops {
  open?: boolean;
}
const SideBar = (props: SideBardIprops): JSX.Element => {
  return (
    <Stack spacing={2}>
      <Box></Box>
      <Divider />
      <Box></Box>
    </Stack>
  );
};
export default SideBar;
