import React, { useEffect } from "react";

// library
import { Button, Card, Table } from "react-bootstrap";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import moment from "moment";

const View = (props) => {
  const router = useRouter();

  const dataList = useSelector((state) => state.taxes);
  const singleData = dataList.find((it) => it._id === router.query.id);

  useEffect(() => {
    props.setTitle("View Taxes");
  }, []);
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
            Taxes Details
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
                  Name
                </th>
                <td className="text-capital">{singleData?.taxValue || ""}</td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Display Order
                </th>
                <td>N/A</td>
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
                      singleData?.isDisable
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
                    {singleData?.isDisable ? "Active" : "Deactive"}
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
                  {singleData?.updated
                    ? moment(singleData?.updated).format("MM/DD/YYYY hh:mm a")
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
export default View;
