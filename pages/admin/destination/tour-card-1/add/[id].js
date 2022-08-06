import TourCard from "components/Destination/TourCard1/tourCard";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Destination = (props) => {
  useEffect(() => {
    props.setTitle("Add Tour Card 1");
  }, []);
  const router = useRouter();
  return <TourCard id={router.query.id} goBack={() => {}} />;
};

export default Destination;
