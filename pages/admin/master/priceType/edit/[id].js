import React, { useEffect } from "react";
import PriceTypeForm from "../../../../../components/priceTypeForm";
import { useRouter } from "next/router";

const EditPriceType = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Price Type");
  }, []);
  return <PriceTypeForm id={router.query.id} goBack={() => router.back()} />;
};

export default EditPriceType;
