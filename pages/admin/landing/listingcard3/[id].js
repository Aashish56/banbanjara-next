import React, { useState, useEffect } from "react";
// library
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Form } from "react-bootstrap";
import { useRouter } from "next/router";
import moment from "moment";
// redux
import { getAllThemes, updateThemesStatus } from "../../../../redux/actions";
// components
import MenuLink from "../../../../components/MenuLink";
import ConfirmModal from "../../../../components/ConfirmModal";
import Search from "../../../../components/Search";
import { getLandingPageDetails } from "redux/actions/landing";

const LandingPage = (props) => {
  const [show, setShow] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [selectStatus, setSelectStatus] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [data, setData] = useState(null);
  const [listing, setListing] = useState([]);

  const router = useRouter();
  useEffect(() => {
    props.setTitle("Featured Listing Card 3");
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const changeStatus = (_id, isDisable) => {
    dispatch(
      updateThemesStatus({
        _id: _id || currentId,
        isDisable: isDisable,
      })
    );
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (router.query?.id) {
      dispatch(getLandingPageDetails(router.query?.id));
    }
  }, [router.query?.id]);

  const landingList = useSelector((state) => state.landing);

  useEffect(() => {
    if (landingList?.listingCard3) {
      setData(landingList?.listingCard3);
      setListing(landingList?.listingCard3);
    }
  }, [landingList]);

  useEffect(() => {
    try {
      var filterData = [];
      if (searchName && selectStatus) {
        filterData = themesList
          ?.filter((a) => {
            return a.name.toLowerCase().includes(searchName?.toLowerCase());
          })
          ?.filter((a) => {
            return a.isDisable?.toString() === selectStatus;
          });
      } else if (searchName && !selectStatus) {
        filterData = listing?.filter((a) => {
          return a.heading.toLowerCase().includes(searchName?.toLowerCase());
        });
      } else if (selectStatus && !searchName) {
        filterData = themesList?.filter((a) => {
          return a.isDisable?.toString() === selectStatus;
        });
      } else {
        filterData = listing;
      }
      setData(filterData);
    } catch (error) {
      console.log(error);
    }
  }, [searchName, selectStatus]);

  // console.log("data", selectStatus, data);

  const columns = [
    {
      name: "Heading",
      sortable: false,
      selector: (row) => <span className="text-capital">
        {row?.heading?.length > 60 ? row?.heading?.substring(0, 60) : row?.heading}
      </span>,
    },
    {
      name: "Text",
      sortable: true,
      selector: (row) => <span className="text-capital">
        {row?.text?.length > 60 ? row?.text?.substring(0, 60) : row?.text}
      </span>,
    },
    {
      name: "Sub Heading",
      sortable: true,
      selector: (row) => <span className="text-capital">
        {row?.subHeading?.length > 60 ? row?.subHeading?.substring(0, 60) : row?.subHeading}
      </span>,
    },
    // {
    //   name: "Status",
    //   sortable: true,
    //   selector: (row) => (row.isDisable ? "Active" : "Deactive"),
    //   cell: (row) => (
    //     <span
    //       style={
    //         row.isDisable
    //           ? {
    //               padding: "5px 10px",
    //               color: "white",
    //               backgroundColor: "green",
    //             }
    //           : { padding: "5px 10px", color: "white", backgroundColor: "red" }
    //       }
    //     >
    //       {row.isDisable ? "Active" : "Deactive"}
    //     </span>
    //   ),
    // },
    // {
    //   name: "Modified",
    //   sortable: false,
    //   selector: (row) =>
    //     row.updated ? moment(row.updated).format("MM/DD/YYYY hh:mm a") : null,
    // },
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
                href={`/admin/landing/listingcard3/edit/${row._id}?list=${router.query?.id}`}
                iconclassName="bi bi-pencil-square"
                menuTitle="Edit"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <MenuLink
                href={`/admin/landing`}
                iconclassName="bi bi-pencil-square"
                menuTitle="Manage Landing Page"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <MenuLink
                href={`/admin/landing/listingcard3/view/${row._id}?list=${router.query?.id}`}
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
            placeholder="Search by Heading"
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
            router.push(`/admin/landing/listingcard3/add/${router.query?.id}`);
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

export default LandingPage;
