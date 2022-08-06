import React, { useEffect } from "react";
import ThingsToKnow from '../../../../../components/ThingsToKnow/index';

import { useRouter } from "next/router";
const EditTourGraphic = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Tour Graphic");
  }, []);
  return <ThingsToKnow id={router.query.id} goBack={() => router.back()} />;
};

export default EditTourGraphic;