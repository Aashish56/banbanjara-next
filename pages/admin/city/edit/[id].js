import React, { useEffect } from "react";
import City from "../../../../components/City";
import { useRouter } from "next/router";
const Edit = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit City");
  }, []);
  return <City id={router.query.id} goBack={() => router.back()} />;
};

export default Edit;
