import React, { useEffect } from "react";
import ThemeForm from "../../../../../components/themeForm";

const AddThemes = (props) => {
  useEffect(() => {
    props.setTitle("Add Themes");
  }, []);
  return <ThemeForm goBack={() => {}} />;
};

export default AddThemes;
