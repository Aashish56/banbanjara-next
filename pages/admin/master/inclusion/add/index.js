import React, { useEffect } from "react";
import InclusionForm from "../../../../../components/InclusionForm";

const Add = (props) => {
  useEffect(() => {
    props.setTitle("Add Inclusion");
  }, []);
  return <InclusionForm goBack={() => {}} />;
};

export default Add;
