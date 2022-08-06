import React, { useEffect } from "react";
import ConsumerPaymentTermForm from "../../../../../components/consumerPaymentTermForm";

const Add = (props) => {
  useEffect(() => {
    props.setTitle("Add Consumer Payment Term");
  }, []);
  return <ConsumerPaymentTermForm goBack={() => {}} />;
};

export default Add;
