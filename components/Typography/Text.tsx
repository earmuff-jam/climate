import { Typography } from "@mui/material";
import React from "react";

interface Iprops {
  variant?: any;
  color?: string;
  justifyContent?: string;
  alignContent?: string;
  textAlign?: any;
  gutterBottom?: boolean;
  children: string;
}

const Text: React.FC<Iprops> = (props) => {
  const {
    variant,
    color,
    justifyContent = "left",
    alignContent = "left",
    textAlign = "left",
    gutterBottom,
    children,
  } = props;

  return (
    <Typography
      variant={variant}
      justifyContent={justifyContent}
      alignContent={alignContent}
      color={color}
      textAlign={textAlign}
      gutterBottom={gutterBottom}
    >
      {children}
    </Typography>
  );
};

export default Text;
