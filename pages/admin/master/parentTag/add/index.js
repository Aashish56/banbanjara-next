import React, { useEffect } from "react";
import ParentTagForm from "../../../../../components/ParentTagForm";

const AddParentTag = (props) => {
  useEffect(() => {
    props.setTitle("Add Parent Tag");
  }, []);

  return <ParentTagForm goBack={() => {}} />;
};

export default AddParentTag;
