import React, { useState, useEffect } from "react";
// library
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Form } from "react-bootstrap";
import { useRouter } from "next/router";
import moment from "moment";
// components
import MenuLink from "../../../components/MenuLink";
import ConfirmModal from "../../../components/ConfirmModal";
import Search from "../../../components/Search";
import {
  getAllPolicies,
  updatePoliciesStatus,
} from "../../../redux/actions/policies";

const Policies = (props) => {
  const [show, setShow] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [selectStatus, setSelectStatus] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [data, setData] = useState(null);

  const router = useRouter();
  useEffect(() => {
    props.setTitle("Policies");
  }, []);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const changeStatus = (_id, isDisable) => {
    dispatch(
      updatePoliciesStatus({
        _id: _id || currentId,
        isDisable: isDisable,
      })
    );
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPolicies());
  }, []);
  const policiesList = useSelector((state) => state.policies);

  useEffect(() => {
    setData(policiesList);
  }, [policiesList]);

  useEffect(() => {
    try {
      var filterData = [];
      if (searchName && selectStatus) {
        filterData = policiesList
          ?.filter((a) => {
            return a.text.toLowerCase().includes(searchName?.toLowerCase());
          })
          ?.filter((a) => {
            return a.isDisable?.toString() === selectStatus;
          });
      } else if (searchName && !selectStatus) {
        filterData = policiesList?.filter((a) => {
          return a.text.toLowerCase().includes(searchName?.toLowerCase());
        });
      } else if (selectStatus && !searchName) {
        filterData = policiesList?.filter((a) => {
          return a.isDisable?.toString() === selectStatus;
        });
      } else {
        filterData = policiesList;
      }
      setData(filterData);
    } catch (error) {
      console.log(error);
    }
  }, [searchName, selectStatus]);

  const columns = [
    {
      name: "Symbol",
      sortable: false,
      selector: (row) =>
        row.symbol ? <i className={`${row.symbol}`}></i> : null,
    },
    {
      name: "Title",
      sortable: true,
      selector: (row) => <span className="text-capital">{row.text}</span>,
    },
    {
      name: "Display Order",
      sortable: true,
      selector: (row) => row.displayOrder,
    },
    {
      name: "Status",
      sortable: true,
      selector: (row) => (row.isDisable ? "Inactive" : "Active"),
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
          {row.isDisable ? "Inactive" : "Active"}
        </span>
      ),
    },
    {
      name: "Modified",
      sortable: false,
      selector: (row) =>
        row.updated ? moment(row.updated).format("MM/DD/YYYY hh:mm a") : null,
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
                href={`/admin/policies/edit/${row._id}`}
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
                    changeStatus(row._id, false);
                  }
                }}
                iconclassName={
                  row.isDisable ? "bi bi-dash-square-dotted" : "bi bi-check"
                }
                menuTitle={row.isDisable ? "Activate" : "Deactivate"}
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <MenuLink
                href={`/admin/policies/view/${row._id}`}
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
    setData(policiesList);
  };
  const SearchBody = (
    <div style={{ display: "flex" }}>
      <Form style={{ display: "flex", justifyContent: "space-between" }}>
        <Form.Group>
          {/* <Form.Label></Form.Label> */}
          <Form.Control
            type="text"
            style={{ minWidth: 300 }}
            placeholder="Search by Name"
            value={searchName || ""}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </Form.Group>
        <Form.Group style={{ marginLeft: 10 }}>
          <Form.Select
            value={selectStatus || ""}
            onChange={(e) => setSelectStatus(e.target.value)}
            name="status"
          >
            <option value="">Search By Status</option>
            <option value={false}>Active</option>
            <option value={true}>Deactive</option>
          </Form.Select>
        </Form.Group>
        <Button
          variant="danger"
          type="reset"
          style={{ height: "fit-content", alignSelf: "center", marginLeft: 10 }}
          onClick={handleReset}
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
            router.push("/admin/policies/add");
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
          changeStatus(currentId, true);
        }}
        show={show}
        onClose={handleClose}
      />
    </>
  );
};
export default Policies;
