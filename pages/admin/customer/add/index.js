import Main from "../../../../components/Main/Main";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCustomer } from "../../../../redux/actions";
import Customer from "../../../../components/Customer";
const Add = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    props.setTitle("Customer Create");
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

  return (
    <Customer></Customer>
    //     <div className="bg-color">
    //       <Main />

    //     <div className="container">
    //     <form onSubmit={handleSubmit} className="on_click_submit" role="form" encType="mutlipart/form-data" >

    //         <div className="row clearfix">
    //             <div className="col-sm-6">
    //                 <div className="form-group">
    //                     <div className="form-line">
    //                         <label htmlFor="firstName" className="control-label">First Name<span className="required"> *</span> :</label>
    //                         <input name="firstName" id="firstName" type="text" className="form-control"
    //                          value={state.firstName}
    //                          onChange={inputChange}/>

    //                     </div>
    //                     <span id="first_name_error" className="error"></span>
    //                 </div>
    //             </div>
    //             <div className="col-sm-6">
    //                 <div className="form-group">
    //                     <div className="form-line">
    //                         <label htmlFor="lastName" className="control-label">Last Name<span className="required"> *</span> :</label>
    //                         <input name="lastName" id="lastName" type="text" className="form-control"
    //                          value={state.lastName}
    //                          onChange={inputChange}
    //                           />
    //                     </div>
    //                     <span id="last_name_error" className="error"></span>
    //                 </div>
    //             </div>
    //         </div>
    //         <div className="row clearfix">
    //             <div className="col-sm-6">
    //                 <div className="form-group">
    //                     <div className="form-line">
    //                         <label htmlFor="email" className="control-label">Email<span className="required">* </span> :</label>
    //                         <input name="email" id="email" type="email" className="form-control"
    //                          value={state.email}
    //                          onChange={inputChange} />

    //                     </div>
    //                     <span id="email_error" className="error"></span>
    //                 </div>
    //             </div>

    //             <div className="col-sm-6">
    //                 <div className="form-group">
    //                     <div className="form-line">
    //                         <label htmlFor="mobile" className="control-label">Mobile<span className="required"> *</span> :</label>
    //                         <input name="mobile" id="mobile" type="number" className="form-control"
    //                         value={state.mobile}
    //                         onChange={inputChange}
    //                         />
    //                     </div>
    //                     <span id="last_name_error" className="error"></span>
    //                 </div>
    //             </div>

    //             <div className="col-sm-6">
    //                 <div className="form-group">
    //                     <div className="form-line">
    //                         <label htmlFor="alternativeMobile" className="control-label">Alternative Mobile<span className="required"> *</span> :</label>
    //                         <input name="alternativeMobile" id="alternativeMobile" type="number" className="form-control"
    //                          value={state.alternativeMobile}
    //                          onChange={inputChange}
    //                           />
    //                     </div>
    //                     <span id="last_name_error" className="error"></span>
    //                 </div>
    //             </div>

    //             <div className="col-sm-6">
    //                 <label htmlFor="gender" className="control-label">Gender<span className="required">* </span> :</label>
    //                 <select className="form-control" name="gender" onChange={inputChange}>
    //                     <option value="male">Male</option>
    //                     <option value="female">Female</option>
    //                 </select>
    //             </div>

    //             <div className="col-sm-6">
    //                 <div className="form-group">
    //                     <div className="form-line">
    //                         <label htmlFor="dateOfBirth" className="control-label"><span className="required"> Date Of Birth *</span> :</label>
    //                         <input name="dateOfBirth" id="dateOfBirth" type="date" className="form-control"
    //                          value={state.dateOfBirth}
    //                          onChange={inputChange}
    //                           />
    //                     </div>
    //                     <span id="last_name_error" className="error"></span>
    //                 </div>
    //             </div>

    //             <div className="col-sm-6">
    //                 <div className="form-group">
    //                     <div className="form-line">
    //                         <label htmlFor="aadharNumber" className="control-label">Aadhar Number<span className="required"> *</span> :</label>
    //                         <input name="aadharNumber" id="aadharNumber" type="number" className="form-control"
    //                          value={state.aadharNumber}
    //                          onChange={inputChange}
    //                           />
    //                     </div>
    //                     <span id="last_name_error" className="error"></span>
    //                 </div>
    //             </div>
    //         </div>
    //         <div className="row clearfix">
    //             <div className="col-sm-6">
    //                 <div className="form-group">
    //                     <div className="form-line">
    //                         <label htmlFor="address" className="control-label">Address<span className="required"> *</span> :</label>
    //                         <input name="address" id="address" type="text" className="form-control"  value={state.address}
    //                          onChange={inputChange}
    //                           />
    //                     </div>
    //                     <span id="address_error" className="error"></span>
    //                 </div>
    //             </div>
    //             <div className="col-sm-6">
    //             <label htmlFor="company_name" className="control-label">Country<span className="required">* </span> :</label>
    //                 <select className="form-control" name="country" onChange={inputChange}>
    //                     <option value="2">India</option>
    //                     <option value="1">news</option>
    //                 </select>
    //             </div>
    //             <div className="col-sm-6">
    //             <label htmlFor="company_name" className="control-label">State<span className="required">* </span> :</label>
    //                 <select className="form-control" name="states" onChange={inputChange}>
    //                     <option value="2">India</option>
    //                     <option value="1">news</option>
    //                 </select>
    //             </div>
    //             <div className="col-sm-6">
    //             <label htmlFor="company_name" className="control-label">City<span className="required">* </span> :</label>
    //                 <select className="form-control" name="city" onChange={inputChange}>
    //                     <option value="2">India</option>
    //                     <option value="1">news</option>
    //                 </select>
    //             </div>

    //             <div className="col-sm-6">
    //                 <div className="form-group">
    //                     <div className="form-line">
    //                         <label htmlFor="emergencyName" className="control-label">Emergency Name<span className="required"> *</span> :</label>
    //                         <input name="emergencyName" id="emergencyName" type="text" className="form-control"
    //                          value={state.emergencyName}
    //                          onChange={inputChange}/>

    //                     </div>
    //                     <span id="address_error" className="error"></span>
    //                 </div>
    //             </div>

    //             <div className="col-sm-6">
    //                 <div className="form-group">
    //                     <div className="form-line">
    //                         <label htmlFor="emergencyContact" className="control-label">Emergency Contact<span className="required"> *</span> :</label>
    //                         <input name="emergencyContact" id="emergencyContact" type="number" className="form-control"
    //                          value={state.emergencyContact}
    //                          onChange={inputChange}
    //                          />
    //                     </div>
    //                     <span id="address_error" className="error"></span>
    //                 </div>
    //             </div>

    //             <div className="col-sm-6">
    //                 <div className="form-group">
    //                     <div className="form-line">
    //                         <label htmlFor="emergencyRelation" className="control-label">Emergency Relation<span className="required"> *</span> :</label>
    //                         <input name="emergencyRelation" id="emergencyRelation" type="text" className="form-control"
    //                          value={state.emergencyRelation}
    //                          onChange={inputChange}
    //                         />
    //                     </div>
    //                     <span id="address_error" className="error"></span>
    //                 </div>
    //             </div>

    //             <div className="col-sm-6">
    //                 <div className="form-group mt-3">
    //                     <div className="form-line">
    //                         <label htmlFor="emergencyRelation" className="control-label">Marriage status? <span className="required"> *</span> </label>
    //                         <div className="form-check form-check-inline">
    //                             <input className="form-check-input"  onChange={inputChange} type="radio" name="isMarried" id="inlineRadio1" value="true" />
    //                             <label className="form-check-label" htmlFor="inlineRadio1">Married</label>
    //                         </div>
    //                         <div className="form-check form-check-inline">
    //                             <input className="form-check-input"  onChange={inputChange} type="radio" name="isMarried" id="inlineRadio2" value="false" />
    //                             <label className="form-check-label" htmlFor="inlineRadio2">unmarried</label>
    //                         </div>
    //                     </div>
    //                     <span id="address_error" className="error"></span>
    //                 </div>
    //             </div>

    //             <div className="col-sm-6">
    //                 <div className="form-group">
    //                     <div className="form-line">
    //                         <label htmlFor="dateOfAnniversary" className="control-label"><span className="required"> Date Of Anniversary</span> :</label>
    //                         <input name="dateOfAnniversary" id="dateOfAnniversary" type="date" className="form-control"
    //                          value={state.dateOfAnniversary}
    //                          onChange={inputChange}
    //                         />
    //                     </div>
    //                     <span id="last_name_error" className="error"></span>
    //                 </div>
    //             </div>
    //         </div>

    //         <br />

    //         <div className="row clearfix">
    //             <div className="col-sm-6">
    //                 <div className="form-group add-image">
    //                 <label htmlFor="emergencyRelation" className="control-label">Profile Image<span className="required"> *</span> :</label>
    //                     <input name="profileImage" onChange={imageChange} id="profile_image" className="form-control image-input-file" type="file" />

    //                     <span id="profile_image_error" className="error"></span>
    //                 </div>
    //             </div>

    //             <div className="col-sm-6">
    //                 <div className="form-group add-image">
    //                 <label htmlFor="aadharFrontImage" className="control-label">Aadhar Front Image<span className="required"> *</span> :</label>
    //                     <input name="aadharFrontImage" onChange={imageChange} id="aadharFrontImage" className="form-control image-input-file" type="file" />

    //                     <span id="profile_image_error" className="error"></span>
    //                 </div>
    //             </div>

    //             <div className="col-sm-6">
    //                 <div className="form-group add-image">
    //                 <label htmlFor="aadharBackImage" className="control-label">Aadhar Back Image<span className="required"> *</span> :</label>
    //                     <input name="aadharBackImage" id="aadharBackImage" onChange={imageChange} className="form-control image-input-file" type="file" />

    //                     <span id="profile_image_error" className="error"></span>
    //                 </div>
    //             </div>
    //         </div>

    //         <button type="submit" id="user-add-btn-id" className="btn-submit">Submit</button>
    //         <a href="https://admin.banbanjara.com/admin/vendor"><button type="button" className="btn bg-brown btn-sm waves-effect"><i className="material-icons font-14"></i>Cancel</button></a>
    //     </form>
    // </div>

    //     </div>
  );
};

export default Add;
