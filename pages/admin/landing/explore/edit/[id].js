import React, { useEffect } from "react";
import { useRouter } from "next/router";
import ExploreNearby from "components/Landing/Explore/explore";

const EditThemes = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Explore Near By");
  }, []);
  return <ExploreNearby listId={router.query.id} edit={true} id={router.query.list} goBack={() => router.back()} />;
};

export default EditThemes;
