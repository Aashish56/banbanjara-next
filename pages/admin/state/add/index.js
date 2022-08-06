import React, { useEffect } from "react";
import State from "../../../../components/State";
import { useRouter } from "next/router";
const AddState = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Add State");
  }, []);
  return <State goBack={() => {}} />;
};

export default AddState;
