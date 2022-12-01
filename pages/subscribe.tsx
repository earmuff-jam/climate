import React from "react";
import EmailAddressForm from "../components/Forms/CallToActionForm";
import { TitleComponent } from "../components/Home/TitleComponent";
import SubscribeHeader from "../components/Subscribe/SubscribeHeader";

const subscribe = () => {
  const SubscribeTitleText = "Subscribe";

  return (
    <>
      <TitleComponent title={SubscribeTitleText} />
      <SubscribeHeader />
      <EmailAddressForm />
    </>
  );
};

export default subscribe;