import React, { useEffect } from "react";
import Country from "../../../../components/Country";
import { useRouter } from "next/router";
const Edit = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Country");
  }, []);
  return <Country id={router.query.id} goBack={() => router.back()} />;
};

export default Edit;
