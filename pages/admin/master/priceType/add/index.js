import React, { useEffect } from "react";
import PriceTypeForm from "../../../../../components/priceTypeForm";

const AddPriceType = (props) => {
  useEffect(() => {
    props.setTitle("Add Price Type");
  }, []);
  return <PriceTypeForm goBack={() => {}} />;
};

export default AddPriceType;
