import React, { useEffect } from "react";
import OfferForm from "../../../../../components/OfferForm";

const AddOffer = (props) => {
  useEffect(() => {
    props.setTitle("Add Offer");
  }, []);
  
  return <OfferForm goBack={() => {}} />;
};

export default AddOffer;
