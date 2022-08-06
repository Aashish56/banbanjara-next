import React, { useEffect } from "react";
import TagPageForm from "../../../../components/TagPageForm";
import { useRouter } from "next/router";
const EditTagPage = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Tag Page");
  }, []);

  return <TagPageForm  goBack={() => router.back()} />;
};

export default EditTagPage;
