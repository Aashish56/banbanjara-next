import React, { useEffect } from "react";
import QuickFact from "../../../../../components/QuickFact";

const Add = (props) => {
  useEffect(() => {
    props.setTitle("Add Quick Fact");
  }, []);
  return <QuickFact goBack={() => {}} />;
};

export default Add;
