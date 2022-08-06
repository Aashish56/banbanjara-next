import React, { useEffect } from "react";
import ParentTagForm from "../../../../../components/ParentTagForm";
import { useRouter } from "next/router";

const EditParentTag = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Parent Tag");
  }, []);

  return <ParentTagForm id={router.query.id} goBack={() => router.back()} />;
};

export default EditParentTag;