import React, { useEffect } from "react";
import TaxesForm from "../../../../../components/taxesForm";
import { useRouter } from "next/router";

const Edit = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Taxes");
  }, []);
  return <TaxesForm id={router.query.id} goBack={() => router.back()} />;
};

export default Edit;
