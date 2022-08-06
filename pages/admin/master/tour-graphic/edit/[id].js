import React, { useEffect } from "react";
import TourGraphic from '../../../../../components/TourGraphic';

import { useRouter } from "next/router";
const EditTourGraphic = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Tour Graphic");
  }, []);
  return <TourGraphic id={router.query.id} goBack={() => router.back()} />;
};

export default EditTourGraphic;