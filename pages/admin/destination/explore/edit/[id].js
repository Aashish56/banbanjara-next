import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Explore from "components/Destination/Explore/explore";

const EditExplore = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Explore");
  }, []);
  return <Explore listId={router.query.id} edit={true} id={router.query.list} goBack={() => router.back()} />;
};

export default EditExplore;
