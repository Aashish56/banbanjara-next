import PromotionalSideBar from "components/Landing/PromotionalSideBar/promotinalsidebar";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const AddThemes = (props) => {
  useEffect(() => {
    props.setTitle("Promotional SideBar Card");
  }, []);
  const router = useRouter();
  return <PromotionalSideBar id={router.query.id} goBack={() => {}} />;
};

export default AddThemes;
