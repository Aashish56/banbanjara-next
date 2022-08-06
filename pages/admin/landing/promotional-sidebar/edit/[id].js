import React, { useEffect } from "react";
import { useRouter } from "next/router";
import PromotionalSideBar from "components/Landing/PromotionalSideBar/promotinalsidebar";

const EditThemes = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Promotional SideBar");
  }, []);
  return <PromotionalSideBar listId={router.query.id} edit={true} id={router.query.list} goBack={() => router.back()} />;
};

export default EditThemes;
