import GenralInfo from "components/Landing/GeneralInfo/generalInfo";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const AddGenralInfo = (props) => {
  useEffect(() => {
    props.setTitle("Add Genral Info");
  }, []);
  const router = useRouter();
  return <GenralInfo id={router.query.id} goBack={() => {}} />;
};

export default AddGenralInfo;
