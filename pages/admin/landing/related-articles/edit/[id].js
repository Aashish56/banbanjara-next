import React, { useEffect } from "react";
import { useRouter } from "next/router";
import RelatedArticles from "components/Landing/RelatedArticles/relatedArticles";

const EditThemes = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Related Articles");
  }, []);
  return <RelatedArticles listId={router.query.id} edit={true} id={router.query.list} goBack={() => router.back()} />;
};

export default EditThemes;
