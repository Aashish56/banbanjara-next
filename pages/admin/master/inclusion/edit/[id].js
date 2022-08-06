import React, { useEffect } from "react";
import InclusionForm from "../../../../../components/InclusionForm";
import { useRouter } from "next/router";
const Edit = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Inclusion");
  }, []);
  return <InclusionForm id={router.query.id} goBack={() => router.back()} />;
};

export default Edit;
