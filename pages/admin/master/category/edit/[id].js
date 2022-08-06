import React, { useEffect } from "react";
import CategoryForm from "../../../../../components/CategoryForm";
import { useRouter } from "next/router";

const EditCategory = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Category");
  }, []);

  return <CategoryForm id={router.query.id} goBack={() => router.back()} />;
};

export default EditCategory;