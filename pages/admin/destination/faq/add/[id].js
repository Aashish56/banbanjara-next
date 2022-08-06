import FAQ from "components/Destination/Faq/Faq";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const AddFAQ = (props) => {
  useEffect(() => {
    props.setTitle("Add FAQ");
  }, []);
  const router = useRouter();
  return <FAQ id={router.query.id} goBack={() => {}} />;
};

export default AddFAQ;
