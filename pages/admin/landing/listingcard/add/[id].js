import AddListingCard1 from "components/Landing/Listing/Listing1";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const AddThemes = (props) => {
  useEffect(() => {
    props.setTitle("Add Listing Card 1");
  }, []);
  const router = useRouter();
  return <AddListingCard1 id={router.query.id} goBack={() => {}} />;
};

export default AddThemes;
