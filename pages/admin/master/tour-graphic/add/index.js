import React, { useEffect } from "react";
import TourGraphic from '../../../../../components/TourGraphic';

const AddTourGraphic = (props) => {
  useEffect(() => {
    props.setTitle("Add Tour Graphic");
  }, []);
  return <TourGraphic goBack={() => {}} />;
};

export default AddTourGraphic;
