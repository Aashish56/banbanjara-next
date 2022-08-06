import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Employee from "components/Employee";

const EditEmployee = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Employee Page");
  }, []);
  
  return <Employee edit={true} id={router.query.id} goBack={() => router.back()} />;
};

export default EditEmployee;
