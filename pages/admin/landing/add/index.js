import AddLanding from "components/Landing/Add";
import React, { useEffect } from "react";

const AddThemes = (props) => {
  useEffect(() => {
    props.setTitle("Add Landing");
  }, []);
  return <AddLanding goBack={() => {}} />;
};

export default AddThemes;
