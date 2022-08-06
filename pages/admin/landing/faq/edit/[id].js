import React, { useEffect } from "react";
import { useRouter } from "next/router";
import FAQ from "components/Landing/Faq/Faq";

const EditFAQ = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit FAQ");
  }, []);
  return <FAQ edit={true} id={router.query.list} goBack={() => router.back()} />;
};

export default EditFAQ;
