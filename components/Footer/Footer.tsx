"use client";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Typography } from "@mui/material";
import Link from "next/link";
import vercel from "../../public/vercel.svg";
import supabaseIcon from "../../public/supabaseIcon.png";
import Image from "next/image";
import styles from "../../styles/Footer.module.css";
type FooterProps = {
  ref: HTMLDivElement;
};
const Footer: React.FC = (props) => {
  const imageProps = {
    width: 150,
    height: 150,
    className: styles.footerIcon,
  };
  return (  
    <footer id="#aboutus">
      <Typography variant="body2" color="textSecondary" align="center">
        {"Built with "}
        <Link href="https://github.com/earmuff-jam/climate">
          <GitHubIcon className="footerIcon" />
        </Link>
        <Link href="https://app.supabase.com/project/itketbghegyqksqxiuqe">
          <Image src={supabaseIcon} alt="Supabse" {...imageProps} />
        </Link>
        <Link href="https://vercel.com/earmuff-jam/climate">
          <Image
            src={vercel}
            alt="Vercel"
            {...imageProps}
            className={styles.footerIconx}
          />
        </Link>
      </Typography>
    </footer>
  );
};

export default Footer;
