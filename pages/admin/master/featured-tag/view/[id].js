import React, { useEffect, useState } from "react";

// library
import { Button, Card, Table } from "react-bootstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getFeaturedTag, getLandingPageDetails } from "redux/actions";

const ViewFeaturedTag = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const featuredTag = useSelector((state) => state.featureTagReducer);
    const [data, setData] = useState({});

    useEffect(() => {
        if (router.query.id) dispatch(getFeaturedTag(router.query.id));
    }, [router.query.id]);

    useEffect(() => {
        props.setTitle("View Feature Tags");
    }, []);

    useEffect(() => {
        if (featuredTag) {
            setData(featuredTag);
        }
    }, [featuredTag]);

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
                        Featured Tag Details
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
                                    Icon
                                </th>
                                <td className="text-capital">
                                    {
                                        typeof window != 'undefined' &&
                                        <img src={`${window.location.origin}/${data?.icon}`} height={100} width={100} />
                                    }
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
                                <td className="text-capital">{data?.title || ""}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </>
    );
};
export default ViewFeaturedTag;
