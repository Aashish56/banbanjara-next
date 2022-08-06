import React, { useEffect } from "react";
import { useRouter } from "next/router";
import AddLanding2 from "components/Landing/Listing/Listing2";

const EditThemes = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Listing 2");
  }, []);
  return <AddLanding2 edit={true} id={router.query.list} goBack={() => router.back()} />;
};

export default EditThemes;
