import React, { useEffect } from "react";

// library
import { Button, Card, Table } from "react-bootstrap";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Buffer } from "buffer";
import { Country, State, City } from "country-state-city";
import { getAllTours } from "../../../../../redux/actions";
import { getAllCustomers } from "../../../../../redux/actions/customer";

const ViewOffer = (props) => {
  const router = useRouter();
  // const dispatch = useDispatch();

  const allData = useSelector((state) => state.offers);
  const data = allData.find((it) => it._id === router.query.id);
  
  useEffect(() => {
    props.setTitle("View Offer");

    // dispatch(getAllTours());
    // dispatch(getAllCustomers());
  }, []);
  
  // const TRUE_ARRAY = [true, "true"];

  // const selectedCountry = Country?.getAllCountries()?.find((cn) => cn.isoCode === data?.country);
  // const selectedState = State?.getStatesOfCountry(data?.country)?.find((st) => st.isoCode === data?.state);
  // const selectedCity =  City?.getCitiesOfState(data?.country, data?.state)?.find((ct) => ct.stateCode === data?.city);
  
  // const productList = useSelector((state) => state.tours);
  // const userList = useSelector((state) => state.customer);

  // console.log(productList, userList);

  // const selectedProduct = productList?.find((p) => p._id === data?.productId);
  // const selectedUser = userList?.find((u) => u._id === data?.userId);

  console.log('data-', data);

  return (
    <>
      { data &&
      <>
        <Card style={{ margin: "20px" }}>
          <Card.Header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: "700", fontSize: "15px" }}>
              Offer Details
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
                    Type
                  </th>
                  <td>{data?.offerType ? JSON.parse(data?.offerType)?.label : null}</td>
                </tr>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    Title
                  </th>
                  <td className="text-capital">{data?.title || "N/A"}</td>
                </tr>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    Coupon Code
                  </th>
                  <td className="text-capital">
                    {data?.couponCode || "N/A"}
                  </td>
                </tr>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    Usage Limit
                  </th>
                  <td className="text-capital">
                    {data?.usageLimit || "N/A"}
                  </td>
                </tr>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    Product Title
                  </th>
                  <td>{data?.product ? JSON.parse(data?.product)?.title : "N/A"}</td>
                </tr>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    User Name
                  </th>
                  <td>{data?.user ? JSON.parse(data?.user)?.firstName + ' ' + JSON.parse(data?.user)?.lastName : "N/A"}</td>
                </tr>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    Discount
                  </th>
                  <td>{
                    data?.discount 
                    ? data?.discountType === 'Amount'
                      ? 'Rs. ' + data?.discount 
                      : data?.discount + '%' 
                    : "N/A"}</td>
                </tr>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    Validity Type
                  </th>
                  <td>{data?.validity || "N/A"}</td>
                </tr>

                { data?.validity === 'Custom' &&
                  <>
                    <tr>
                      <th
                        className="text-right"
                        style={{ textAlign: "right" }}
                        width="20%"
                      >
                        Validity Start Date
                      </th>
                      <td>{data?.validityStartDate
                      ? moment(data?.validityStartDate).format("DD/MM/YYYY")
                      : 'N/A'}</td>
                    </tr>

                    <tr>
                      <th
                        className="text-right"
                        style={{ textAlign: "right" }}
                        width="20%"
                      >
                        Validity End Date
                      </th>
                      <td>{data?.validityEndDate
                      ? moment(data?.validityEndDate).format("DD/MM/YYYY")
                      : 'N/A'}</td>
                    </tr>
                  </>
                }
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    Image
                  </th>
                  <td>
                    { data?.image ?
                      <a
                        href={"`uploads/offers/" + data?.image}
                        className="items-image"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={"uploads/offers/" + data?.image}
                          alt={data?.title || ""}
                          className="img-thumbnail"
                          style={{ width: "50px" }}
                        />
                      </a>
                    : "N/A"
                    }
                  </td>
                </tr>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    Country
                  </th>
                  <td>{data?.country ? JSON.parse(data?.country)?.name : "N/A"}</td>
                </tr>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    State
                  </th>
                  <td>{data?.state ? JSON.parse(data?.state)?.name : "N/A"}</td>
                </tr>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    City
                  </th>
                  <td>{data?.city ? JSON.parse(data?.city)?.name : "N/A"}</td>
                </tr>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    Description
                  </th>
                  <td>
                    { data?.description || "N/A"}
                    {/* {data?.description ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: Buffer.from(
                            `${data?.description}`,
                            "base64"
                          ).toString("ascii"),
                        }}
                      />
                    ) : (
                      "N/A"
                    )} */}
                  </td>
                </tr>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    Status
                  </th>
                  <td>
                    <span
                      style={
                        data?.isDisable
                          ? {
                              padding: "5px 10px",
                              color: "white",
                              backgroundColor: "green",
                            }
                          : {
                              padding: "5px 10px",
                              color: "white",
                              backgroundColor: "red",
                            }
                      }
                    >
                      {data?.isDisable ? "Active" : "Deactive"}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th
                    className="text-right"
                    style={{ textAlign: "right" }}
                    width="20%"
                  >
                    Created
                  </th>
                  <td>
                    {data?.created
                      ? moment(data?.created).format("MM/DD/YYYY hh:mm a")
                      : 'N/A'}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </>
      }
    </>
  );
};

export default ViewOffer;
