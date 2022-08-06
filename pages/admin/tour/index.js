import React, { useState, useEffect } from "react";
// library
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Form, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import moment from "moment";
import Select, { components } from "react-select";
import { Country, State, City } from "country-state-city";
// redux
import { getAllTours, updateToursStatus } from "../../../redux/actions";
// components
import MenuLink from "../../../components/MenuLink";
import ConfirmModal from "../../../components/ConfirmModal";
import Search from "../../../components/Search";
const CheckImage = (path) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);

    img.src = path;
  });
// async function CheckImage(path) {
//   try {
//     // debugger;
//     await fetch(path);

//     return false;
//   } catch {
//     // debugger;
//     return false;
//   }
// }

//   const image = new Image();
//   const span = document.createElement("span");
//   image.src = window.location.origin + "/uploads/tour/" + src;
//   image.onerror = function () {
//     // image did not load
//     console.log("errR");
//     const err = new Image();
//     err.src = window.location.origin + "/images/no-image.png";
//     err.height = 50;
//     err.width = 50;
//     span.innerHTML = err.outerHTML;
//   };
//   image.onload = function () {
//     // image exists and is loaded
//     const ok = new Image();
//     ok.src = window.location.origin + "/uploads/tour/" + src;
//     ok.height = 50;
//     ok.width = 50;
//     span.innerHTML = ok.outerHTML;
//   };

