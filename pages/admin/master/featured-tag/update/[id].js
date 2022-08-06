import React, { useEffect } from "react";
import { useRouter } from "next/router";
import FeatureTags from "components/FeaturedTag/index";

const EditFeaturedTag = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Feature Tags");
  }, []);
  return <FeatureTags id={router.query.id} edit={true} goBack={() => router.back()} />;
};

export default EditFeaturedTag;
