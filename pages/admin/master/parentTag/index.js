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
    getAllParentTags,
} from "../../../../redux/actions/parentTag";

const ParentTagForm = (props) => {
  const [show, setShow] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [data, setData] = useState(null);

  const router = useRouter();
  useEffect(() => {
    props.setTitle("Parent Tags");
  }, []);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllParentTags());
  }, []);
  const ParentTagList = useSelector((state) => state.parentTags);

  useEffect(() => {
    setData(ParentTagList);
  }, [ParentTagList]);
  
  useEffect(() => {
    try {
      var filterData = [];
      if (searchName) {
        filterData = ParentTagList
          ?.filter((a) => {
            return a.name.toLowerCase().includes(searchName?.toLowerCase());
          })
      } else {
        filterData = ParentTagList;
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
      selector: (row) => row?.name,
    },
    {
      name: "Category",
      sortable: true,
      selector: (row) => row?.category?.name,
    },
    {
      name: "Display Order",
      sortable: true,
      selector: (row) => row?.displayOrder,
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
                href={`/admin/master/parentTag/edit/${row._id}`}
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
            router.push("/admin/master/parentTag/add");
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
export default ParentTagForm;
