import React from "react";
import Body from "../components/Subscribe/Body";
import { TitleComponent } from "../components/Home/TitleComponent";

const titleText = "Subscribe";
const title = 'Subscribe and billing';
const desc = 'Learn more about how to start, stop or update a subscription';


const Subscribe = () => {

  return (
    <>
      <TitleComponent title={titleText} />
      <Body title={title} desc={desc} display="flex" />
    </>
  );
};

export default Subscribe;