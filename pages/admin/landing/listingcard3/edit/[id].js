import React, { useEffect } from "react";
import { useRouter } from "next/router";
import AddLanding3 from "components/Landing/Listing/Listing3";

const EditThemes = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Listing 3");
  }, []);
  return <AddLanding3 listId={router.query.id} edit={true} id={router.query.list} goBack={() => router.back()} />;
};

export default EditThemes;
