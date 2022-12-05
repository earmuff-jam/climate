import { Typography } from "@mui/material";
import React from "react";

interface Iprops {
  variant?: any;
  color?: string;
  gutterBottom?: boolean;
  children: string;
}

const Text: React.FC<Iprops> = (props) => {
  const { variant, color, gutterBottom, children } = props;

  return (
    <Typography variant={variant} color={color} gutterBottom={gutterBottom}>
      {children}
    </Typography>
  );
};

export default Text;
