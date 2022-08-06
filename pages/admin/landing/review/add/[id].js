import ReviewForm from "components/Landing/Review/Review";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Review = (props) => {
  useEffect(() => {
    props.setTitle("Add Review");
  }, []);
  const router = useRouter();
  return <ReviewForm id={router.query.id} goBack={() => {}} />;
};

export default Review;
