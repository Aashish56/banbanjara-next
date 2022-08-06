import AddListingCard2 from "components/Landing/Listing/Listing2";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const AddThemes = (props) => {
  useEffect(() => {
    props.setTitle("Add Listing Card 2");
  }, []);
  const router = useRouter();
  return <AddListingCard2 id={router.query.id} goBack={() => {}} />;
};

export default AddThemes;
