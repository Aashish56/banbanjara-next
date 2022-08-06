import Main from "../../../../components/Main/Main";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchingJoke } from "../../../../redux/actions";
import Vendor from "../../../../components/Vendor";
const Index = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    props.setTitle("Vender Create");
  }, []);

  //   useEffect(() => {
  //     // dispatch(fetchingJoke());
  //   }, [dispatch]);

  return <Vendor />;
};

export default Index;
