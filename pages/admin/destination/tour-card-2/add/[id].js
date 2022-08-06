import TourCard from "components/Destination/TourCard2/tourCard";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const AddThemes = (props) => {
  useEffect(() => {
    props.setTitle("Add Tour Card 2");
  }, []);
  const router = useRouter();
  return <TourCard id={router.query.id} goBack={() => {}} />;
};

export default AddThemes;
