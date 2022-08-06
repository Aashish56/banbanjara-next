import React, { useState, useEffect } from "react";

// library
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Form } from "react-bootstrap";
import { useRouter } from "next/router";

// components
import MenuLink from "../../../components/MenuLink";
import ConfirmModal from "../../../components/ConfirmModal";
import Search from "../../../components/Search";
import { getAllDestination, updateDestination } from "redux/actions/destination";

const DestinationPage = (props) => {
  const [show, setShow] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [selectStatus, setSelectStatus] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [landigData, setLandingData] = useState([]);
  const [data, setData] = useState([]);

  const router = useRouter();
  useEffect(() => {
    props.setTitle("Destination Page");
  }, []);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const changeStatus = (_id, isDisable) => {
    dispatch(
      updateDestination({ isDisable: !isDisable }, _id)
    );
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDestination());
  }, []);
  const destinationList = useSelector((state) => state.destination.allDestination);

  useEffect(() => {
    if (destinationList?.length > 0) {
      setData(destinationList);
      setLandingData(destinationList);
    }
  }, [destinationList]);

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
        filterData = landigData?.filter((a) => {
          return a.title.toLowerCase().includes(searchName?.toLowerCase());
        });
      } else if (selectStatus && !searchName) {
        filterData = landigData?.filter((a) => {
          return a.isDisable?.toString() === selectStatus;
        });
      } else {
        filterData = landigData;
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
      selector: (row) => <span className="text-capital">
        {row?.title?.length > 60 ? row?.title?.substring(0, 60) : row?.title}
      </span>,
    },
    {
      name: "Overview",
      sortable: true,
      selector: (row) => <span className="text-capital">
        {row?.overview?.length > 60 ? row?.overview?.substring(0, 60) : row?.overview}
      </span>,
    },
    {
      name: "URL",
      sortable: true,
      selector: (row) => <a href={typeof window != 'undefined' && `${window.location.origin}/destination/${row?.title?.toLowerCase().split(' ').join('-')}`}>
        {typeof window != 'undefined' && `${window.location.origin}/destination/${row?.title?.toLowerCase().split(' ').join('-')}`}
      </a>
    },
    {
      name: "Status",
      sortable: true,
      selector: (row) => (!row.isDisable ? "Active" : "Deactive"),
      cell: (row) => (
        <span
          style={
            !row.isDisable
              ? {
                  padding: "5px 10px",
                  color: "white",
                  backgroundColor: "green",
                }
              : { padding: "5px 10px", color: "white", backgroundColor: "red" }
          }
        >
          {!row.isDisable ? "Active" : "Deactive"}
        </span>
      ),
    },
    {
      name: "Action",
      sortable: false,
      cell: (row) => (
        <Dropdown style={{ border: "1px solid black" }}>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            <span style={{ paddingRight: 10 }}>Action</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
              <MenuLink
                href={`/admin/destination/edit/${row._id}`}
                iconclassName="bi bi-pencil-square"
                menuTitle="Edit"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <MenuLink
                onShow={() => {
                  setCurrentId(row._id);
                  if (!row.isDisable) {
                    handleShow();
                  } else {
                    changeStatus(row._id, true);
                  }
                }}
                iconclassName={
                  !row.isDisable ? "bi bi-dash-square-dotted" : "bi bi-check"
                }
                menuTitle={!row.isDisable ? "Deactivate" : "Activate"}
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <MenuLink
                href={`/admin/destination/promotional-sidebar/${row._id}`}
                iconclassName="bi bi-pencil-square"
                menuTitle="Manage Promotional Side Bar"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <MenuLink
                href={`/admin/destination/explore/${row._id}`}
                iconclassName="bi bi-pencil-square"
                menuTitle="Manage Explore Near By"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <MenuLink
                href={`/admin/destination/review/${row._id}`}
                iconclassName="bi bi-pencil-square"
                menuTitle="Manage Review"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <MenuLink
                href={`/admin/destination/faq/${row._id}`}
                iconclassName="bi bi-pencil-square"
                menuTitle="Manage FAQ"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <MenuLink
                href={`/admin/destination/general-info/${row._id}`}
                iconclassName="bi bi-pencil-square"
                menuTitle="Manage General Info"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <MenuLink
                href={`/admin/destination/weather/${row._id}`}
                iconclassName="bi bi-pencil-square"
                menuTitle="Manage Weather"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <MenuLink
                href={`/admin/destination/view/${row._id}`}
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
    // setData(themesList);
  };
  const SearchBody = (
    <div style={{ display: "flex" }}>
      <Form style={{ display: "flex", justifyContent: "space-between" }}>
        <Form.Group>
          {/* <Form.Label></Form.Label> */}
          <Form.Control
            type="text"
            style={{ minWidth: 300 }}
            placeholder="Search by Title"
            value={searchName || ""}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </Form.Group>
        {/* <Form.Group style={{ marginLeft: 10 }}>
          <Form.Select
            value={selectStatus || ""}
            onChange={(e) => setSelectStatus(e.target.value)}
            name="status"
          >
            <option value="">Search By Status</option>
            <option value={true}>Active</option>
            <option value={false}>Deactive</option>
          </Form.Select>
        </Form.Group> */}
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
            router.push("/admin/destination/add");
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
        onFirst={() => {
          changeStatus(currentId, false);
        }}
        show={show}
        onClose={handleClose}
      />
    </>
  );
};

export default DestinationPage;
