import { useEffect, useState } from "react";
import Main from "../../../components/Main/Main";
import DataTable from "react-data-table-component";

import { Button, Dropdown, Form } from "react-bootstrap";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllCustomers,
  updateCustomerStatus,
  verifyCustomerEmail,
} from "../../../redux/actions/customer";
import MenuLink from "../../../components/MenuLink";
import Search from "../../../components/Search";
import ConfirmModal from "../../../components/ConfirmModal";
import { useRouter } from "next/router";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import DateRangeFilter from "../../../components/DateRangeFilter";

const Customer = (props) => {
  const customers = useSelector((state) => state.customer);
  const [data, setData] = useState(customers);
  const [show, setShow] = useState(false);
  const [confirmModalMessage, setConfirmModalMessage] = useState("");
  const [action, setAction] = useState("");
  const router = useRouter();

  const [currentId, setCurrentId] = useState("");
  const handleClose = () => setShow(false);

  const dispatch = useDispatch();
  // console.log(customers)
  const initialFilter = {
    registerationDate: "",
    name: "",
    email: "",
    mobile: "",
    status: "",
    isEmailVerified: "",
    dateRanges: "",
  };
  const [filters, setFilters] = useState(initialFilter);
  const [showDateRangeFilter, setShowDateRangeFilter] = useState(false);
  const [dateRanges, setDateRanges] = useState(null);

  const showDateFilter = () => {
    setShowDateRangeFilter(true);
  };

  const hideDateFilter = () => {
    setShowDateRangeFilter(false);
  };

  const handleShow = () => setShow(true);
  const changeCustomerStatus = (active, _id) => {
    dispatch(
      updateCustomerStatus({
        _id: _id || currentId,
        active,
      })
    );
  };

  const verifyEmail = (_id) => {
    dispatch(
      verifyCustomerEmail({
        _id: _id || currentId,
      })
    );
  };

  const onChangeDateFilter = (ranges) => {
    console.log(ranges.startDate);
    setDateRanges(ranges);
  };

  const clearDateFilter = () => {
    setFilters((state) => ({ ...state, dateRanges: null }));
  };

  const applyDateRange = () => {
    setFilters((state) => ({ ...state, dateRanges }));
  };

  useEffect(() => {
    setData(customers);
  }, [customers]);

  useEffect(() => {
    props.setTitle("Customer");

    dispatch(getAllCustomers());
  }, []);

  const onFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((state) => ({ ...state, [name]: value }));
  };

  const getFilteredData = () => {
    let data = [];
    if (customers.length) {
      data = customers.filter((customer) => {
        const isMatch = Object.entries(filters).every((arr) => {
          const [key, value] = arr;
          if (value) {
            if (key === "dateRanges") {
              return (
                new Date(customer.customerCreationDate) >
                  new Date(dateRanges.startDate) &&
                new Date(customer.customerCreationDate) <
                  new Date(dateRanges.endDate)
              );
            }

            if (key === "name") {
              let name = customer["firstName"] + " " + customer["lastName"];
              return name.toLowerCase()?.startsWith(value.toLowerCase());
            }

            if (key === "isEmailVerified") {
              if (customer[key]) {
                if (value === "Not Verified") {
                  return false;
                }
              } else if (!customer[key]) {
                if (value === "Verified") {
                  return false;
                }
              }
              return true;
            }

            if (key === "active") {
              if (customer[key]) {
                if (value === "Deactive") {
                  return false;
                }
              } else if (!customer[key]) {
                if (value === "Active") {
                  return false;
                }
              }
              return true;
            }

            if (typeof customer[key] === "string") {
              return customer[key]
                .toLowerCase()
                ?.startsWith(value.toLowerCase());
            }

            return customer[key] === value;
          }
          return true;
        });

        return isMatch;
      });
    }

    setData(data);
  };

  useEffect(() => {
    getFilteredData();
  }, [filters]);

  const removeFilters = () => {
    setFilters(initialFilter);
  };

  const columns = [
    {
      name: "Image",
      selector: (row) => (
        <img
          style={{ width: "20px", height: "30px" }}
          src={window.location.origin + "/" + `${row.profileImage[0].path}`}
        />
      ),
    },
    {
      name: "Name",
      sortable: true,
      selector: (row) => row.firstName + " " + row.lastName,
    },
    // {
    //   name: "Email",
    //   sortable: true,
    //   selector: (row) => row.email,
    // },
    // {
    //   name: "Phone",
    //   selector: (row) => row.mobile,
    // },
    {
      name: "Status",
      selector: (row) => (row.active ? "Active" : "Inactive"),
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
      name: "Email Verify",
      selector: (row) =>
        row.isEmailVerified ? "Email Verified" : "Email Not Verified",
      cell: (row) => (
        <span
          style={
            row.isEmailVerified
              ? {
                  padding: "5px",
                  color: "white",
                  backgroundColor: "green",
                  whiteSpace: "nowrap",
                }
              : {
                  padding: "5px",
                  color: "white",
                  backgroundColor: "red",
                  whiteSpace: "nowrap",
                }
          }
        >
          {row.isEmailVerified ? "Email Verified" : "Email Not Verified"}
        </span>
      ),
    },
    {
      name: "Phone Verify",
      selector: (row) => row.isMobileVerified,
      cell: (row) => (
        <span
          style={
            row.isMobileVerified
              ? {
                  padding: "5px",
                  color: "white",
                  backgroundColor: "green",
                  whiteSpace: "nowrap",
                  fontSize: "12px",
                }
              : {
                  padding: "5px",
                  color: "white",
                  backgroundColor: "red",
                  whiteSpace: "nowrap",
                  fontSize: "12px",
                }
          }
        >
          {row.isMobileVerified ? "Mobile Verified" : "Mobile Not Verified"}
        </span>
      ),
    },
    // {
    //   name: "Total Review",
    //   sortable: true,
    // },
    // {
    //   name: "Registration",
    //   sortable: true,
    //   selector: (row) =>
    //     row.customerCreationDate
    //       ? moment(row.customerCreationDate).format("MM/DD/YYYY hh:mm a")
    //       : null,
    // },
    {
      name: "Actions",
      grow: 2,
      center: true,
      cell: (row) => (
        <Dropdown style={{ border: "1px solid black" }}>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            <span style={{ paddingRight: 10 }}>Action</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
              <MenuLink
                href={`/admin/customer/edit/${row._id}`}
                iconclassName="bi bi-pencil-square"
                menuTitle="Edit"
              />
            </Dropdown.Item>

            <Dropdown.Item>
              <MenuLink
                href={`/admin/customer/view/${row._id}`}
                iconclassName={"bi bi-eye-fill"}
                menuTitle="View"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <MenuLink
                onShow={() => {
                  setCurrentId(row._id);
                  if (row.active) {
                    handleShow();
                    setConfirmModalMessage("You want to deactivate");
                    setAction("customerStatus");
                  } else {
                    changeCustomerStatus(true, row._id);
                  }
                }}
                iconclassName={
                  row.active ? "bi bi-dash-square-dotted" : "bi bi-check"
                }
                menuTitle={row.active ? "Deactivate" : "Activate"}
              />
            </Dropdown.Item>

            {row.isEmailVerified ? null : (
              <Dropdown.Item>
                <MenuLink
                  onShow={() => {
                    setCurrentId(row._id);
                    handleShow();
                    setAction("emailStatus");
                    setConfirmModalMessage("You want to verify customer email");
                  }}
                  iconclassName="bi bi-envelope-check"
                  menuTitle="Email Verify"
                ></MenuLink>
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  const SearchBody = (
    <div style={{ display: "flex" }}>
      <Form
        style={{
          flex: 1,
          display: "flex",
          flexBasis: "50%",
          flexWrap: "wrap",
          rowGap: "1rem",
          columnGap: "3rem",
        }}
      >
        <Form.Group>
          <Form.Control
            onFocus={showDateFilter}
            type="text"
            style={{ minWidth: 300 }}
            placeholder="Search by Registeration Date"
            name="registerationDate"
            onChange={onFilterChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            style={{ minWidth: 300 }}
            placeholder="Search by Name"
            value={filters.name}
            name="name"
            onChange={onFilterChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            style={{ minWidth: 300 }}
            placeholder="Search by Email"
            name="email"
            onChange={onFilterChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            style={{ minWidth: 300 }}
            placeholder="Search by Phone Number"
            onChange={onFilterChange}
            name="mobile"
          />
        </Form.Group>
        <Form.Group>
          <Form.Select
            name="active"
            onChange={onFilterChange}
            style={{ minWidth: 300 }}
          >
            <option>Search by Status</option>
            <option>Active</option>
            <option>Deactive</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Select
            style={{ minWidth: 300 }}
            name="isEmailVerified"
            onChange={onFilterChange}
          >
            <option>Search by Email Status</option>
            <option>Verified</option>
            <option>Not Verified</option>
          </Form.Select>
        </Form.Group>

        <Button
          onClick={removeFilters}
          variant="danger"
          type="reset"
          style={{
            height: "fit-content",
            alignSelf: "center",
            marginLeft: 10,
          }}
        >
          Reset
        </Button>
      </Form>
    </div>
  );

  return (
    <div className="bg-color" style={{ padding: 20 }}>
      <div>
        <Search header="Collapse" body={SearchBody} />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", margin: 10 }}>
        <Button
          variant="primary"
          style={{ width: 100 }}
          onClick={() => {
            router.push("/admin/customer/add");
          }}
        >
          {"Add "}
        </Button>
      </div>

      <Main />

      {showDateRangeFilter && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              rowGap: "10px",
            }}
          >
            <Button variant="primary" onClick={applyDateRange}>
              Apply
            </Button>
            <Button variant="secondary" onClick={hideDateFilter}>
              Close
            </Button>
            <Button variant="secondary" onClick={clearDateFilter}>
              Clear
            </Button>
          </div>
          <DateRangeFilter onChange={onChangeDateFilter} />
        </div>
      )}

      <DataTable columns={columns} data={data} pagination />
      <ConfirmModal
        title="Are you sure?"
        body={confirmModalMessage}
        btn1Text="Ok"
        btn2Text="Cancel"
        onFirst={() => {
          if (action === "emailStatus") {
            verifyEmail();
          } else {
            changeCustomerStatus(false);
          }
        }}
        show={show}
        onClose={handleClose}
      />
    </div>
  );
};

export default Customer;
