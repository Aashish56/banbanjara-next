import React, { useEffect } from "react";
import { useRouter } from "next/router";
import AddLanding from "components/Landing/Listing/Listing1";

const EditThemes = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Listing 1");
  }, []);
  return <AddLanding listId={router.query.id} edit={true} id={router.query.list} goBack={() => router.back()} />;
};

export default EditThemes;
