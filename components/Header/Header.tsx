import styles from "../../styles/Header.module.css";

const Header: React.FC = () => {
  return (
    <div>
      <a
        href=""
        className={styles.skipNav}
        onClick={() =>
          document.getElementById("footer")?.scrollIntoView({
            block: "start",
            behavior: "smooth",
          })
        }
      >
        Skip to Footer
      </a>
      Hi
    </div>
  );
};

export default Header;
