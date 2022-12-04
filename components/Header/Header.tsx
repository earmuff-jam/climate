import Link from "next/link";
import styles from "../../styles/Header.module.css";

const Header: React.FC = () => {
  return (
    <div>
      <Link
        href="#aboutus"
        className={styles.skipNav}
        aria-label="Skip to footer"
      >
        Skip to Footer
      </Link>
      Hi
    </div>
  );
};

export default Header;
