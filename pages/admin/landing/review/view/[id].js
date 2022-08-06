import React, { useEffect, useState } from "react";

// library
import { Button, Card, Table } from "react-bootstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getLandingPageDetails } from "redux/actions";

const ViewLanding = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const inclusions = useSelector((state) => state.landing);
  const [data, setData] = useState({});

  useEffect(() => {
    if (router.query.list) dispatch(getLandingPageDetails(router.query.list));
  }, [router.query.list]);

  useEffect(() => {
    props.setTitle("View Reviews");
  }, []);

  useEffect(() => {
    if (inclusions?.reviews?.length > 0) {
      setData(inclusions.reviews.filter(item => item._id === router.query.id));
    }
  }, [inclusions]);

  console.log(data);

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
            Review Page Details
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
                  Rating
                </th>
                <td className="text-capital">{data?.length > 0 && data[0]?.rating || ""}</td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Comment
                </th>
                <td className="text-capital">{data?.length > 0 && data[0]?.comment || ""}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};
export default ViewLanding;
