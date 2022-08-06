import React, { useState, useEffect } from "react";
// library
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Form, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import moment from "moment";
import { Country, State, City } from "country-state-city";
// redux
import {
  getAllCollection,
  deleteCollection,
} from "../../../redux/actions/collection";
// components
import MenuLink from "../../../components/MenuLink";
import Search from "../../../components/Search";
import ConfirmModal from "../../../components/ConfirmModal";

const Collection = (props) => {
  const [selectCard, setSelectCard] = useState("");
  const [description, setDescription] = useState("");
  const [distanceFromDestination, setDistanceFromDestination] = useState("");
  const [relatedArticleTitle, setRelatedArticleTitle] = useState("");

  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [data, setData] = useState(null);
  const [confirmModalMessage, setConfirmModalMessage] = useState("");
  const [action, setAction] = useState("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    props.setTitle("Collection");
  }, []);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCollection());
  }, []);

  const {collections} = useSelector((state) => state);



  useEffect(() => {
    setData(collections?.allCollection);
  }, [collections.allCollection]);

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
      selector: (row) =>
        row.coverImage ? (
          <img
            src={
              window.location.origin +row.coverImage
            }
            width={50}
            height={50}
          />
        ) : null,
    },
    {
      name: "Title",
      sortable: true,
      selector: (row) => (
        <span className="text-capital">{row.title || "-"}</span>
      ),
    },
    {
      name: "Page Link",
      sortable: true,
      selector: (row) => {
        const slug = row.title.split(" ").join("-");
        return(
        <a href={`/collection/${slug}`} target='__blank' rel="noopener noreferrer" className="text-capital">Visit Page</a>
      )},
    },
    {
      name: "Country",
      sortable: true,
      selector: (row) => (
        <span className="text-capital">{row.country?.name || "N/A"}</span>
      ),
    },
    {
      name: "State",
      sortable: true,
      selector: (row) => (
        <span className="text-capital">{row.state?.name || "N/A"}</span>
      ),
    },
    {
      name: "City",
      sortable: true,
      selector: (row) => (
        <span className="text-capital">{row.city?.name || "N/A"}</span>
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
      name: "Created",
      sortable: false,
      selector: (row) =>
        row.updated ? moment(row.created).format("MM/DD/YYYY hh:mm a") : null,
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
                href={`/admin/collection/view/${row._id}`}
                iconclassName="bi bi-search"
                menuTitle="View"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <MenuLink
                href={`/admin/collection/edit/${row._id}`}
                iconclassName="bi bi-pencil-square"
                menuTitle="Edit"
              />
            </Dropdown.Item>

            <Dropdown.Item>
              <MenuLink
                onShow={() => {
                  setCurrentId(row._id);
                  toggleConfirmationModal();
                  setConfirmModalMessage("You want to delete");
                  setAction("delete");
                }}
                iconclassName="bi bi-pencil-square"
                menuTitle="Delete"
              />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  const handleReset = () => {
    setData(dataList);
  };

  const toggleConfirmationModal = () => {
    setIsConfirmationModalOpen((state) => !state);
  };

  const onClickDelete = () => {
    dispatch(deleteCollection({ _id: currentId }));
  };

  const SearchBody = (
    <div>
      <Form autoComplete="off">
        <Row style={{ display: "flex", justifyContent: "space-between" }}>
          <Col>
            <Form.Group>
              <Form.Select
                value={selectCard || ""}
                onChange={(e) => setSelectCard(e.target.value)}
                name="selectCard"
                id="selectCard"
              >
                <option value="">Select Card</option>
                <option value={"card_1"}>Card 1</option>
                <option value={"card_2"}>Card 2</option>
                <option value={"card_3"}>Card 3</option>
                <option value={"card_3"}>Card 4</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col>
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
      <div style={{ display: "flex", justifyContent: "flex-end", margin: 10 }}>
        <Button
          variant="primary"
          style={{ width: 100 }}
          onClick={() => {
            router.push("/admin/collection/add");
          }}
        >
          {"Add "}
          <i style={{ fontSize: 12 }} className="bi bi-plus-square"></i>
        </Button>
      </div>
      <div style={{ margin: 10 }}>
        {!data?.length && <div style={{ textAlign: "center" }}>No Collection Found</div>}
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
      {/* <ConfirmModal
        title="Are you sure?"
        body="You want to deactivate"
        btn1Text="Ok"
        btn2Text="Cancel"
        onFirst={() => {
          
        }}
        onShow={handleShow}
        onClose={handleClose}
      /> */}
      <ConfirmModal
        title="Are you sure?"
        body={confirmModalMessage}
        btn1Text="Ok"
        btn2Text="Cancel"
        onFirst={() => {
          if (action === "delete") {
            onClickDelete();
          } else {
            changeStatus(currentId, false);
          }
        }}
        show={isConfirmationModalOpen}
        onClose={toggleConfirmationModal}
      />
    </>
  );
};
export default Collection;
