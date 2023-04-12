"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Divider, styled } from "@mui/material";
import supabaseIcon from "../../public/supabaseIcon.png";

interface Iprops {
  variant?: any;
  color?: string;
}

const FooterHeadingStyled = styled("div")({
  variant: "body2",
  fontWeight: "300",
  lineHeight: "0.6rem",
  color: "textSecondary",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
});

const FooterContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

const Footer: React.FC<Iprops> = (props: Iprops) => {
  const imageProps = {
    width: 150,
    height: 150,
    className: styles.footerIcon,
  };

  return (
    <FooterContainer id="footer">
      <FooterHeadingStyled>
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
      </FooterHeadingStyled>
      <Divider />
      <FooterHeadingStyled>
        © 2023 PropertyCo. All rights reserved.
      </FooterHeadingStyled>
    </FooterContainer>
  );
};

export default Footer;
