import React, { useEffect, useRef } from "react";
import { debounce } from "@mui/material";
import Link from "next/link";
import styles from "../../styles/Header.module.css";

const Header: React.FC = ({ toggleDrawer }) => {
  const toggle = useRef(null);
  let wat = useRef(null);
  useEffect(() => {
    toggle.current = debounce(wat ? toggleDrawer : () => {}, 1000);
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
