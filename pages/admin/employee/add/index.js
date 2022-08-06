import Employee from "components/Employee";
import React, { useEffect } from "react";

const AddEmployee = (props) => {
  useEffect(() => {
    props.setTitle("Add Employee");
  }, []);
  return <Employee goBack={() => {}} />;
};

export default AddEmployee;
