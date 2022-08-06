import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Review from "components/Landing/Review/Review";

const EditThemes = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Review");
  }, []);
  return <Review edit={true} id={router.query.list} goBack={() => router.back()} />;
};

export default EditThemes;
