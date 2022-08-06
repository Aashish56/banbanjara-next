import React, { useEffect } from "react";
import TagPageForm from "../../../../components/TagPageForm";

const AddTagPage = (props) => {
  useEffect(() => {
    props.setTitle("Add Tag Page");
  }, []);

  return <TagPageForm goBack={() => {}} />;
};

export default AddTagPage;
