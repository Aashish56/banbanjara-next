import ExploreNearby from "components/Destination/Explore/explore";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Explore = (props) => {
  useEffect(() => {
    props.setTitle("Add Explore Nearby");
  }, []);
  const router = useRouter();
  return <ExploreNearby id={router.query.id} goBack={() => {}} />;
};

export default Explore;
