import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllState,
  updateStateStatus,
  getAllCountries,
} from "../../../redux/actions";
import MenuLink from "../../../components/MenuLink";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import ConfirmModal from "../../../components/ConfirmModal";
import Search from "../../../components/Search";
import { useRouter } from "next/router";
const State = (props) => {
  const [show, setShow] = useState(false);
  const [searchState, setSearchState] = useState("");
  const [currentId, setCurrentId] = useState("");
  const router = useRouter();
  useEffect(() => {
    props.setTitle("State");
  }, []);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const changeStatus = (active, _id) => {
    console.log("currentId", currentId);
    dispatch(
      updateStateStatus({
        _id: _id || currentId,
        active,
      })
    );
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getAllState());
  }, []);
  const states = useSelector((state) => state.state);
  const countries = useSelector((state) => state.country);
  console.log("states", states);
  const data = !searchState
    ? states
    : states.filter((a) => {
        debugger;
        return a.name.toLowerCase().includes(searchState.toLowerCase());
      });

  const columns = [
    {
      name: "State Name",
      sortable: true,
      selector: "name",
      cell: (row) => (
        <span style={{ textTransform: "capitalize" }}>{row.name}</span>
      ),
    },
    {
      name: "Country Name",
      sortable: true,
      selector: (row) => (
        <span style={{ textTransform: "capitalize" }}>
          {countries.find((c) => c._id === row.countryId).name}
        </span>
      ),
    },
    {
      name: "Status",
      sortable: true,
      selector: (row) => (row.active ? "Active" : "Deactive"),
      cell: (row) => (
        <span
          style={
            row.active
              ? {
                  padding: "5px 10px",
                  color: "white",
                  backgroundColor: "green",
                }
              : { padding: "5px 10px", color: "white", backgroundColor: "red" }
          }
        >
          {row.active ? "Active" : "Deactive"}
        </span>
      ),
    },
    {
      name: "Action",
      sortable: true,
      cell: (row) => (
        <Dropdown style={{ border: "1px solid black" }}>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            <span style={{ paddingRight: 10 }}>Action</span>
            {/* <i className="bi bi-arrow-down-short"></i> */}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
              <MenuLink
                href={`/admin/state/edit/${row._id}`}
                iconclassName="bi bi-pencil-square"
                menuTitle="Edit"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <MenuLink
                onShow={() => {
                  setCurrentId(row._id);
                  if (row.active) {
                    handleShow();
                  } else {
                    changeStatus(true, row._id);
                  }
                }}
                iconclassName={
                  row.active ? "bi bi-dash-square-dotted" : "bi bi-check"
                }
                menuTitle={row.active ? "Deactivate" : "Activate"}
              />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];
  const SearchBody = (
    <div style={{ display: "flex" }}>
      <Form style={{ flex: 1, display: "flex", flexBasis: "50%" }}>
        <Form.Group>
          {/* <Form.Label></Form.Label> */}
          <Form.Control
            type="text"
            style={{ minWidth: 300 }}
            placeholder="Search by State Name"
            value={searchState}
            onChange={(e) => setSearchState(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="danger"
          type="reset"
          style={{ height: "fit-content", alignSelf: "center", marginLeft: 10 }}
          onClick={() => setSearchState("")}
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
            router.push("/admin/state/add");
          }}
        >
          {"Add "}
          <i style={{ fontSize: 12 }} className="bi bi-plus-square"></i>
        </Button>
      </div>
      <div style={{ margin: 10 }}>
        <DataTable columns={columns} data={data} pagination />
      </div>
      <ConfirmModal
        title="Are you sure?"
        body="You want to deactivate"
        btn1Text="Ok"
        btn2Text="Cancel"
        onFirst={() => {
          changeStatus(false);
        }}
        show={show}
        onClose={handleClose}
      />
    </>
  );
};

export default State;
