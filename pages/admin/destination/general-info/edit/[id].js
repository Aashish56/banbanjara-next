import React, { useEffect } from "react";
import { useRouter } from "next/router";
import GeneralInfo from "components/Destination/GeneralInfo/generalInfo";

const EditGenralInfo = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit General Info");
  }, []);
  return <GeneralInfo listId={router.query.id} edit={true} id={router.query.list} goBack={() => router.back()} />;
};

export default EditGenralInfo;
