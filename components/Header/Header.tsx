import React, { useEffect, useRef } from "react";
import { debounce } from "@mui/material";
import Link from "next/link";
import styles from "../../styles/Header.module.css";

interface HeaderProps {
  toggleDrawer: Function;
}
const Header: React.FC<HeaderProps> = ({ toggleDrawer }) => {
  const toggle = useRef<Function>(null);
  let wat = useRef(null);
  useEffect(() => {
    toggle.current = debounce(wat ? toggleDrawer : null, 1000);
  });

  return (
    <div>
      <Link
        href="#aboutus"
        className={styles.skipNav}
        aria-label="Skip to footer"
      >
        Skip to Footer
      </Link>
      <div
        onMouseEnter={() => {
          toggle.current?.();
        }}
        onMouseOut={() => {
          toggle.current?.();
        }}
      >
        Hi
      </div>
    </div>
  );
};

export default Header;
