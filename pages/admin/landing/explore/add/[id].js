import ExploreNearby from "components/Landing/Explore/explore";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Explore = (props) => {
  useEffect(() => {
    props.setTitle("Add Explore Near By");
  }, []);
  const router = useRouter();
  return <ExploreNearby id={router.query.id} goBack={() => {}} />;
};

export default Explore;
