"use client";
import Link from "next/link";
import Image from "next/image";
import Text from "../Typography/Text";
import styles from "./Footer.module.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Divider, Typography } from "@mui/material";
import supabaseIcon from "../../public/supabaseIcon.png";

interface Iprops {
  variant?: any;
  color?: string;
}

const Footer: React.FC<Iprops> = (props: Iprops) => {
  const imageProps = {
    width: 150,
    height: 150,
    className: styles.footerIcon,
  };

  const { variant = "body2", color = "textSecondary" } = props;

  return (
    <footer id="#footer">
      <Typography variant={variant} color={color} align="center">
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
        variant={"body2"}
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
