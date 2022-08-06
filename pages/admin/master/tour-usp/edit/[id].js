import React, { useEffect } from "react";
// import TourGraphic from '../../../../../components/TourGraphic';

import { useRouter } from "next/router";
import TourUSP from '../../../../../components/TourUSP';
const EditTourUSP = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Tour USP");
  }, []);
  return <TourUSP id={router.query.id} goBack={() => router.back()} />;
};

export default EditTourUSP;