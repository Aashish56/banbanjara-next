import React, { useState, useEffect } from "react";
// library
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Form, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import moment from "moment";
// redux
import { getAllOffers, updateOfferStatus, deleteOffer } from "../../../../redux/actions/offers";
// components
import MenuLink from "../../../../components/MenuLink";
import ConfirmModal from "../../../../components/ConfirmModal";
import Search from "../../../../components/Search";

const Offers = (props) => {
  const [selectStatus, setSelectStatus] = useState("");
  const [selectOfferType, setSelectOfferType] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [data, setData] = useState(null);
  const [confirmModalMessage, setConfirmModalMessage] = useState("");
  const [action, setAction] = useState("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const router = useRouter();
  
  useEffect(() => {
    props.setTitle("Offers");
  }, []);
  
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  
  const changeStatus = (_id, isDisable) => {
    dispatch(
      updateOfferStatus({
        _id: _id || currentId,
        isDisable: isDisable,
      })
    );
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOffers());
  }, []);
  
  const dataList = useSelector((state) => state.offers);

  console.log('dataList-', dataList);

  useEffect(() => {
    setData(dataList);
  }, [dataList]);

  useEffect(() => {
    try {
      var filterData = [];
      if (selectOfferType && selectStatus) {
        filterData = dataList
          ?.filter((a) => {
            return a.isDisable?.toString() === selectStatus;
          })
          ?.filter((a) => {
            return a.offerType?.toString() === selectOfferType;
          })
      } else if (selectOfferType && !selectStatus) {
        filterData = dataList ?.filter((a) => {
          return a.offerType?.toString() === selectOfferType;
        })
      } else if (selectStatus && !selectOfferType) {
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
  }, [selectOfferType, selectStatus]);

  const columns = [
    {
      name: "Title",
      sortable: true,
      selector: (row) => <span className="text-capital">{row.title || '-'}</span>,
    },
    {
      name: "Type",
      sortable: true,
      selector: (row) => <span className="text-capital">{row.offerType === 'product_as_offer' ? 'Product as Offer' : 'Discount Coupon'}</span>,
    },
    {
      name: "Description",
      sortable: true,
      selector: (row) => <span className="text-capital">{row.description || '-'}</span>,
    },
    {
      name: "Coupon Code",
      sortable: true,
      selector: (row) => <span className="text-capital">{row.couponCode || '-'}</span>,
    },
    {
      name: "Start Date",
      sortable: false,
      selector: (row) =>
        row.validityStartDate ? moment(row.validityStartDate).format('DD/MM/YYYY') : '-',
    },
    {
      name: "End Date",
      sortable: false,
      selector: (row) =>
        row.validityEndDate ? moment(row.validityEndDate).format('DD/MM/YYYY') : '-',
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
                href={`/admin/master/offers/view/${row._id}`}
                iconclassName="bi bi-search"
                menuTitle="View"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <MenuLink
                href={`/admin/master/offers/edit/${row._id}`}
                iconclassName="bi bi-pencil-square"
                menuTitle="Edit"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <MenuLink
                onShow={() => {
                  setCurrentId(row._id);
                  if (row.isDisable) {
                    // handleShow();
                    toggleConfirmationModal();
                    setConfirmModalMessage("You want to Deactivate");
                    setAction("changeStatus");
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
    setSelectStatus("");
    setSelectStatus("");
    setData(dataList);
  };

  const toggleConfirmationModal = () => {
    setIsConfirmationModalOpen((state) => !state);
  };

  const onClickDelete = () => {
    dispatch(deleteOffer({ _id: currentId }));
  };

  const SearchBody = (
    <div>
      <Form autoComplete="off">
        <Row style={{ display: "flex", justifyContent: "space-between" }}>
          <Col>
            <Form.Group>
              <Form.Select
                value={selectOfferType || ""}
                onChange={(e) => setSelectOfferType(e.target.value)}
                name="offerType"
                id="offerType"
              >
                <option value="">Search By Offer Type</option>
                <option value={'product_as_offer'}>Product As Offer</option>
                <option value={'discount_coupon'}>Discount Coupon</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Select
                value={selectStatus || ""}
                onChange={(e) => setSelectStatus(e.target.value)}
                name="status"
                id="status"
              >
                <option value="">Search By Status</option>
                <option value={true}>Active</option>
                <option value={false}>Deactive</option>
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
            router.push("/admin/master/offers/add");
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
export default Offers;
