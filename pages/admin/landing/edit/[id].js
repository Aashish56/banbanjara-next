import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Landing from "components/Landing/Add";

const EditLanding = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Landing Page");
  }, []);
  
  return <Landing edit={true} id={router.query.id} goBack={() => router.back()} />;
};

export default EditLanding;
