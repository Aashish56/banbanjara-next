import React, { useEffect } from "react";

// library
import { Button, Card, Table } from "react-bootstrap";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Buffer } from "buffer";
import { Country, State, City } from "country-state-city";
import { getAllCollection } from "../../../../redux/actions/collection";

const ViewCollection = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const allData = useSelector((state) => state.collections);
  const data = allData?.find((it) => it._id === router.query.id);

  useEffect(() => {
    props.setTitle("View collection");

    dispatch(getAllCollection());
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
            Collection Details
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
                  {data?.selectCard
                    ? data?.selectCard === "card_1"
                      ? "card 1"
                      : "card 2"
                      ? "card 3"
                      : "card 4"
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
                  Related Article
                </th>
                <td className="text-capital">{data?.metaTitle || "N/A"}</td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Distance From Destination
                </th>
                <td className="text-capital">{data?.distanceFromDestination || "N/A"}</td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Description
                </th>
                <td className="text-capital">
                  {data?.description || "N/A"}
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
                      href={"`uploads/collection/" + data?.image}
                      className="items-image"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={"uploads/collection/" + data?.image}
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
                  Related Article Image
                </th>
                <td>
                  {data?.image ? (
                    <a
                      href={"`uploads/tagPage/" + data?.relatedArticleImage}
                      className="items-image"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={"uploads/tagPage/" + data?.relatedArticleImage}
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

export default ViewCollection;
