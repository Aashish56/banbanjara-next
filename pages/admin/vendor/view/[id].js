import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Customer from "../../../../components/Customer";

function VendorView(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  // const initialState = {
  //   firstName: '',
  //   lastName: '',
  //   companyName: '',
  //   country: '',
  //   state: '',
  //   city: '',
  //   email: '',
  //   secondaryAddress: '',
  //   mobile: '',
  //   secondaryMobile: '',
  //   designation: '',
  //   profileImage: '',
  //   bankName: '',
  //   bankAccountHolderName: '',
  //   bankAccountNumber: '',
  //   bankBranchName: '',
  //   bankIFSCode: '',
  //   iban: '',
  //   swiftCode: '',
  //   pan: '',
  //   serviceTaxNumber: '',
  //   paymentTerms: '',
  //   operationCountry: '',
  //   operationState: '',
  //   operationCity: '',

  // };
  // const [vendor, setVendor] = useState(initialState);

  const vendors = useSelector((state) => state.vendor);

  const vendor = vendors.find((it) => it._id === router.query.id);

  const imageChange = () => {};

  // useEffect(() => {
  //   const vendor = vendors.find((it) => it._id === router.query.id);
  //   console.log(vendor);
  //   if (vendor) {
  //     setVendor(vendor);
  //     console.log(vendor?.profileImage[0]?.path)
  //   }
  // }, [vendors]);

  return (
    <>
      <div style={{ margin: "20px" }}>
        <Card>
          <Card.Header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: "700", fontSize: "15px" }}>
              Personal Details
            </span>
            <Button
              variant="primary"
              style={{ width: 100 }}
              onClick={router.back}
            >
              <i style={{ fontSize: 12 }} className="bi bi-arrow-left"></i>
              {" Back"}
            </Button>
          </Card.Header>
          <Card.Body>
            <Table bordered hover>
              <tbody>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    Image
                  </th>
                  <td>
                    <a
                      href={vendor?.profileImage?.[0].path}
                      className="items-image"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={vendor?.profileImage?.[0].path}
                        alt={vendor?.name || "N/A"}
                        className="img-thumbnail"
                        style={{ width: "50px" }}
                      />
                    </a>
                  </td>
                </tr>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    Full Name
                  </th>
                  <td>{vendor?.firstName + " " + vendor?.lastName || "N/A"}</td>
                </tr>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    Company Name
                  </th>
                  <td>{vendor?.companyName || "N/A"}</td>
                </tr>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    Country Name
                  </th>
                  <td>{vendor?.country || "N/A"}</td>
                </tr>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    State Name
                  </th>
                  <td>{vendor?.state || "N/A"}</td>
                </tr>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    City
                  </th>
                  <td>{vendor?.city || "N/A"}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: "700", fontSize: "15px" }}>
              Contact Details
            </span>
          </Card.Header>
          <Card.Body>
            <Table bordered hover>
              <tbody>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    Email
                  </th>
                  <td>{vendor?.email || "N/A"}</td>
                </tr>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    Secondary Email
                  </th>
                  <td>{vendor?.secondaryAddress || "N/A"}</td>
                </tr>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    Mobile
                  </th>
                  <td>{vendor?.mobile || "N/A"}</td>
                </tr>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    Secondary Mobile
                  </th>
                  <td>{vendor?.secondaryMobile || "N/A"}</td>
                </tr>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    Designation
                  </th>

                  <td>{vendor?.designation || "N/A"}</td>
                </tr>{" "}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: "700", fontSize: "15px" }}>
              Payment Details
            </span>
          </Card.Header>
          <Card.Body>
            <Table bordered hover>
              <tbody>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    Name
                  </th>
                  <td>{vendor?.bankName || "N/A"}</td>
                </tr>{" "}
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    Account Holder
                  </th>
                  <td>{vendor?.bankAccountHolderName || "N/A"}</td>
                </tr>{" "}
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    Account Number
                  </th>
                  <td>{vendor?.bankAccountNumber || "N/A"}</td>
                </tr>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    Branch Name
                  </th>
                  <td>{vendor?.bankBranchName || "N/A"}</td>
                </tr>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    IFSC Code
                  </th>
                  <td>{vendor?.bankIFSCode || "N/A"}</td>
                </tr>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    IBAN
                  </th>
                  <td>{vendor?.iban || "N/A"}</td>
                </tr>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    Swift Code
                  </th>
                  <td>{vendor?.swiftCode || "N/A"}</td>
                </tr>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    PAN Number
                  </th>
                  <td>{vendor?.pan || "N/A"}</td>
                </tr>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    Service Tax Number{" "}
                  </th>

                  <td>{vendor?.serviceTaxNumber || "N/A"}</td>
                </tr>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    Payment Terms{" "}
                  </th>

                  <td>{vendor?.paymentTerms || "N/A"}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: "700", fontSize: "15px" }}>
              Region Operations
            </span>
          </Card.Header>
          <Card.Body>
            <Table bordered hover>
              <tbody>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    Country Name{" "}
                  </th>

                  <td>{vendor?.operationCountry || ""}</td>
                </tr>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    State Name{" "}
                  </th>

                  <td>{vendor?.operationState || ""}</td>
                </tr>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    City Name{" "}
                  </th>

                  <td>{vendor?.operationCity || ""}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>

      {/* <tr>
                <th
                  className="text-right"
                  style={{ textAlign: 'right' }}
                  width="20%"
                >
                  Status
                </th>
                <td>
                  <span
                    style={
                      vendor?.isDisable
                        ? {
                            padding: '5px 10px',
                            color: 'white',
                            backgroundColor: 'green',
                          }
                        : {
                            padding: '5px 10px',
                            color: 'white',
                            backgroundColor: 'red',
                          }
                    }
                  >
                    {vendor?.isDisable ? 'Active' : 'Deactive'}
                  </span>
                </td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: 'right' }}
                  width="20%"
                >
                  Modified
                </th>
                <td>
                  {vendor?.updated
                    ? moment(vendor?.updated).format('MM/DD/YYYY hh:mm a')
                    : null}
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card> */}

      {/* <div className="bg-color">
        <div className="container">
         
              <form
            id="add-user"
            data-submit-btn-id="user-add-btn-id"
            method="post"
            className="on_click_submit"
            role="form"
            encType="mutlipart/form-data"
          >
            <div className="alert alert-info">Personal Details</div>
            <div className="row clearfix">
              <div className="col-sm-12 align-center">
                <div className="form-group add-image">
                  <span
                    name="profileImage"
                    id="profile_image"
                    className="form-control image-input-file"
                    type="file"
                    onChange={imageChange}
                  />
                  <span
                    className="help-inline required profile_image"
                    id="ContentTypeNameSpan"
                  >
                    <div id="pImage">
                      <img
                        src={window.location.origin + "/" + `${vendor.profileImage[0]?.path}`}
                        alt="Profile image"
                        className="profileImage"
                      />
                    </div>
                  </span>
                  <br />
                  <div>
                    <a
                      href="javascript:void(0)"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title=""
                      className="btn bg-teal btn-block btn-sm waves-effect changePhoto"
                      data-original-title="Allowed file extensions :jpg,jpeg,png"
                    >
                      Upload Image
                    </a>
                  </div>
                  <span id="profile_image_error" className="error"></span>
                </div>
              </div>
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
                        {vendor.firstName ?? 'No data'}
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
                        {vendor.lastName ?? 'No data'}
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
                    <label htmlFor="companyName" className="control-label">
                      Company Name<span className="required">* </span> :
                    </label>
                    <span
                      
                      name="companyName"
                      id="companyName"
                      type="text"
                      className="form-control"
                    >
                        {vendor.companyName ?? 'No data'}
                        </span>
                  </div>
                  <span id="company_name_error" className="error"></span>
                </div>
              </div>
              <div className="col-sm-6">
                <label htmlFor="company_name" className="control-label">
                  Country<span className="required">* </span> :
                </label>
                <span
                  name="country"
                  
                  className="form-control"
                >
                    {vendor.country ?? 'No data'}
                </span>
              </div>
            </div>
            <div className="row clearfix">
              <div className="col-sm-6">
                <label className="control-label">
                  State<span className="required">* </span> :
                </label>
                <span
                  name="state"
                  className="form-control"
                  
                >
                 {vendor.state  ?? 'No data' }
                </span>
              </div>
              <div className="col-sm-6">
                <label className="control-label">
                  City<span className="required">* </span> :
                </label>
                <span
                  name="city"
                  className="form-control"
                  
                >
                    {vendor.city ?? 'No data'}
                </span>
              </div>
            </div>
            

            <br />
            <div className="alert alert-info">Contact Details</div>
            <div className="row clearfix">
              <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-line">
                    <label htmlFor="email" className="control-label">
                      Email Address<span className="required">* </span> :
                    </label>
                    <span
                      name="email"
                      id="email"
                      type="text"
                      className="form-control"
                      
                      value={vendor.email ?? 'No data'}
                    />
                  </div>
                  <span id="email_address_error" className="error"></span>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-line">
                    <label htmlFor="secondaryAddress" className="control-label">
                      Secondary Address :
                    </label>
                    <span
                      name="secondaryAddress"
                      id="secondaryAddress"
                      type="text"
                      className="form-control"
                      
                      value={vendor.secondaryAddress ?? 'No data'}
                    />
                  </div>
                  <span id="secondary_address_error" className="error"></span>
                </div>
              </div>
            </div>
            <div className="row clearfix">
              <div className="col-sm-6 country-code-mask">
                <label htmlFor="mobile" className="control-label">
                  Primary Number<span className="required"> *</span> :
                </label>
                <div className="input-group">
                  <span
                    name="mobile"
                    id="mobile"
                    type="number"
                    className="form-control"
                    
                    value={vendor.mobile ?? 'No data'}
                  />
                  <span id="primary_number_error" className="error"></span>
                </div>
              </div>
              <div className="col-sm-6 country-code-mask">
                <label htmlFor="secondaryMobile" className="control-label">
                  Secondary Number :
                </label>
                <div className="input-group">
                  <span
                    name="secondaryMobile"
                    id="secondaryMobile"
                    type="number"
                    className="form-control"
                    value={vendor.secondaryMobile ?? 'No data'}
                    
                  />
                  <span id="phone_error" className="error"></span>
                </div>
              </div>
            </div>
            <div className="row clearfix">
              <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-line">
                    <label htmlFor="designation" className="control-label">
                      Designation<span className="required">* </span> :
                    </label>
                    <span
                      name="designation"
                      id="designation"
                      type="text"
                      className="form-control"
                      value={vendor.designation ?? 'No data'}
                      
                    />
                  </div>
                  <span id="designation_error" className="error"></span>
                </div>
              </div>
            </div>
            <br />
            <div className="alert alert-info">Payment Detail</div>
            <div className="row clearfix">
              <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-line">
                    <label htmlFor="bankName" className="control-label">
                      Name :
                    </label>
                    <span
                      name="bankName"
                      id="bankName"
                      type="text"
                      className="form-control"
                      
                      value={vendor.bankName ?? 'No data'}
                    />
                  </div>
                  <span id="payment_name_error" className="error"></span>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-line">
                    <label htmlFor="bankAccountHolderName" className="control-label">
                      Account Holder :
                    </label>
                    <span
                      name="bankAccountHolderName"
                      id="bankAccountHolderName"
                      value={vendor.bankAccountHolderName ?? 'No data'}
                      type="text"
                      className="form-control"
                      
                    />
                  </div>
                  <span id="account_holder_error" className="error"></span>
                </div>
              </div>
            </div>
            <div className="row clearfix">
              <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-line">
                    <label htmlFor="bankAccountNumber" className="control-label">
                      Account Number :
                    </label>
                    <span
                      name="bankAccountNumber"
                      id="bankAccountNumber"
                      type="text"
                      className="form-control"
                      value={vendor.bankAccountNumber ?? 'No data'}
                      
                    />
                  </div>
                  <span id="account_number_error" className="error"></span>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-line">
                    <label htmlFor="bankBranchName" className="control-label">
                      Branch Name :
                    </label>
                    <span
                      name="bankBranchName"
                      id="bankBranchName"
                      value={vendor.bankBranchName ?? 'No data'}
                      type="text"
                      className="form-control"
                      
                    />
                  </div>
                  <span id="branch_name_error" className="error"></span>
                </div>
              </div>
            </div>
            <div className="row clearfix">
              <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-line">
                    <label htmlFor="bankIFSCode" className="control-label">
                      IFSC Code :
                    </label>
                    <span
                      name="bankIFSCode"
                      id="bankIFSCode"
                      value={vendor.bankIFSCode ?? 'No data'}
                      type="text"
                      className="form-control"
                      
                    />
                  </div>
                  <span id="ifsc_code_error" className="error"></span>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-line">
                    <label htmlFor="iban" className="control-label">
                      IBAN :
                    </label>
                    <span
                      name="iban"
                      id="iban"
                      type="text"
                      className="form-control"
                      
                      value={vendor.iban ?? 'No data'}
                    />
                  </div>
                  <span id="payment_iban_error" className="error"></span>
                </div>
              </div>
            </div>
            <div className="row clearfix">
              <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-line">
                    <label htmlFor="swiftCode" className="control-label">
                      Swift Code :
                    </label>
                    <span
                      name="swiftCode"
                      id="swiftCode"
                      value={vendor.swiftCode ?? 'No data'}
                      type="text"
                      className="form-control"
                      
                    />
                  </div>
                  <span id="swift_code_error" className="error"></span>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-line">
                    <label htmlFor="pan" className="control-label">
                      PAN Number :
                    </label>
                    <span
                      name="pan"
                      id="pan"
                      value={vendor.pan ?? 'No data'}
                      type="text"
                      className="form-control"
                      
                    />
                  </div>
                  <span id="pan_number_error" className="error"></span>
                </div>
              </div>
            </div>
            <div className="row clearfix">
              <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-line">
                    <label htmlFor="serviceTaxNumber" className="control-label">
                      Service Tax Number :
                    </label>
                    <span
                      name="serviceTaxNumber"
                      id="serviceTaxNumber"
                      type="text"
                      value={vendor.serviceTaxNumber ?? 'No data'}
                      className="form-control"
                      
                    />
                  </div>
                  <span id="swift_code_error" className="error"></span>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-line">
                    <label htmlFor="paymentTerms" className="control-label">
                      Payment Terms :
                    </label>
                    <span
                      name="paymentTerms"
                      id="paymentTerms"
                      value={vendor.paymentTerms ?? 'No data'}
                      type="text"
                      className="form-control"
                      
                    />
                  </div>
                  <span id="payment_terms_error" className="error"></span>
                </div>
              </div>
            </div>
            <br />
            <div className="alert alert-info">Region Operations</div>
            <div className="row clearfix">
              <div className="col-sm-6">
                <label htmlFor="operationCountry" className="control-label">
                  Country<span className="required">* </span> :
                </label>
                <span
                  id="operationCountry"
                  name="operationCountry"
                  className="form-control"
                  
                >
                    {vendor.operationCountry ?? 'No data'}
                </span>
              </div>

              <div className="col-sm-6">
                <label htmlFor="operationState" className="control-label">
                  State<span className="required">* </span> :
                </label>
                <span
                  name="operationState"
                  id="operationState"
                  className="form-control"
                  
                >
                    {vendor.operationState ?? 'No data'}
                  
                </span>
              </div>
            </div>
            <div style={{marginBottom:'20px'}} className="row clearfix">
              <div className="col-sm-6">
                <label htmlFor="operationCity" className="control-label">
                  City<span className="required">* </span> :
                </label>
                <span
                  className="form-control"
                  id="operationCity"
                  value={vendor.operationCity ?? 'No data'}
                  
                  name="operationCity"
                ></span>
              </div>
            </div>
           
          </form>

             

        </div>
      </div> */}
    </>
  );
}

export default VendorView;
