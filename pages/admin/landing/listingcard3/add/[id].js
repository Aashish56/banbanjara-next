import AddListingCard3 from "components/Landing/Listing/Listing3";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const AddThemes = (props) => {
  useEffect(() => {
    props.setTitle("Add Listing Card 3");
  }, []);
  const router = useRouter();
  return <AddListingCard3 id={router.query.id} goBack={() => {}} />;
};

export default AddThemes;
