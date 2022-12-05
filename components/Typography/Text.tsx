import { Typography } from "@mui/material";
import React from "react";

interface Iprops {
  variant?: any;
  children: string;
}

const Text: React.FC<Iprops> = (props) => {
  const { variant, children } = props;

  return <Typography variant={variant}> {children} </Typography>;
};

export default Text;
