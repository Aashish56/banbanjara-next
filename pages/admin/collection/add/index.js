import React, { useEffect } from "react";
import CollectionForm from "../../../../components/CollectionForm";
import { useRouter } from "next/router";
const AddCollection = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle(" Add Collection");
  }, []);
  return <CollectionForm goBack={() => {}} />;
};

export default AddCollection;