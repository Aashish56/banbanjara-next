import React, { useState, useEffect } from "react";
// library
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Form } from "react-bootstrap";
import { useRouter } from "next/router";
// redux
// import { updateThemesStatus } from "../../../redux/actions";
// components
import MenuLink from "components/MenuLink";
import ConfirmModal from "components/ConfirmModal";
import Search from "components/Search";
import { getAllFeaturedTag } from "redux/actions";

const LandingPage = (props) => {
    const [show, setShow] = useState(false);
    const [searchName, setSearchName] = useState("");
    const [selectStatus, setSelectStatus] = useState("");
    const [currentId, setCurrentId] = useState("");
    const [featureTagData, setFeatureTagData] = useState([]);
    const [data, setData] = useState([]);

    const router = useRouter();
    useEffect(() => {
        props.setTitle("Featured Tag");
    }, []);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const changeStatus = (_id, isDisable) => {
    //     dispatch(
    //         updateThemesStatus({
    //             _id: _id || currentId,
    //             isDisable: isDisable,
    //         })
    //     );
    // };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllFeaturedTag());
    }, []);
    const featureTagList = useSelector((state) => state.featureTagReducer);

    useEffect(() => {
        if (featureTagList?.length > 0) {
            setData(featureTagList);
            setFeatureTagData(featureTagList);
        }
    }, [featureTagList]);

    useEffect(() => {
        try {
            var filterData = [];
            if (searchName && selectStatus) {
                filterData = landigData
                    ?.filter((a) => {
                        return a.name.toLowerCase().includes(searchName?.toLowerCase());
                    })
                    ?.filter((a) => {
                        return a.isDisable?.toString() === selectStatus;
                    });
            } else if (searchName && !selectStatus) {
                filterData = data?.filter((a) => {
                    return a.title.toLowerCase().includes(searchName?.toLowerCase());
                });
            } else if (selectStatus && !searchName) {
                filterData = landigData?.filter((a) => {
                    return a.isDisable?.toString() === selectStatus;
                });
            } else {
                filterData = featureTagData;
            }
            setData(filterData);
        } catch (error) {
            console.log(error);
        }
    }, [searchName, selectStatus]);

    const columns = [
        {
            name: "Title",
            sortable: true,
            selector: (row) => <span className="text-capital">{row?.title}</span>,
        },
        {
            name: "Action",
            sortable: false,
            cell: (row) => (
                <Dropdown style={{ border: "1px solid black" }}>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        <span style={{ paddingRight: 10 }}>Action</span>
                        {/* <i className="bi bi-arrow-down-short"></i> */}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <MenuLink
                                href={`/admin/master/featured-tag/update/${row._id}`}
                                iconclassName="bi bi-pencil-square"
                                menuTitle="Edit"
                            />
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <MenuLink
                                href={`/admin/master/featured-tag/view/${row._id}`}
                                iconclassName="bi bi-search"
                                menuTitle="View"
                            />
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            ),
        },
    ];
    const handleReset = () => {
        setSearchName("");
        setSelectStatus("");
    };
    const SearchBody = (
        <div style={{ display: "flex" }}>
            <Form style={{ display: "flex", justifyContent: "space-between" }}>
                <Form.Group>
                    <Form.Control
                        type="text"
                        style={{ minWidth: 300 }}
                        placeholder="Search by Title"
                        value={searchName || ""}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                </Form.Group>
                <Button
                    variant="danger"
                    type="reset"
                    style={{ height: "fit-content", alignSelf: "center", marginLeft: 10 }}
                    onClick={() => handleReset()}
                >
                    Reset
                </Button>
            </Form>
        </div>
    );

    return (
        <>
            <div style={{ margin: 10 }}>
                <Search header="Collapse" body={SearchBody} />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", margin: 10 }}>
                <Button
                    variant="primary"
                    style={{ width: 100 }}
                    onClick={() => {
                        router.push("/admin/master/featured-tag/add");
                    }}
                >
                    {"Add "}
                    <i style={{ fontSize: 12 }} className="bi bi-plus-square"></i>
                </Button>
            </div>
            <div style={{ margin: 10 }}>
                {!data && <div style={{ textAlign: "center" }}>Loading...</div>}
                {data && Array.isArray(data) && (
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination
                        noDataComponent="No Records Found !"
                        persistTableHead
                    />
                )}
            </div>
            <ConfirmModal
                title="Are you sure?"
                body="You want to deactivate"
                btn1Text="Ok"
                btn2Text="Cancel"
                // onFirst={() => {
                //     changeStatus(currentId, false);
                // }}
                show={show}
                onClose={handleClose}
            />
        </>
    );
};

export default LandingPage;
