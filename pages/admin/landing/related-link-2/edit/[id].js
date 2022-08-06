import React, { useEffect } from "react";
import { useRouter } from "next/router";
import FeatureTags from "components/Landing/RelatedLinks2/relatedLinks";

const EditThemes = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Related Tags 2");
  }, []);
  return <FeatureTags listId={router.query.id} edit={true} id={router.query.list} goBack={() => router.back()} />;
};

export default EditThemes;
