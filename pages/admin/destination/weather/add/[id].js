import Weather from "components/Destination/Weather/weather";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const AddWeather = (props) => {
  useEffect(() => {
    props.setTitle("Add Local Weather");
  }, []);
  const router = useRouter();
  return <Weather id={router.query.id} goBack={() => {}} />;
};

export default AddWeather;
