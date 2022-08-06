import React, { useEffect } from "react";
import ConsumerPaymentTermForm from "../../../../../components/consumerPaymentTermForm";
import { useRouter } from "next/router";
const Edit = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Consumer Payment Term");
  }, []);
  return (
    <ConsumerPaymentTermForm
      id={router.query.id}
      goBack={() => router.back()}
    />
  );
};

export default Edit;
