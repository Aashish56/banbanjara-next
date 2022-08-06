import React, { useEffect } from "react";
import ToursForm from "../../../../components/toursForm";

const AddTour = (props) => {
  useEffect(() => {
    props.setTitle("Add Tour");
  }, []);
  return <ToursForm goBack={() => {}} />;
};

export default AddTour;
