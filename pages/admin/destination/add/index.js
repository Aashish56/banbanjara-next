import AddDestination from "components/Destination/Add";
import React, { useEffect } from "react";

const AddThemes = (props) => {
  useEffect(() => {
    props.setTitle("Add Destination");
  }, []);
  return <AddDestination goBack={() => {}} />;
};

export default AddThemes;
