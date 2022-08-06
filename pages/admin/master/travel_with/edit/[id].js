import React, { useEffect } from "react";
import TravelWIthForm from "../../../../../components/travelWIthForm";
import { useRouter } from "next/router";
const EditTravelWith = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Travel With");
  }, []);
  return <TravelWIthForm id={router.query.id} goBack={() => router.back()} />;
};

export default EditTravelWith;
