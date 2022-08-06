import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Destination from "components/Destination/Add";

const EditDestination = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Destination Page");
  }, []);
  return <Destination edit={true} id={router.query.id} goBack={() => router.back()} />;
};

export default EditDestination;
