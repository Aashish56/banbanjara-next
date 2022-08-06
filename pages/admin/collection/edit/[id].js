import React, { useEffect } from "react";
import CollectionForm from "../../../../components/CollectionForm";
import { useRouter } from "next/router";
const EditCollection = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Collection");
  }, []);

  return <CollectionForm id={router.query.id} goBack={() => router.back()} />;
};

export default EditCollection;
