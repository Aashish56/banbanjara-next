import React, { useEffect } from "react";
import Country from "../../../../components/Country";
import { useRouter } from "next/router";
const Add = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Add Country");
  }, []);
  return <Country goBack={() => {}} />;
};

export default Add;
