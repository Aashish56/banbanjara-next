import React, { useEffect } from "react";
import State from "../../../../components/State";
import { useRouter } from "next/router";
const EditState = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit State");
  }, []);
  return <State id={router.query.id} goBack={() => router.back()} />;
};

export default EditState;
