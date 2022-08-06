import React, { useEffect } from "react";

// library
import { Button, Card, Table } from "react-bootstrap";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import moment from "moment";

const ViewQuickFact = (props) => {
  const router = useRouter();

  const tourGraphics = useSelector((state) => state.tourGraphic);
  const tourGraphic = tourGraphics.find((it) => it._id === router.query.id);

  useEffect(() => {
    props.setTitle("View Tour Graphics");
  }, []);
  console.log("tourGraphic", tourGraphic);
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
                    href={window.location.origin + "/" + tourGraphic?.image}
                    className="items-image"
                    target="_blank"
                  >
                    <img
                      src={window.location.origin + "/" + tourGraphic?.image}
                      alt={tourGraphic?.name || ""}
                      className="img-thumbnail"
                      style={{ width: "50px" }}
                    />
                  </a> */}
                  <i className={`${tourGraphic?.symbol}`}></i>
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
                <td>{tourGraphic?.text || ""}</td>
              </tr>
              {/* <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Display Order
                </th>
                <td>{tourGraphic?.displayOrder || ""}</td>
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
                      tourGraphic?.isDisable
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
                    {tourGraphic?.isDisable ? "Active" : "Deactive"}
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
                  {tourGraphic?.updated
                    ? moment(tourGraphic?.updated).format("MM/DD/YYYY hh:mm a")
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
export default ViewQuickFact;
