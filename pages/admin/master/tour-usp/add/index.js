import React, { useEffect } from "react";
import TourUSP from '../../../../../components/TourUSP';

const AddTourUSP = (props) => {
  useEffect(() => {
    props.setTitle("Add Tour USP");
  }, []);
  return <TourUSP goBack={() => {}} />;
};

export default AddTourUSP;
