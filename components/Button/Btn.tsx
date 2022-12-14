// button.component.tsx

import React from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

// Only include variant, size, and color
type ButtonBaseProps = Pick<MuiButtonProps, "variant" | "size" | "color">;

// Use all except disableRipple
// type ButtonBaseProps = Omit<MuiButtonProps, "disableRipple">;

export interface Iprops extends ButtonBaseProps {
  label: string;
  onClick: () => void,
}

const Btn = ({ variant = 'text', label = "", onClick, ...rest }: Iprops) => (
  <MuiButton {...rest}>{label}</MuiButton>
);

export default Btn;