import React, { useEffect } from "react";
import TravelWIthForm from "../../../../../components/travelWIthForm";

const AddTravelWith = (props) => {
  useEffect(() => {
    props.setTitle("Add Travel With");
  }, []);
  return <TravelWIthForm goBack={() => {}} />;
};

export default AddTravelWith;
