import React from "react";
import IdeaWithText from "./IdeaWithText";
import RoiCalculator from "../Forms/RoiCalculator";

interface Iprops {

}

const Idea: React.FC<Iprops> = (props) => {
  return (
    <>
      <IdeaWithText />
      <RoiCalculator />
    </>
  )
};

export default Idea;