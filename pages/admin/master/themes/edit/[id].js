import React, { useEffect } from "react";
import ThemeForm from "../../../../../components/themeForm";
import { useRouter } from "next/router";

const EditThemes = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Themes");
  }, []);
  return <ThemeForm id={router.query.id} goBack={() => router.back()} />;
};

export default EditThemes;
