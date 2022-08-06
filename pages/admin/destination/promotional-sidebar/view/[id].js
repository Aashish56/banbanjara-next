import React, { useEffect, useState } from "react";

// library
import { Button, Card, Table } from "react-bootstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getDestionDetails } from "redux/actions";

const ViewDestination = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const inclusions = useSelector((state) => state.destination);
  const [data, setData] = useState({});

  useEffect(() => {
    if (router.query.list) dispatch(getDestionDetails(router.query.list));
  }, [router.query.list]);

  useEffect(() => {
    props.setTitle("View Promotional Side Bar Page");
  }, []);

  useEffect(() => {
    if (inclusions?.pormotionalSidebar?.length > 0) {
      setData(inclusions.pormotionalSidebar.filter(item => item._id === router.query.id));
    }
  }, [inclusions]);

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
            Promotional Side Bar Page Details
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
                <td className="text-capital">
                  <img src={data?.length > 0 && `${window.location.origin}/${data[0]?.image}`} height={100} width={100} />
                </td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Link
                </th>
                <td>{data?.length > 0 && data[0]?.link || ""}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      {/* <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Inclusion Details</span>
          <Button
            variant="primary"
            style={{ width: 100 }}
            onClick={router.back}
          >
            <i style={{ fontSize: 12 }} className="bi bi-arrow-left"></i>
            {"Back "}
          </Button>
        </div>
        <Row>
          <Col xl={12} lg={12} className="image-col"></Col>
        </Row>
      </div> */}
    </>
  );
};
export default ViewDestination;
