import React, { useEffect, useRef } from "react";
import { AppBar, debounce } from "@mui/material";
import Link from "next/link";
import styles from "../../styles/Header.module.css";
import MainMenu from "./MainMenu";
type HeaderIProps = {
  open?: boolean;
  toggleDrawer: any;
};

const Header = ({ toggleDrawer }: HeaderIProps): JSX.Element => {
  const toggle = useRef<Function | (() => {})>(() => { });
  useEffect(() => {
    toggle.current = debounce(() => toggleDrawer, 200);
  });
  return (
    <div>
      <Link
        href="#footer"
        className={styles.skipNav}
        aria-label="Skip to footer"
      >
        Skip to Footer
      </Link>
      <div
        onMouseEnter={() => {
          toggle.current();
        }}
        onMouseOut={() => {
          toggle.current();
        }}
      >
      </div>
      <MainMenu />
    </div>
  );
};

export default Header;