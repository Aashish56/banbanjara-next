import React, { useEffect } from "react";

// library
import { Button, Card, Table } from "react-bootstrap";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import moment from "moment";

const ViewWhatsIncluded = (props) => {
  const router = useRouter();

  const WhatsIncludeds = useSelector((state) => state.whatsIncluded);
  console.log(WhatsIncludeds);
  const WhatsIncluded = WhatsIncludeds.find((it) => it._id === router.query.id);

  useEffect(() => {
    props.setTitle("View Tour Graphics");
  }, []);
  console.log("WhatsIncluded", WhatsIncluded);
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
            Whats Included Details
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
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Image
                </th>
                <td>
                  <a
                    href={window.location.origin + "/" + WhatsIncluded?.image}
                    className="items-image"
                    target="_blank"
                  >
                    <img
                      src={window.location.origin + "/" + WhatsIncluded?.image}
                      alt={WhatsIncluded?.name || ""}
                      className="img-thumbnail"
                      style={{ width: "50px" }}
                    />
                  </a>
                  <i className={`${WhatsIncluded.symbol}`}></i>
                </td>
              </tr> */}
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Text
                </th>
                <td>{WhatsIncluded?.text || ""}</td>
              </tr>
              {/* <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Display Order
                </th>
                <td>{WhatsIncluded?.displayOrder || ""}</td>
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
                      WhatsIncluded?.isDisable
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
                    {WhatsIncluded?.isDisable ? "Active" : "Deactive"}
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
                  {WhatsIncluded?.updated
                    ? moment(WhatsIncluded?.updated).format(
                        "MM/DD/YYYY hh:mm a"
                      )
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
export default ViewWhatsIncluded;
