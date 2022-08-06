import PromotionalSideBar from "components/Destination/PromotionalSideBar/promotinalsidebar";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const AddPromotionBar = (props) => {
  useEffect(() => {
    props.setTitle("Promotional SideBar Card");
  }, []);
  const router = useRouter();
  return <PromotionalSideBar id={router.query.id} goBack={() => {}} />;
};

export default AddPromotionBar;