//   return span;
// };
const Tours = (props) => {
  const [show, setShow] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [selectStatus, setSelectStatus] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [data, setData] = useState(null);

  const router = useRouter();
  console.log("tourData", data);
  useEffect(() => {
    props.setTitle("Tours");
  }, []);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const changeStatus = (_id, isDisable) => {
    dispatch(
      updateToursStatus({
        _id: _id || currentId,
        isDisable: isDisable,
      })
    );
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTours());
  }, []);
  const dataList = useSelector((state) => state.tours.tours);

  useEffect(() => {
    setData(dataList);
  }, [dataList]);
  useEffect(() => {
    setImagesLoaded(false);
    const result = [...dataList];
    result.forEach(async (item, index) => {
      // debugger;
      const found = await CheckImage(
        window.location.origin + "/uploads/tour/" + item?.cardImage
      );
      console.log("found", found);
      setData((prev) => {
        prev[index].cardImage = found
          ? window.location.origin + "/uploads/tour/" + prev[index]?.cardImage
          : window.location.origin + "/images/no-image.png";
        return prev;
      });
      if (index === result.length - 1) setImagesLoaded(true);
    });
  }, [dataList]);
  console.log("data", data);
  useEffect(() => {
    try {
      // debugger;
      var filterData = [];
      if (searchName && selectStatus && country && city && state) {
        filterData = dataList
          ?.filter((a) => {
            return a.title.toLowerCase().includes(searchName?.toLowerCase());
          })
          ?.filter((a) => {
            return a.isDisable?.toString() === selectStatus;
          })
          ?.filter((item) => item?.country?.label === country?.label)
          ?.filter((item) => item?.state?.label === state?.label)
          ?.filter((item) => item?.city?.label === city?.label);
      } else if (searchName && selectStatus && country) {
        filterData = dataList
          ?.filter((a) => {
            return a.title.toLowerCase().includes(searchName?.toLowerCase());
          })
          ?.filter((a) => {
            return a.isDisable?.toString() === selectStatus;
          })
          ?.filter((item) => item?.country?.label === country?.label);
      } else if (country && !searchName && !selectStatus) {
        filterData = dataList?.filter(
          (item) => item?.country?.label === country?.label
        );
      } else if (searchName && selectStatus) {
        filterData = dataList
          ?.filter((a) => {
            return a.title.toLowerCase().includes(searchName?.toLowerCase());
          })
          ?.filter((a) => {
            return a.isDisable?.toString() === selectStatus;
          });
      } else if (searchName && !selectStatus) {
        filterData = dataList?.filter((a) => {
          return a.title.toLowerCase().includes(searchName?.toLowerCase());
        });
      } else if (selectStatus && !searchName) {
        filterData = dataList?.filter((a) => {
          return a.isDisable?.toString() === selectStatus;
        });
      } else {
        filterData = dataList;
      }
      setData(filterData);
    } catch (error) {
      console.log(error);
    }
  }, [searchName, selectStatus, country, state, city]);

  const updatedCountries = Country?.getAllCountries()?.map((country) => ({
    label: country.name,
    value: country.isoCode,
    ...country,
  }));
  const updatedStates = (countryId) =>
    State?.getStatesOfCountry(countryId).map((state) => ({
      label: state.name,
      value: state.isoCode,
      ...state,
    }));
  const updatedCities = (countryId, stateId) =>
    City?.getCitiesOfState(countryId, stateId).map((city) => ({
      label: city.name,
      value: city.stateCode,
      ...city,
    }));

  const columns = [
    {
      name: "Image",
      sortable: false,
      selector: (row) => <img src={row?.cardImage} width={50} height={50} />,
    },
    {
      name: "Product Title",
      sortable: true,
      selector: (row) => <span className="text-capital">{row.title}</span>,
    },
    {
      name: "Booking Confirmation",
      sortable: true,
      selector: (row) => row.bookingConfirmation,
      cell: (row) => (
        <span
          style={{
            padding: "5px 10px",
            color: "white",
            backgroundColor: "#ff9600",
          }}
        >
          {row.bookingConfirmation}
        </span>
      ),
    },
    {
      name: "Rating",
      sortable: true,
      selector: (row) => row.averageRating,
      cell: (row) => (
        <span
          style={{
            padding: "5px 10px",
            color: "white",
            backgroundColor: "#00b0e4",
          }}
        >
          {row.averageRating || 0}
        </span>
      ),
    },
    {
      name: "Status",
      sortable: true,
      selector: (row) => (row.isDisable ? "Active" : "Deactive"),
      cell: (row) => (
        <span
          style={
            row.isDisable
              ? {
                  padding: "5px 10px",
                  color: "white",
                  backgroundColor: "green",
                }
              : { padding: "5px 10px", color: "white", backgroundColor: "red" }
          }
        >
          {row.isDisable ? "Active" : "Deactive"}
        </span>
      ),
    },
    {
      name: "Duration",
      sortable: true,
      selector: (row) => row.days,
      cell: (row) => (
        <span
          style={{
            padding: "5px 10px",
            color: "white",
            backgroundColor: "#00b0e4",
          }}
        >
          {!row.days && !row.night && "Not Decided yet"}{" "}
          {row?.days && `${row.days} Days `}{" "}
          {row?.night && `${row.night} Night`}
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
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
              <MenuLink
                href={`/admin/tour/edit/${row._id}`}
                iconclassName="bi bi-pencil-square"
                menuTitle="Edit"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <MenuLink
                onShow={() => {
                  setCurrentId(row._id);
                  if (row.isDisable) {
                    handleShow();
                  } else {
                    changeStatus(row._id, true);
                  }
                }}
                iconclassName={
                  row.isDisable ? "bi bi-dash-square-dotted" : "bi bi-check"
                }
                menuTitle={row.isDisable ? "Deactivate" : "Activate"}
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <MenuLink
                href={`/admin/tour/view/${row._id}`}
                iconclassName="bi bi-search"
                menuTitle="View"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <MenuLink
                href={`/admin/tour/#`}
                iconclassName="bi bi-eye"
                menuTitle="Preview Tour"
              />
            </Dropdown.Item>

            <Dropdown.Item>
              <MenuLink
                href={`/admin/itinerary/${row._id}`}
                iconclassName="bi bi-back"
                menuTitle="Manage Itinerary"
              />
            </Dropdown.Item>

            <Dropdown.Item>
              <MenuLink
                href={`/admin/faq/${row._id}`}
                iconclassName="bi bi-info-circle-fill"
                menuTitle="Manage FAQ"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <MenuLink
                href={`/admin/policies`}
                iconclassName="bi bi-info-circle"
                menuTitle="Manage Policies"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <MenuLink
                href={`/admin/related_tours/${row._id}`}
                iconclassName="bi bi-geo"
                menuTitle="Manage Related Tours"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <MenuLink
                href={`/admin/tourVariants/${row._id}`}
                onClick={() => {
                  props.setTitle(`Variants for ${row.title}`);
                }}
                iconclassName="bi bi-info-circle-fill"
                menuTitle="Tour Variants"
              />
            </Dropdown.Item>
            {/* <Dropdown.Item>
              <MenuLink
                href={`/admin/tour/#`}
                iconclassName="bi bi-asterisk"
                menuTitle="Manage Variants"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <MenuLink
                href={`/admin/tour/#`}
                iconclassName="bi bi-tags-fill"
                menuTitle="Dynamic Pricing"
              />
            </Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];
  const handleReset = () => {
    setSearchName("");
    setSelectStatus("");
    setCountry(null);
    setState(null);
    setCity(null);
    setData(dataList);
  };

  // const SelectInput = ({ ...rest }) => (
  //   <components.Input {...rest} autoComplete="offf" />
  // );

  const customSelectStyles = {
    control: (base) => ({
      ...base,
      minHeight: 25,
    }),
    valueContainer: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    clearIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
    }),
  };

  const SearchBody = (
    <div>
      <Form autoComplete="off">
        <Row
          style={{ display: "flex", justifyContent: "space-between" }}
          className="mb-3"
        >
          <Col>
            <Form.Group>
              <Select
                id="country"
                instanceId="country"
                name="country"
                label="Country"
                options={updatedCountries}
                value={country || ""}
                onChange={(value) => {
                  setCountry(value);
                }}
                placeholder="Select Country"
                // components={{ SelectInput }}
                styles={customSelectStyles}
                // classNamePrefix="mySelect"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Select
                id="state"
                instanceId="state"
                name="state"
                label="State"
                options={updatedStates(country ? country.value : null)}
                value={state || ""}
                onChange={(value) => {
                  setState(value);
                }}
                placeholder="Select State"
                // components={{ SelectInput }}
                styles={customSelectStyles}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Select
                id="city"
                instanceId="city"
                name="city"
                label="City"
                options={updatedCities(
                  state?.countryCode || null,
                  state ? state.value : null
                )}
                value={city || ""}
                onChange={(value) => {
                  setCity(value);
                }}
                placeholder="Select City"
                // components={{ encType= }}
                styles={customSelectStyles}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row style={{ display: "flex", justifyContent: "space-between" }}>
          <Col>
            <Form.Group>
              {/* <Form.Label></Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Search by Name"
                value={searchName || ""}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Select
                id="city"
                instanceId="city"
                name="status"
                label="status"
                options={[
                  { label: "Search By Status", value: "" },
                  { label: "Active", value: "true" },
                  { label: "Deactive", value: "false" },
                ]}
                value={selectStatus || ""}
                onChange={(item) => setSelectStatus(item.value)}
                placeholder="Select status"
                // components={{ encType= }}
                styles={customSelectStyles}
              />
              {/* <Form.Select
                value={selectStatus || ""}
                onChange={(e) => setSelectStatus(e.target.value)}
                name="status"
                id="status"
              >
                <option value="">Search By Status</option>
                <option value={true}>Active</option>
                <option value={false}>Deactive</option>
              </Form.Select>*/}
            </Form.Group>
          </Col>
          <Col className="d-flex">
            <Button
              variant="danger"
              type="reset"
              style={{
                height: "fit-content",
                alignSelf: "center",
              }}
              onClick={() => handleReset()}
            >
              Reset
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
  return (
    <>
      <div style={{ margin: 10 }}>
        <Search header="Collapse" body={SearchBody} />
      </div>
      <div
        style={{ display: "flex", justifyContent: "flex-end", marginRight: 20 }}
      >
        <Button
          variant="primary"
          style={{
            width: 80,
            display: "flex",
            justifyContent: "space-around",
          }}
          onClick={() => {
            router.push("/admin/tour/add");
          }}
        >
          <span>{"Add"}</span>
          <i
            style={{ fontSize: 12, marginRight: 0 }}
            className="bi bi-plus-square"
          ></i>
        </Button>
      </div>
      <div style={{ margin: 10 }}>
        {!data && <div style={{ textAlign: "center" }}>Loading...</div>}
        {data && imagesLoaded && Array.isArray(data) && (
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
export default Tours;
