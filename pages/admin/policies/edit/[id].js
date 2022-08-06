import React, { useEffect } from "react";
import Policies from '../../../../components/Policies';

import { useRouter } from "next/router";
const EditPolicies = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Tour Graphic");
  }, []);
  return <Policies id={router.query.id} goBack={() => router.back()} />;
};

export default EditPolicies;