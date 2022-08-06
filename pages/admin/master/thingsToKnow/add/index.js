import React, { useEffect } from "react";
import ThingsToKnow from '../../../../../components/ThingsToKnow';

const AddThingsToKnow = (props) => {
  useEffect(() => {
    props.setTitle("Add Tour Graphic");
  }, []);
  return <ThingsToKnow goBack={() => {}} />;
};

export default AddThingsToKnow;
