import React from "react";
import { TitleComponent } from "../components/Home/TitleComponent";
import SubscribeBody from "../components/Subscribe/SubscribeBody";
import SubscribeHeader from "../components/Subscribe/SubscribeHeader";

const subscribe = () => {
  const SubscribeTitleText = "Subscribe";

  return (
    <>
      <TitleComponent title={SubscribeTitleText} />
      <SubscribeHeader />
      <SubscribeBody />
    </>
  );
};

export default subscribe;