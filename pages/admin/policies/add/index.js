import React, { useEffect } from "react";
import Policies from '../../../../components/Policies';

const AddPolicies = (props) => {
  useEffect(() => {
    props.setTitle("Add Tour Graphic");
  }, []);
  return <Policies goBack={() => {}} />;
};

export default AddPolicies;
