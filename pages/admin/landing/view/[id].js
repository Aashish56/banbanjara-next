import React, { useEffect } from "react";

// library
import { Button, Card, Table } from "react-bootstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getLandingPageDetails } from "redux/actions";

const ViewLanding = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const inclusions = useSelector((state) => state.landing);

  useEffect(() => {
    dispatch(getLandingPageDetails(router.query.id));
  }, [router.query.id]);

  useEffect(() => {
    props.setTitle("View Landing Page");
  }, []);

  console.log(inclusions);

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
            Landing Page Details
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
                  Title
                </th>
                <td className="text-capital">{inclusions?.title || ""}</td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Cover
                </th>
                <td>
                  {typeof window != 'undefined' &&
                    <img src={`${window.location.origin}/${inclusions?.cover}`} height={100} width={100} alt="Cover Image" />
                  }
                </td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Overview
                </th>
                <td>{inclusions?.overview || ""}</td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Country
                </th>
                <td>{inclusions?.country || ""}</td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  State
                </th>
                <td>{inclusions?.state || ""}</td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  City
                </th>
                <td>{inclusions?.city || ""}</td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  How to Go
                </th>
                <td>{inclusions?.howToGo || ""}</td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Featured Tags
                </th>
                <td>
                  {
                    inclusions?.featuredTag?.length > 0 ?
                      inclusions.featuredTag.map((item, index) => {
                        return <div key={index}>
                          {item.title}
                        </div>
                      }) : ''
                  }
                </td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Tour Card 1 Title
                </th>
                <td>{inclusions?.tourCards1Title || ""}</td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Tour Card 2 Title
                </th>
                <td>{inclusions?.tourCards2Title || ""}</td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Tour Card 1
                </th>
                <td>
                  {
                    inclusions?.tourCards1?.length > 0 ?
                      inclusions.tourCards1.map((item, index) => {
                        return <div key={index}>
                          {item.title}
                        </div>
                      }) : ''
                  }
                </td>
              </tr>
              <tr>
                <th
                  className="text-right"
                  style={{ textAlign: "right" }}
                  width="20%"
                >
                  Tour Card 2
                </th>
                <td>
                  {
                    inclusions?.tourCards2?.length > 0 ?
                      inclusions.tourCards2.map((item, index) => {
                        return <div key={index}>
                          {item.title}
                        </div>
                      }) : ''
                  }
                </td>
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
export default ViewLanding;
