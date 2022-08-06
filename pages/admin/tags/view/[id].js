import React, { useEffect } from "react";

// library
import { Button, Card, Table } from "react-bootstrap";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Buffer } from "buffer";
import { Country, State, City } from "country-state-city";
import { getAllTagPage } from "../../../../redux/actions/tagPage";

const ViewTagPage = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const allData = useSelector((state) => state.tagPages);
  const data = allData?.find((it) => it._id === router.query.id);

  useEffect(() => {
    props.setTitle("View Tag Page");

    dispatch(getAllTagPage());
  }, []);

  const TRUE_ARRAY = [true, "true"];

  const selectedCountry = Country?.getAllCountries()?.find(
    (cn) => cn.isoCode === data?.country
  );
  const selectedState = State?.getStatesOfCountry(data?.country)?.find(
    (st) => st.isoCode === data?.state
  );
  const selectedCity = City?.getCitiesOfState(data?.country, data?.state)?.find(
    (ct) => ct.stateCode === data?.city
  );

  //   const productList = useSelector((state) => state.tours);
  //   const userList = useSelector((state) => state.customer);

  //   console.log(productList, userList);

  //   const selectedProduct = productList?.find((p) => p._id === data?.productId);
  //   const selectedUser = userList?.find((u) => u._id === data?.userId);

  return (
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
            Tag Page Details
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
                <td>
                  {data?.selectTag
                    ? data?.selectTag === "tag_1"
                      ? "tag 1"
                      : "tag 2"
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  make as category
                </th>
                <td>
                  {data?.makeAsCategory
                    ? data?.makeAsCategory === checked
                      ? true
                      : false
                    : "N/A"}
                </td>
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
                  meta title
                </th>
                <td className="text-capital">{data?.metaTitle || "N/A"}</td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  meta Keyword
                </th>
                <td className="text-capital">{data?.metaKeyword || "N/A"}</td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  meta description
                </th>
                <td className="text-capital">
                  {data?.metaDescription || "N/A"}
                </td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Image
                </th>
                <td>
                  {data?.image ? (
                    <a
                      href={"`uploads/tagPage/" + data?.image}
                      className="items-image"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={"uploads/tagPage/" + data?.image}
                        alt={data?.title || ""}
                        className="img-thumbnail"
                        style={{ width: "50px" }}
                      />
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Card Image
                </th>
                <td>
                  {data?.image ? (
                    <a
                      href={"`uploads/tagPage/" + data?.cardImage}
                      className="items-image"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={"uploads/tagPage/" + data?.cardImage}
                        alt={data?.title || ""}
                        className="img-thumbnail"
                        style={{ width: "50px" }}
                      />
                    </a>
                  ) : (
                    "N/A"
                  )}
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
                <td>{selectedCountry?.name || "N/A"}</td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  State
                </th>
                <td>{selectedState?.name || "N/A"}</td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  City
                </th>
                <td>{selectedCity?.name || "N/A"}</td>
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
                  {data?.description || "N/A"}
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
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

export default ViewTagPage;
