import { useEffect, useState } from "react";
// import Main from "../../../components/Main/Main";
import DataTable from "react-data-table-component";

import { Button, Dropdown, Form } from "react-bootstrap";
import DateRangeFilter from "../../../components/DateRangeFilter";

import MenuLink from "../../../components/MenuLink";
import Search from "../../../components/Search";
import ConfirmModal from "../../../components/ConfirmModal";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllVendors,
  updateVendorOnBoardStatus,
  updateVendorStatus,
} from "../../../redux/actions/vendor";
import moment from "moment";
const Index = (props) => {
  const vendors = useSelector((state) => state.vendor);
  const [confirmModalMessage, setConfirmModalMessage] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const [data, setData] = useState(vendors);

  const [showDateRangeFilter, setShowDateRangeFilter] = useState(false);
  const [dateRanges, setDateRanges] = useState(null);

  const showDateFilter = () => {
    setShowDateRangeFilter(true);
  };

  const hideDateFilter = () => {
    setShowDateRangeFilter(false);
  };

  const onChangeDateFilter = (ranges) => {
    setDateRanges(ranges);
  };

  const clearDateFilter = () => {
    setFilters((state) => ({ ...state, dateRanges: null }));
  };

  const applyDateRange = () => {
    setFilters((state) => ({ ...state, dateRanges }));
  };

  useEffect(() => {
    setData(vendors);
  }, [vendors]);

  const initialFilter = {
    registerationDate: "",
    name: "",
    email: "",
    mobile: "",
    status: "",
    isVerified: "",
  };
  const [filters, setFilters] = useState(initialFilter);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [action, setAction] = useState("");

  const toggleConfirmationModal = () => {
    setIsConfirmationModalOpen((state) => !state);
  };

  const onFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((state) => ({ ...state, [name]: value }));
  };

  const getFilteredData = () => {
    let data = [];
    if (vendors.length) {
      data = vendors.filter((vendor) => {
        const isMatch = Object.entries(filters).every((arr) => {
          const [key, value] = arr;
          if (value) {
            if (key === "dateRanges") {
              return (
                new Date(vendor.vendorCreationDate) >
                  new Date(dateRanges.startDate) &&
                new Date(vendor.vendorCreationDate) <
                  new Date(dateRanges.endDate)
              );
            }

            if (key === "name") {
              let name = vendor["firstName"] + " " + vendor["lastName"];
              return name.toLowerCase()?.startsWith(value.toLowerCase());
            }

            if (key === "isVerified") {
              console.log(vendor[key], value, "isVerified");
              if (vendor[key]) {
                if (value === "0") {
                  return false;
                }
              } else if (!vendor[key]) {
                if (value === "1") {
                  return false;
                }
              }
              return true;
            }

            if (key === "status") {
              console.log(vendor[key], value, "status");

              if (vendor["active"]) {
                if (value === "InActive") {
                  return false;
                }
              } else if (!vendor["active"]) {
                if (value === "Active") {
                  return false;
                }
              }
              return true;
            }

            if (typeof vendor[key] === "string") {
              return vendor[key].toLowerCase()?.startsWith(value.toLowerCase());
            }

            return vendor[key] === value;
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

  const changeVendorStatus = (active, _id) => {
    dispatch(
      updateVendorStatus({
        _id: _id || currentId,
        active,
      })
    );
  };

  const changeOnBoardStatus = (onBoardActive, _id) => {
    dispatch(
      updateVendorOnBoardStatus({
        _id: _id || currentId,
        onBoardActive,
      })
    );
  };

  useEffect(() => {
    props.setTitle("Vendor");

    dispatch(getAllVendors());
  }, []);

  const columns = [
    {
      name: "Image",
      selector: (row) => (
        <img
          src={window.location.origin + "/" + `${row.profileImage?.[0]?.path}`}
        />
      ),
    },
    {
      name: "Name",
      selector: (row) => row.firstName + " " + row.lastName,
      sortable: true,
    },
    // {
    //   name: "Email",
    //   selector: (row) => row.email,
    //   sortable: true,
    // },
    // {
    //   name: "Phone",
    //   selector: (row) => row.mobile,
    // },
    {
      name: "Status",
      selector: (row) => row.active,
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
          {row.active ? "Active" : "InActive"}
        </span>
      ),
    },

    {
      name: "Verified",
      selector: (row) => (row.isVerified ? "Verified" : "Not Verified"),
      cell: (row) => (
        <span
          style={
            row.isVerified
              ? {
                  padding: "5px 10px",
                  color: "white",
                  backgroundColor: "green",
                }
              : { padding: "5px 10px", color: "white", backgroundColor: "red" }
          }
        >
          {row.isVerified ? "Verified" : "Not Verified"}
        </span>
      ),
    },
    {
      name: "On Board",
      selector: (row) => (row.onBoardActive ? "Yes" : "No"),
      cell: (row) => (
        <span
          style={
            row.onBoardActive
              ? {
                  padding: "5px 10px",
                  color: "white",
                  backgroundColor: "green",
                }
              : { padding: "5px 10px", color: "white", backgroundColor: "red" }
          }
        >
          {row.onBoardActive ? "Yes" : "No"}
        </span>
      ),
    },
    // {
    //   name: "Registration",
    //   selector: (row) =>
    //     row.vendorCreationDate
    //       ? moment(row.vendorCreationDate).format("MM/DD/YYYY hh:mm a")
    //       : null,
    //   sortable: true,
    // },

    {
      name: "Actions",
      grow: 2,
      center: true,
      cell: (row) => (
        // <span>true</span>
        <Dropdown style={{ border: "1px solid black" }}>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            <span style={{ paddingRight: 10 }}>Action</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
              <MenuLink
                href={`/admin/vendor/edit/${row._id}`}
                iconclassName="bi bi-pencil-square"
                menuTitle="Edit"
              />
            </Dropdown.Item>

            <Dropdown.Item>
              <MenuLink
                href={`/admin/vendor/view/${row._id}`}
                // iconclassName="bi bi-pencil-square"
                iconclassName={"bi bi-eye-fill"}
                menuTitle="View"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <MenuLink
                onShow={() => {
                  setCurrentId(row._id);
                  setAction("status");
                  if (row.active) {
                    toggleConfirmationModal();
                    //   handleShow();
                    setConfirmModalMessage("You want to deactivate");
                    //   setAction('customerStatus')
                  } else {
                    changeVendorStatus(true, row._id);
                    // changeCustomerStatus(true, row._id);
                  }
                }}
                iconclassName={
                  row.active ? "bi bi-dash-square-dotted" : "bi bi-check"
                }
                menuTitle={row.active ? "Deactivate" : "Activate"}
              />
            </Dropdown.Item>

            {row.onBoardActive ? null : (
              <Dropdown.Item>
                <MenuLink
                  // href={`/admin/vendor/associates/${row._id}`}
                  onShow={() => {
                    setCurrentId(row._id);
                    setAction("onBoardStatus");

                    if (row.onBoardActive) {
                      // handleShow();
                      setConfirmModalMessage(
                        "You want to deactivate on board status"
                      );
                      // verifyEmail()
                    } else {
                      changeOnBoardStatus(true, row._id);
                      //   verifyEmail(row._id);
                    }
                  }}
                  iconclassName="bi bi-envelope-check"
                  menuTitle="Onboard Active"
                ></MenuLink>
              </Dropdown.Item>
            )}
            <Dropdown.Item>
              <MenuLink
                onShow={() => {
                  router.push(`/admin/vendor/associates/${row._id}`);
                }}
                iconclassName="bi bi-envelope-check"
                menuTitle="Manage Associates"
              ></MenuLink>
            </Dropdown.Item>
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
            type="text"
            style={{ minWidth: 300 }}
            onFocus={showDateFilter}
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
            name="status"
            onChange={onFilterChange}
            style={{ minWidth: 300 }}
          >
            <option>Search by Status</option>
            <option>Active</option>
            <option>InActive</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Select
            style={{ minWidth: 300 }}
            name="isVerified"
            onChange={onFilterChange}
          >
            <option>Search by Verification Status</option>
            <option value={1}>Verified</option>
            <option value={0}>Not Verified</option>
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
    <div className="bg-color">
      <div style={{ margin: 10 }}>
        <Search header="Collapse" body={SearchBody} />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", margin: 10 }}>
        <Button
          variant="primary"
          style={{ width: 100 }}
          onClick={() => {
            router.push("/admin/vendor/add");
          }}
        >
          {"Add "}
          {/* <i style={{ fontSize: 12 }} className="bi bi-plus-square"></i> */}
        </Button>
      </div>

      <div style={{ margin: 10 }}>
        {!data && <div style={{ textAlign: "center" }}>Loading...</div>}

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
        body={confirmModalMessage}
        btn1Text="Ok"
        btn2Text="Cancel"
        onFirst={() => {
          if (action === "status") {
            // verifyEmail()
            changeVendorStatus(false);
          } else if (action === "onBoardStatus") {
          }
        }}
        show={isConfirmationModalOpen}
        onClose={toggleConfirmationModal}
      />
    </div>
  );
};

export default Index;
