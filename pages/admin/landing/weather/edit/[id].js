import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Weather from "components/Landing/Weather/weather";

const EditWeather = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.setTitle("Edit Local Weather");
  }, []);
  return <Weather listId={router.query.id} edit={true} id={router.query.list} goBack={() => router.back()} />;
};

export default EditWeather;
