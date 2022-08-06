import React, { useEffect } from "react";
import { useRouter } from "next/router";
import TourCard from "components/Destination/TourCard2/tourCard";

const EditThemes = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Tour Card 2");
  }, []);
  return <TourCard listId={router.query.id} edit={true} id={router.query.list} goBack={() => router.back()} />;
};

export default EditThemes;
