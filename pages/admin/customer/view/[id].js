import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Customer from "../../../../components/Customer";

function View(props) {
  const router = useRouter();
  const customers = useSelector((state) => state.customer);
  const dispatch = useDispatch();
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
  const [customer, setCustomer] = useState(initialState);

  useEffect(() => {
    const customer = customers.find((it) => it._id === router.query.id);
    console.log(customer);
    if (customer) {
      setCustomer(customer);
      console.log(customer?.profileImage[0]?.path);
    }
  }, [customers]);

  return (
    <>
      <div className="bg-color">
        <div className="container">
          <form
            className="on_click_submit"
            role="form"
            encType="mutlipart/form-data"
          >
            {/* <Image
              alt="image-alt-text"
              width={100}
              height={100}
              // src="/uploads/user/aadharFrontImage-1641195808737.png"
              src='/profilepic.jpg'
            ></Image> */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              {customer && (
                <Image
                  width={100}
                  height={100}
                  src={`/${customer?.profileImage[0]?.path}`}
                ></Image>
              )}
            </div>
            <div className="row clearfix">
              <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-line">
                    <label htmlFor="firstName" className="control-label">
                      First Name<span className="required"> *</span> :
                    </label>
                    <span
                      name="firstName"
                      id="firstName"
                      type="text"
                      className="form-control"
                    >
                      {customer.firstName}
                    </span>
                  </div>
                  <span id="first_name_error" className="error"></span>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-line">
                    <label htmlFor="lastName" className="control-label">
                      Last Name<span className="required"> *</span> :
                    </label>
                    <span
                      name="lastName"
                      id="lastName"
                      type="text"
                      className="form-control"
                    >
                      {customer.lastName}
                    </span>
                  </div>
                  <span id="last_name_error" className="error"></span>
                </div>
              </div>
            </div>
            <div className="row clearfix">
              <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-line">
                    <label htmlFor="email" className="control-label">
                      Email<span className="required">* </span> :
                    </label>
                    <span
                      name="email"
                      id="email"
                      type="email"
                      className="form-control"
                    >
                      {customer.email}
                    </span>
                  </div>
                  <span id="email_error" className="error"></span>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-line">
                    <label htmlFor="mobile" className="control-label">
                      Mobile<span className="required"> *</span> :
                    </label>
                    <span
                      name="mobile"
                      id="mobile"
                      type="number"
                      className="form-control"
                    >
                      {customer.mobile}
                    </span>
                  </div>
                  <span id="last_name_error" className="error"></span>
                </div>
              </div>

              {/* <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-line">
                    <label htmlFor="alternativeMobile" className="control-label">
                      Alternative Mobile<span className="required"> *</span> :
                    </label>
                    <span
                      name="alternativeMobile"
                      id="alternativeMobile"
                      type="number"
                      className="form-control"
                    >
                      {customer.alternativeMobile}
                    </span>
                  </div>
                  <span id="last_name_error" className="error"></span>
                </div>
              </div> */}

              {/* <div className="col-sm-6">
                <label htmlFor="gender" className="control-label">
                  Gender<span className="required">* </span> :
                </label>
                <span className="form-control" name="gender">
                  {customer.gender}
                </span>
              </div> */}

              <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-line">
                    <label htmlFor="dateOfBirth" className="control-label">
                      <span className="required"> Date Of Birth *</span> :
                    </label>
                    <span
                      name="dateOfBirth"
                      id="dateOfBirth"
                      type="date"
                      className="form-control"
                    >
                      {customer.dateOfBirth}
                    </span>
                  </div>
                  <span id="last_name_error" className="error"></span>
                </div>
              </div>

              {/* <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-line">
                    <label htmlFor="aadharNumber" className="control-label">
                      Aadhar Number<span className="required"> *</span> :
                    </label>
                    <span
                      name="aadharNumber"
                      id="aadharNumber"
                      type="number"
                      className="form-control"
                    >
                      {customer.aadharNumber}
                    </span>
                  </div>
                  <span id="last_name_error" className="error"></span>
                </div>
              </div> */}
            </div>
            <div className="row clearfix">
              {/* <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-line">
                    <label htmlFor="address" className="control-label">
                      Address<span className="required"> *</span> :
                    </label>
                    <span
                      name="address"
                      id="address"
                      type="text"
                      className="form-control"
                    >
                      {customer.address}
                    </span>
                  </div>
                  <span id="address_error" className="error"></span>
                </div>
              </div> */}
              <div className="col-sm-6">
                <label htmlFor="company_name" className="control-label">
                  Country<span className="required">* </span> :
                </label>
                <span className="form-control" name="country">
                  {customer.country}
                </span>
              </div>
              <div className="col-sm-6">
                <label htmlFor="company_name" className="control-label">
                  State<span className="required">* </span> :
                </label>
                <span className="form-control" name="states">
                  {customer.state}
                </span>
              </div>
              <div className="col-sm-6">
                <label htmlFor="company_name" className="control-label">
                  City<span className="required">* </span> :
                </label>
                <span name="city">{customer.city}</span>
              </div>

              {/* <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-line">
                    <label htmlFor="emergencyName" className="control-label">
                      Emergency Name<span className="required"> *</span> :
                    </label>
                    <span
                      name="emergencyName"
                      id="emergencyName"
                      type="text"
                      className="form-control"
                    >
                      {customer.emergencyName}
                    </span>
                  </div>
                  <span id="address_error" className="error"></span>
                </div>
              </div> */}

              {/* <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-line">
                    <label htmlFor="emergencyContact" className="control-label">
                      Emergency Contact<span className="required"> *</span> :
                    </label>
                    <span
                      name="emergencyContact"
                      id="emergencyContact"
                      type="number"
                      className="form-control"
                    >
                      {customer.emergencyContact}
                    </span>
                  </div>
                  <span id="address_error" className="error"></span>
                </div>
              </div> */}

              {/* <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-line">
                    <label htmlFor="emergencyRelation" className="control-label">
                      Emergency Relation<span className="required"> *</span> :
                    </label>
                    <span
                      name="emergencyRelation"
                      id="emergencyRelation"
                      className="form-control"
                    >
                      {customer.emergencyRelation}
                    </span>
                  </div>
                  <span id="address_error" className="error"></span>
                </div>
              </div> */}

              {/* <div className="col-sm-6">
                <div className="form-group mt-3">
                  <div className="form-line">
                    <label htmlFor="emergencyRelation" className="control-label">
                      Marriage status
                    </label>
                    <div className="">
                      <span className="form-control">
                        {customer.isMarried ? 'Married' : 'Unmarried'}
                      </span>
                    </div>
                  </div>
                  <span id="address_error" className="error"></span>
                </div>
              </div> */}

              <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-line">
                    <label
                      htmlFor="dateOfAnniversary"
                      className="control-label"
                    >
                      <span className="required"> Date Of Anniversary</span> :
                    </label>
                    <span
                      name="dateOfAnniversary"
                      id="dateOfAnniversary"
                      type="date"
                      className="form-control"
                    >
                      {customer.dateOfAnniversary}
                    </span>
                  </div>
                  <span id="last_name_error" className="error"></span>
                </div>
              </div>
            </div>

            <br />
          </form>
        </div>
      </div>
    </>
  );
}

export default View;
