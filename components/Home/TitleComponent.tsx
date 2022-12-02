import React from "react";
import Head from "next/head";

interface Iprops {
  title: string;
}

export const TitleComponent: React.FC<Iprops> = (props) => {
  const { title } = props;
  return (
    <Head>
      <title> Climate Suggestion | {title}</title>
      <meta name="keywords" content="retail, storage" />
    </Head>
  );
};