import React, { useEffect } from "react";
// import TourGraphic from '../../../../../components/TourGraphic';

import { useRouter } from "next/router";
import WhatsIncluded from '../../../../../components/WhatsIncluded';
const EditWhatsIncluded = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Whats Included");
  }, []);
  return <WhatsIncluded id={router.query.id} goBack={() => router.back()} />;
};

export default EditWhatsIncluded;