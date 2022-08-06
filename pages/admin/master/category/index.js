import React, { useState, useEffect } from "react";
// library
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Form } from "react-bootstrap";
import { useRouter } from "next/router";
import moment from "moment";
// components
import MenuLink from "../../../../components/MenuLink";
// import ConfirmModal from "../../../../components/ConfirmModal";
import Search from "../../../../components/Search";
// redux
import {
  getAllCategories,
} from "../../../../redux/actions/category";

const CategoryForm = (props) => {
  const [show, setShow] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [data, setData] = useState(null);

  const router = useRouter();
  useEffect(() => {
    props.setTitle("Categories");
  }, []);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  const CategoriesList = useSelector((state) => state.categories);

  useEffect(() => {
    setData(CategoriesList);
  }, [CategoriesList]);

  useEffect(() => {
    try {
      var filterData = [];
      if (searchName) {
        filterData = CategoriesList
          ?.filter((a) => {
            return a.name.toLowerCase().includes(searchName?.toLowerCase());
          })
      } else {
        filterData = CategoriesList;
      }
      setData(filterData);
    } catch (error) {
      console.log(error);
    }
  }, [searchName]);

  const columns = [
    {
      name: "Name",
      sortable: false,
      selector: (row) => row.name,
    },
    {
      name: "Display Order",
      sortable: true,
      selector: (row) => row.displayOrder,
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
                href={`/admin/master/category/edit/${row._id}`}
                iconclassName="bi bi-pencil-square"
                menuTitle="Edit"
              />
            </Dropdown.Item>
            {/* <Dropdown.Item>
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
            </Dropdown.Item> */}
            {/* <Dropdown.Item>
              <MenuLink
                href={`/admin/master/category/view/${row._id}`}
                iconclassName="bi bi-search"
                menuTitle="View"
              />
            </Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];
  const handleReset = () => {
    setSearchName("");
    setData(CategoriesList);
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
            router.push("/admin/master/category/add");
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
      
    </>
  );
};
export default CategoryForm;
