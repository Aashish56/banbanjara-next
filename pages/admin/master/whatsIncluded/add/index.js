import React, { useEffect } from "react";
import WhatsIncluded from "../../../../../components/WhatsIncluded";

const AddWhatsIncluded = (props) => {
  useEffect(() => {
    props.setTitle("Add Whats Included");
  }, []);
  return <WhatsIncluded goBack={() => {}} />;
};

export default AddWhatsIncluded;
