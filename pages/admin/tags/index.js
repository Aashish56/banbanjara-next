import React, { useState, useEffect } from "react";
// library
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Form, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import moment from "moment";
import { Country, State, City } from "country-state-city";
// redux
import { getAllTagPage, deleteTagPage } from "../../../redux/actions/tagPage";
// components
import MenuLink from "../../../components/MenuLink";
import Search from "../../../components/Search";
import ConfirmModal from "../../../components/ConfirmModal";

const TagPage = (props) => {
  const [selectTag, setSelectTag] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaKeyword, setMetaKeyword] = useState("");
  const [makeAsCategory, setMakeAsCategory] = useState("");

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
    props.setTitle("Tag Page");
  }, []);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTagPage());
  }, []);

  const {tagPage} = useSelector((state) => state);
  


  console.log("dataList-", tagPage);

  useEffect(() => {
    setData(tagPage.tagPageList);
  }, [tagPage]);

  // useEffect(() => {
  //   try {
  //     var filterData = [];
  //     if (selectTag && country && city && state && title) {
  //       filterData = dataList
  //         ?.filter((a) => {
  //           return a.text.toLowerCase().includes(selectTag?.toLowerCase());
  //           return a.text.toLowerCase().includes(title?.toLowerCase());
  //         })
  //         ?.filter((item) => item?.country?.label === country?.label);
  //     } else if (country && !title) {
  //       filterData = dataList
  //         ?.filter((item) => item?.country?.label === country?.label)
  //         ?.filter((item) => item?.state?.label === state?.label);
  //     } else if (stateCode && !title) {
  //       filterData = dataList
  //         ?.filter((item) => item?.state?.label === state?.label)
  //         ?.filter((item) => item?.city?.label === city?.label);
  //     } else if (city && !title) {
  //       filterData = dataList?.filter(
  //         (item) => item?.city?.label === city?.label
  //       );
  //     } else {
  //       filterData = dataList;
  //     }
  //     setData(filterData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [selectTag, country, state, city]);

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
        row.cardImage ? (
          <img
            src={window.location.origin +row?.image}
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
      name: "Tag",
      sortable: true,
      selector: (row) => <span className="text-capital">{row.tag || "-"}</span>,
    },
    // {
    //   name: "Country",
    //   sortable: true,
    //   selector: (row) => (
    //     <span className="text-capital">{row.country?.label || "N/A"}</span>
    //   ),
    // },
    // {
    //   name: "State",
    //   sortable: true,
    //   selector: (row) => (
    //     <span className="text-capital">{row.state?.label || "N/A"}</span>
    //   ),
    // },
    // {
    //   name: "City",
    //   sortable: true,
    //   selector: (row) => (
    //     <span className="text-capital">{row.city?.label || "N/A"}</span>
    //   ),
    // },
    {
      name: "Front URL",
      sortable: true,
      selector: (row) => {
          const sluggedTitle = row.title.split(" ").join('-');
        return (<a href={`${window.location.origin}/tagPage/${sluggedTitle}`} target='_blank' rel="noopener noreferrer">Visit Page</a>);
      }
    },
    {
      name: "Status",
      sortable: true,
      selector: (row) => (row.isDisable ? "Deactive" : "Active"),
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
          {row.isDisable ? "Deactive" : "Active"}
        </span>
      ),
    },
    {
      name: "Created",
      sortable: false,
      selector: (row) =>
         moment(row.createdAt).format("ll"),
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
                href={`/admin/tags/view/${row._id}`}
                iconclassName="bi bi-search"
                menuTitle="View"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <MenuLink
                href={`/admin/tags/edit/${row._id}`}
                iconclassName="bi bi-pencil-square"
                menuTitle="Edit"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <MenuLink
                href={`/admin/tags/addFaq/${row._id}`}
                iconclassName="bi bi-pencil-square"
                menuTitle="Add Faq"
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
    dispatch(deleteTagPage({ _id: currentId }));
  };

  const SearchBody = (
    <div>
      <Form autoComplete="off">
        <Row style={{ display: "flex", justifyContent: "space-between" }}>
          <Col>
            <Form.Group>
              <Form.Select
                value={selectTag || ""}
                onChange={(e) => setSelectTag(e.target.value)}
                name="selectTag"
                id="selectTag"
              >
                <option value="">Select Tag</option>
                <option value={"tag_1"}>Tag 1</option>
                <option value={"tag_2"}>Tag 2</option>
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
            router.push("/admin/tags/add");
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
      {/* <ConfirmModal
        title="Are you sure?"
        body="You want to deactivate"
        btn1Text="Ok"
        btn2Text="Cancel"
        onFirst={() => {
          
        }}
        show={show}
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
export default TagPage;
