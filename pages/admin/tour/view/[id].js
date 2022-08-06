import React, { useEffect } from "react";

// library
import { Button, Card, Table } from "react-bootstrap";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import moment from "moment";
import { Buffer } from "buffer";

const ViewTour = (props) => {
  const router = useRouter();

  const allData = useSelector((state) => state.tours);
  const data = allData.find((it) => it._id === router.query.id);
  // console.log("view", data);
  useEffect(() => {
    props.setTitle("View Tour");
  }, []);
  const TRUE_ARRAY = [true, "true"];
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
            Tour Details
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
              {/* <tr>
                <th className="fw-bold" width="20%">
                  Basic Details
                </th>
                <td></td>
              </tr> */}
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
                    href={"`uploads/tour/" + data?.cardImage}
                    className="items-image"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={"uploads/tour/" + data?.cardImage}
                      alt={data?.title || ""}
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
                  Product Title
                </th>
                <td className="text-capital">{data?.title || ""}</td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Vender Name
                </th>
                <td className="text-capital">
                  {data?.venderName?.label || "N/A"}
                </td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Booking Confirmation
                </th>
                <td>{data?.bookingConfirmation || "N/A"}</td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Lead Time
                </th>
                <td className="text-capital">{data?.leadTime || "N/A"}</td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Video Type
                </th>
                <td className="text-capital">{data?.videoType || "N/A"}</td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Video ID
                </th>
                <td className="text-capital">{data?.videoId || "N/A"}</td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  BBJ Cashback
                </th>
                <td className="text-capital">
                  {data?.flags && Array.isArray(data?.flags)
                    ? data?.flags?.includes("BBJ Cashback")
                      ? "YES"
                      : "NO"
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  BBJ Approved
                </th>
                <td className="text-capital">
                  {data?.flags && Array.isArray(data?.flags)
                    ? data?.flags?.includes("BBJ Approved")
                      ? "YES"
                      : "NO"
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Best Seller
                </th>
                <td className="text-capital">
                  {data?.flags && Array.isArray(data?.flags)
                    ? data?.flags?.includes("Best Seller	")
                      ? "YES"
                      : "NO"
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Currency
                </th>
                <td>INR</td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Month Type
                </th>
                <td>{data?.monthType || ""}</td>
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
                  Tour Type
                </th>
                <td>{data?.tourType || ""}</td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Stay
                </th>
                <td>
                  <span
                    style={
                      TRUE_ARRAY?.includes(data?.stay)
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
                    {TRUE_ARRAY?.includes(data?.stay)
                      ? "Checked"
                      : "Un-Checked"}
                  </span>
                </td>
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
                  {data?.description ? (
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
                  )}
                </td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Modified
                </th>
                <td>
                  {data?.updated
                    ? moment(data?.updated).format("MM/DD/YYYY hh:mm a")
                    : null}
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};
export default ViewTour;
