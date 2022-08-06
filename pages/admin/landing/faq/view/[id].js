import React, { useEffect, useState } from "react";

// library
import { Button, Card, Table } from "react-bootstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getLandingPageDetails } from "redux/actions";

const ViewFAQ = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const inclusions = useSelector((state) => state.landing);
  const [data, setData] = useState({});

  useEffect(() => {
    if (router.query.list) dispatch(getLandingPageDetails(router.query.list));
  }, [router.query.list]);

  useEffect(() => {
    props.setTitle("View FAQ");
  }, []);

  useEffect(() => {
    if (inclusions?.faq?.length > 0) {
      setData(inclusions.faq.filter(item => item._id === router.query.id));
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
            FAQ Page Details
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
                  Question
                </th>
                <td className="text-capital">{data?.length > 0 && data[0]?.question || ""}</td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Answer
                </th>
                <td className="text-capital">{data?.length > 0 && data[0]?.answer || ""}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};
export default ViewFAQ;
