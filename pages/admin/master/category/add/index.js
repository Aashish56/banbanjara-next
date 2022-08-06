import React, { useEffect } from "react";
import CategoryForm from "../../../../../components/CategoryForm";

const AddCategory = (props) => {
  
      useEffect(() => {
        props.setTitle("Add Category");
      }, []);
          
  return <CategoryForm goBack={() => {}} />;
};

export default AddCategory;