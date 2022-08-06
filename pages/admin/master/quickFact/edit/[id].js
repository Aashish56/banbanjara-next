import React, { useEffect } from "react";
import QuickFact from "../../../../../components/QuickFact";
import { useRouter } from "next/router";
const Edit = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Quick Fact");
  }, []);
  return <QuickFact id={router.query.id} goBack={() => router.back()} />;
};

export default Edit;
