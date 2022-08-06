import Main from "../../../../components/Main/Main";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCustomer } from "../../../../redux/actions";
import Customer from "../../../../components/Customer";
import { useRouter } from "next/router";
const Edit = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    props.setTitle("Customer Edit");
  }, []);

  //   useEffect(() => {
  //     dispatch(fetchingJoke());
  //   }, [dispatch]);

  const initialState = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    aadharNumber: "",
    gender: "",
    email: "",
    mobile: "",
    alternativeMobile: "",
    country: "",
    states: "",
    city: "",
    address: "",
    emergencyName: "",
    emergencyContact: "",
    emergencyRelation: "",
    isMarried: "",
    profileImage: "",
    aadharFrontImage: "",
    aadharBackImage: "",
    dateOfAnniversary: "",
  };

  const [state, setState] = useState(initialState);
  const router = useRouter();

  const inputChange = (e) => {
    let { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  const imageChange = (e) => {
    let { name } = e.target;
    setState({ ...state, [name]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    var data = new FormData();

    data.append("profileImage", state.profileImage);
    data.append("aadharFrontImage", state.aadharFrontImage);
    data.append("aadharBackImage", state.aadharBackImage);

    data.append("firstName", state.firstName);
    data.append("lastName", state.lastName);
    data.append("dateOfBirth", state.dateOfBirth);
    data.append("aadharNumber", state.aadharNumber);
    data.append("gender", state.gender);
    data.append("email", state.email);
    data.append("mobile", state.mobile);
    data.append("alternativeMobile", state.alternativeMobile);
    data.append("country", state.country);
    data.append("state", state.states);
    data.append("city", state.city);
    data.append("address", state.address);
    data.append("emergencyName", state.emergencyName);
    data.append("emergencyContact", state.emergencyContact);
    data.append("emergencyRelation", state.emergencyRelation);
    data.append("isMarried", state.isMarried);
    data.append("dateOfAnniversary", state.dateOfAnniversary);
    dispatch(addCustomer(data));
  };

  return <Customer id={router.query.id}></Customer>;
};

export default Edit;
