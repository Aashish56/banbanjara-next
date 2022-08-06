import React, { useEffect } from "react";
import OfferForm from "../../../../../components/OfferForm";
import { useRouter } from "next/router";
const EditTour = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Offer");
  }, []);

  return <OfferForm id={router.query.id} goBack={() => router.back()} />;
};

export default EditTour;
