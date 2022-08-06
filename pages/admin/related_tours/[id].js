import { useEffect, useState } from "react";
import Main from "../../../components/Main/Main";
import DataTable from "react-data-table-component";

import { Button, Form } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import Search from "../../../components/Search";
import ConfirmModal from "../../../components/ConfirmModal";

import { useRouter } from "next/router";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import DateRangeFilter from "../../../components/DateRangeFilter";
import {
  getAllRelatedTours,
  updateRelatedTours,
} from "../../../redux/actions/relatedTours";
import { getAllTours } from "../../../redux/actions";

const Index = (props) => {
  const dataList = useSelector((state) => state.tours);
  const relatedTours = useSelector((state) => state.relatedTours);
  const [data, setData] = useState(dataList);
  const [show, setShow] = useState(false);
  const [confirmModalMessage, setConfirmModalMessage] = useState("");
  const [action, setAction] = useState("");
  const [selectedTours, setSelectedTours] = useState(relatedTours);
  const router = useRouter();
  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };
  console.log("relatedTours", relatedTours);
  const [currentId, setCurrentId] = useState("");
  const handleClose = () => setShow(false);

  const dispatch = useDispatch();
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

  const inputChange = () => {};

  const hideDateFilter = () => {
    setShowDateRangeFilter(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateRelatedTours({
        tourId: router.query.id,
        relatedTours: selectedTours,
      })
    );
  };

  const handleReset = () => {
    setSelectedTours(relatedTours);
  };
  const onClickCheckBox = (e, id) => {
    let newselectedTours = [];
    if (e.target.checked) {
      newselectedTours = [...selectedTours];
      newselectedTours.push(id);
    } else {
      newselectedTours = selectedTours.filter((tourId) => tourId !== id);
    }
    setSelectedTours(newselectedTours);
    console.log(e.target.checked, "checked");
  };

  // useEffect(() => {
  //   setSelectedTours(relatedTours);
  // }, [relatedTours]);

  const handleShow = () => setShow(true);

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
    setData(dataList);
  }, [dataList]);

  useEffect(() => {
    props.setTitle("Customer");

    dispatch(getAllRelatedTours({ tourId: router.query.id }));
    dispatch(getAllTours());
  }, []);

  const onFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((state) => ({ ...state, [name]: value }));
  };

  const getFilteredData = () => {
    console.log(filters, "filters");
    let newData = [];
    if (dataList.length) {
      newData = dataList.filter((tour) => {
        const isMatch = Object.entries(filters).every((arr) => {
          const [key, value] = arr;
          if (value) {
            if (key === "dateRanges") {
              return (
                new Date(tour.customerCreationDate) >
                  new Date(dateRanges.startDate) &&
                new Date(tour.customerCreationDate) <
                  new Date(dateRanges.endDate)
              );
            }

            if (key === "name") {
              let name = tour["firstName"] + " " + tour["lastName"];
              return name.toLowerCase()?.startsWith(value.toLowerCase());
            }

            if (key === "isEmailVerified") {
              if (tour[key]) {
                if (value === "Not Verified") {
                  return false;
                }
              } else if (!tour[key]) {
                if (value === "Verified") {
                  return false;
                }
              }
              return true;
            }

            if (key === "active") {
              if (tour[key]) {
                if (value === "Deactive") {
                  return false;
                }
              } else if (!tour[key]) {
                if (value === "Active") {
                  return false;
                }
              }
              return true;
            }

            if (typeof tour[key] === "string") {
              return tour[key].toLowerCase()?.startsWith(value.toLowerCase());
            }

            return tour[key] === value;
          }
          return true;
        });

        return isMatch;
      });
    }

    setData(newData);
  };

  useEffect(() => {
    getFilteredData();
  }, [filters]);

  const removeFilters = () => {
    setFilters(initialFilter);
  };

  const tabledata = [
    {
      srno: "1",
      name: "Bla",
      email: "bla@gmail.com",
      mobile: "6766",
      status: "active",
    },
    {
      srno: "2",
      name: "Upasana",
      email: "upa@gmail.com",
      mobile: "085686966",
      status: "active",
    },
    {
      srno: "3",
      name: "shirley",
      email: "shirley@gmail.com",
      mobile: "5677666766",
      status: "active",
    },

    {
      srno: "4",
      name: "natti",
      email: "natti@gmail.com",
      mobile: "67664544545",
      status: "active",
    },
    {
      srno: "5",
      name: "josh",
      email: "josh@gmail.com",
      mobile: "67656776",
      status: "active",
    },
    {
      srno: "6",
      name: "joanna",
      email: "joanna@gmail.com",
      mobile: "67665577",
      status: "active",
    },
    {
      srno: "7",
      name: "nissi",
      email: "nissi@gmail.com",
      mobile: "6765655656",
      status: "active",
    },
  ];
  const columns = [
    {
      name: "",
      selector: (row) => {
        debugger;
        return (
          <input
            onChange={(e) => onClickCheckBox(e, row._id)}
            type="checkbox"
            checked={selectedTours.includes(row._id)}
          />
        );
      },
    },
    {
      name: "Title",
      sortable: true,
      selector: (row) => row.title,
    },
    {
      name: "Destination",
      sortable: true,
      selector: (row) => row?.endPoint?.city?.label,
    },
    {
      name: "Theme",
      selector: (row) => row.theme?.[0]?.label,
      sortable: true,
    },
  ];

  const SearchBody = (
    <div style={{ display: "flex" }}>
      <div style={{ position: "relative" }}></div>

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
            placeholder="Search by Title"
            value={filters.title}
            name="title"
            onChange={onFilterChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            style={{ minWidth: 300 }}
            placeholder="Search by Destination"
            name="destination"
            value={filters.destination}
            onChange={onFilterChange}
          />
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
      <div style={{ display: "flex", marginTop: "5px" }}>
        <Button
          onClick={handleSubmit}
          variant="primary"
          style={{
            alignSelf: "center",
            height: "fit-content",
            marginLeft: 10,
          }}
        >
          Submit
        </Button>
        <Button
          variant="danger"
          type="reset"
          style={{
            alignSelf: "center",
            height: "fit-content",
            marginLeft: 5,
          }}
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button
          variant="secondary"
          style={{
            alignSelf: "center",
            height: "fit-content",
            marginLeft: 5,
          }}
          onClick={router.back}
        >
          Cancel
        </Button>
      </div>
      <ConfirmModal
        title="Are you sure?"
        body={confirmModalMessage}
        btn1Text="Ok"
        btn2Text="Cancel"
        onFirst={() => {}}
        show={show}
        onClose={handleClose}
      />
    </div>
  );
};

export default Index;
