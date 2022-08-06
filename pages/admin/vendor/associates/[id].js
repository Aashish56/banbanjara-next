import { useEffect, useState } from "react";
import Main from "../../../../components/Main/Main";
import DataTable from "react-data-table-component";

import { VscAdd, VscEdit } from "react-icons/vsc";
import { TiDeleteOutline } from "react-icons/ti";
import classes from "../vendor.module.css";
import { Button, Dropdown, Form } from "react-bootstrap";
import MenuLink from "../../../../components/MenuLink";
import Search from "../../../../components/Search";
import ConfirmModal from "../../../../components/ConfirmModal";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getAllVendors } from "../../../../redux/actions/vendor";
import {
  getAllVendorAssociates,
  updateVendorAssociateStatus,
} from "../../../../redux/actions/vendorAssociates";
const VendorAssociates = (props) => {
  const vendors = useSelector((state) => state.vendorAssociates);
  console.log(vendors);
  const [confirmModalMessage, setConfirmModalMessage] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const [data, setData] = useState(vendors);

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

  const changeVendorAssociateStatus = (active, _id) => {
    dispatch(
      updateVendorAssociateStatus({
        _id: _id || currentId,
        active,
        vendorId: router.query.id,
      })
    );
  };

  useEffect(() => {
    props.setTitle("Vendor");
    console.log(router.query.id, "querid");

    const data = { vendorId: router.query.id };

    dispatch(getAllVendorAssociates(data));

    // dispatch(getAllVendorAssociates());
  }, []);

  const tabledata = [
    {
      srno: "1",
      name: "Bla",
      email: "bla@gmail.com",
      phone: "6766",
      status: "active",
    },
    {
      srno: "2",
      name: "Upasana",
      email: "upa@gmail.com",
      phone: "085686966",
      status: "active",
    },
    {
      srno: "3",
      name: "shirley",
      email: "shirley@gmail.com",
      phone: "5677666766",
      status: "active",
    },

    {
      srno: "4",
      name: "natti",
      email: "natti@gmail.com",
      phone: "67664544545",
      status: "active",
    },
    {
      srno: "5",
      name: "josh",
      email: "josh@gmail.com",
      phone: "67656776",
      status: "active",
    },
    {
      srno: "6",
      name: "joanna",
      email: "joanna@gmail.com",
      phone: "67665577",
      status: "active",
    },
    {
      srno: "7",
      name: "nissi",
      email: "nissi@gmail.com",
      phone: "6765655656",
      status: "active",
    },
  ];
  const columns = [
    {
      name: "Name",
      selector: (row) => row.firstName + " " + row.lastName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.mobile,
    },
    {
      name: "Secondary Phone",
      selector: (row) => row.secondaryMobile,
    },
    {
      name: "Designation",
      selector: (row) => row.designation,
    },
    {
      name: "Status",
      selector: (row) => row.status,
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
    // {
    //   name:'Vendor Code',
    //   selector: (row) =>
    // }

    {
      name: "Created",
      selector: (row) => row.vendorCreationDate,
      sortable: true,
    },

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
                href={`/admin/vendor/associates_edit/${row._id}`}
                iconclassName="bi bi-pencil-square"
                menuTitle="Edit"
              />
            </Dropdown.Item>

            {/* <Dropdown.Item>
              <MenuLink
                href={`/admin/vendor/view/${row._id}`}
                // iconclassName="bi bi-pencil-square"
                iconclassName={'bi bi-eye-fill'}
                menuTitle="View"
              />
            </Dropdown.Item> */}
            <Dropdown.Item>
              <MenuLink
                onShow={() => {
                  // setCurrentId(row._id);
                  // if (row.active) {
                  //   handleShow();
                  //   setConfirmModalMessage('You want to deactivate');
                  //   setAction('customerStatus')
                  // } else {
                  //   changeCustomerStatus(true, row._id);
                  // }
                  setCurrentId(row._id);
                  if (row.active) {
                    toggleConfirmationModal();
                    setConfirmModalMessage("You want to deactivate");
                    // setAction('customerStatus')
                  } else {
                    changeVendorAssociateStatus(true, row._id);
                  }
                }}
                iconclassName={
                  row.active ? "bi bi-dash-square-dotted" : "bi bi-check"
                }
                menuTitle={row.active ? "Deactivate" : "Activate"}
              />
            </Dropdown.Item>

            {/* {row.onBoardActive ? null : (
              <Dropdown.Item>
                <MenuLink
                  onShow={() => {
                    // setCurrentId(row._id);
                    // if (row.isEmailVerified) {
                      // handleShow();
                      // setAction('emailStatus')
                      // setConfirmModalMessage('You want to verify customer email');
                      // verifyEmail()
                    // }
                    //  else {
                    //   verifyEmail(row._id);
                    // }
                  }}
                  iconclassName="bi bi-envelope-check"
                  menuTitle="Onboard Active"
                ></MenuLink>
              </Dropdown.Item>
            )} */}
            {/* <Dropdown.Item>
                <MenuLink
                  onShow={() => {
                    router.push(`/admin/vendor/associates/${row._id}`);

                    // setCurrentId(row._id);
                    // if (row.isEmailVerified) {
                      // handleShow();
                      // setAction('emailStatus')
                      // setConfirmModalMessage('You want to verify customer email');
                      // verifyEmail()
                    // }
                    //  else {
                    //   verifyEmail(row._id);
                    // }
                  }}
                  iconclassName="bi bi-envelope-check"
                  menuTitle="Manage Associates"
                ></MenuLink>
              </Dropdown.Item> */}
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
        {/* <Form.Group> */}
        {/* <Form.Label></Form.Label> */}
        {/* <Form.Control
            type="text"
            style={{ minWidth: 300 }}
            placeholder="Search by Registeration Date"
            name="registerationDate"
            // value={filters.registerationDate}
            onChange={onFilterChange}
          /> */}
        {/* </Form.Group> */}
        <Form.Group>
          <Form.Control
            type="text"
            style={{ minWidth: 300 }}
            placeholder="Search by Name"
            value={filters.name}
            name="name"
            onChange={onFilterChange}

            // onChange={(e) => setSearchCountry(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            style={{ minWidth: 300 }}
            placeholder="Search by Email"
            name="email"
            onChange={onFilterChange}
            // value={searchCountry}
            // onChange={(e) => setSearchCountry(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            style={{ minWidth: 300 }}
            placeholder="Search by Phone Number"
            onChange={onFilterChange}
            name="mobile"
            // value={searchCountry}
            // onChange={(e) => setSearchCountry(e.target.value)}
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
        {/* <Form.Group>
          <Form.Select
            style={{ minWidth: 300 }}
            name="isVerified"
            onChange={onFilterChange}
          >
            <option>Search by Verification Status</option>
            <option value={1}>Verified</option>
            <option value={0}>Not Verified</option>
          </Form.Select>
        </Form.Group> */}

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
            console.log(router.query.id);
            router.push(`/admin/vendor/associates_add/${router.query.id}`);
          }}
        >
          {"Add "}
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
      {/* <DateRangePicker
        ranges={[selectionRange]}
        onChange={() => null}
        // onChange={this.handleSelect}
      /> */}
      <ConfirmModal
        title="Are you sure?"
        body={confirmModalMessage}
        btn1Text="Ok"
        btn2Text="Cancel"
        onFirst={
          () => {
            // if(action === 'emailStatus'){
            // verifyEmail()
            // }else{
            changeVendorAssociateStatus(false);
          }

          // }
        }
        show={isConfirmationModalOpen}
        onClose={toggleConfirmationModal}
      />
    </div>

    // <div className="bg-color">
    //   <Main />
    //   <Button
    //     xs={2}
    //     className="d-block p-4 m-4"
    //     xs={12}
    //     id="TooltipExample"
    //     style={{
    //       color: "#fff",
    //       fontSize: "1.5rem",
    //       paddingTop: ".7rem",
    //       paddingBottom: ".7rem",
    //     }}
    //   >
    //     <VscAdd title="Add Item" />
    //     {/* Add */}
    //   </Button>
    //   <DataTable columns={columns} data={tabledata} pagination />
    // </div>
  );
};

export default VendorAssociates;
