import React, { useEffect } from "react";
import ToursForm from "../../../../components/toursForm";
import { useRouter } from "next/router";
const EditTour = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Tour");
  }, []);
  return <ToursForm id={router.query.id} goBack={() => router.back()} />;
};

export default EditTour;
