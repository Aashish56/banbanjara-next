import React, { useEffect } from "react";
import City from "../../../../components/City";
import { useRouter } from "next/router";
const Add = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Add City");
  }, []);
  return <City goBack={() => {}} />;
};

export default Add;
