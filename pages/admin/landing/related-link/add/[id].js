import FeatureTag from "components/Landing/RelatedLinks/relatedLinks";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Feature = (props) => {
  useEffect(() => {
    props.setTitle("Add Related Links 1");
  }, []);
  const router = useRouter();
  return <FeatureTag id={router.query.id} goBack={() => {}} />;
};

export default Feature;
