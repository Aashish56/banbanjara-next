import React, { useEffect } from "react";
import TaxesForm from "../../../../../components/taxesForm";

const Add = (props) => {
  useEffect(() => {
    props.setTitle("Add Taxes");
  }, []);
  return <TaxesForm goBack={() => {}} />;
};

export default Add;
