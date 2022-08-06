import React, { useEffect } from "react";

// library
import { Button, Card, Table } from "react-bootstrap";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import moment from "moment";

const ViewTourUSP = (props) => {
  const router = useRouter();

  const tourUSPs = useSelector((state) => state.tourUSP);
  const tourUSP = tourUSPs.find((it) => it._id === router.query.id);

  useEffect(() => {
    props.setTitle("View Tour Graphics");
  }, []);
  console.log("tourUSP", tourUSP);
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
            TourGraphic Details
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
                  {/* <a
                    href={window.location.origin + "/" + tourUSP?.image}
                    className="items-image"
                    target="_blank"
                  >
                    <img
                      src={window.location.origin + "/" + tourUSP?.image}
                      alt={tourUSP?.name || ""}
                      className="img-thumbnail"
                      style={{ width: "50px" }}
                    />
                  </a> */}
                  <i className={`${tourUSP?.symbol}`}></i>
                </td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Text
                </th>
                <td>{tourUSP?.text || ""}</td>
              </tr>
              {/* <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Display Order
                </th>
                <td>{tourUSP?.displayOrder || ""}</td>
              </tr> */}
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
                      tourUSP?.isDisable
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
                    {tourUSP?.isDisable ? "Active" : "Deactive"}
                  </span>
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
                  {tourUSP?.updated
                    ? moment(tourUSP?.updated).format("MM/DD/YYYY hh:mm a")
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
export default ViewTourUSP;
