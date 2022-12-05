"use client";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Divider, Typography } from "@mui/material";
import Link from "next/link";
import vercel from "../../public/vercel.svg";
import supabaseIcon from "../../public/supabaseIcon.png";
import Image from "next/image";
import styles from "./Footer.module.css";
import Text from "../Typography/Text";

const Footer: React.FC = () => {
  const imageProps = {
    width: 150,
    height: 150,
    className: styles.footerIcon,
  };
  return (
    <footer id="#aboutus">
      <Typography variant="body2" color="textSecondary" align="center">
        <Link href="https://github.com/earmuff-jam/climate">
          <GitHubIcon className="footerIcon" />
        </Link>
        <Link href="https://app.supabase.com/project/itketbghegyqksqxiuqe">
          <Image
            src={supabaseIcon}
            alt="supabase icon that leads to supabase page"
            {...imageProps}
          />
        </Link>
        <Link href="https://app.supabase.com/project/itketbghegyqksqxiuqe">
          <Image
            src={"/favicon.ico"}
            alt="vercel icon that leads to vercel page"
            {...imageProps}
          />
        </Link>
      </Typography>
      <br />
      <Divider />
      <br />
      <Text
        variant={"body"}
        justifyContent="center"
        color={"textSecondary"}
        textAlign="center"
      >
        Copyright @2022. Earmuff Jam. All rights reserved.
      </Text>
    </footer>
  );
};

export default Footer;
