import AddFeature from "components/FeaturedTag/index";
import React, { useEffect } from "react";

const AddFeaturedTag = (props) => {
  useEffect(() => {
    props.setTitle("Add Featured Tags");
  }, []);
  return <AddFeature goBack={() => {}} />;
};

export default AddFeaturedTag;
