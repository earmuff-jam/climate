import Link from "next/link";
import styles from "../../styles/Header.module.css";

const Header: React.FC = ({
  toggleDrawer,
}) => {
  return (
    <div>
      <Link
        href="#aboutus"
        className={styles.skipNav}
        aria-label="Skip to footer"
      >
        Skip to Footer
      </Link>
      <div onMouseOut={() => {toggleDrawer()}}>Hi</div>
    </div>
  );
};

export default Header;
