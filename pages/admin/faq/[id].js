import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "../../../components/ConfirmModal";
// import { getAllItinerary, updateItineraries, updateItinerary } from '../../../redux/actions/itinerary';
import { Button, Row, Col, Form, Dropdown } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Search from "../../../components/Search";
import { deleteFaq, getAllFaq } from "../../../redux/actions/faq";
import moment from "moment";
import MenuLink from "../../../components/MenuLink";

// function Intinerary(props){

//     const [itinerary, setItinerary] = useState(props.data || {title:'', description:'', displayOrder:''})

//     const onChange = (e) => {
//         const {name, value} = e.target;

//         setItinerary(state => ({...state, [name]:value}))

//         props.setData((data) => {
//             const newData = data.map((item, index) => {
//                 if(index === props.index){
//                     return {...item, [name]:value}
//                 }
//                 return item
//             })

//             return newData;
//         })

//     }

//     useEffect(() => {

//         setItinerary(props.data)

//     }, [props.data])

//     const handleSubmit = (e) => {
//         e.preventDefault();

//     }

//     return (
//     <Form
//       style={{ display: "flex", flexDirection: "column" }}
//       onSubmit={handleSubmit}
//     >
//       <div style={{ flex: 1, display: "flex", flexWrap: "wrap" }}>
//         <Row>
//           <Col xl={12} lg={12} className="image-col">

//           </Col>

//           <Col>
//             <Form.Group style={{ flexBasis: "50%", padding: 10 }}>
//               <Form.Label>Title *</Form.Label>
//               <Form.Control
//                 type="text"
//                 style={{ minWidth: 300, textTransform: "capitalize" }}
//                 placeholder="title"
//                 value={itinerary.title || ""}
//                 onChange={onChange}
//                 name='title'

//                 // onBlur={() => setNameBlur(true)}
//                 required
//               />
//               {/* {nameBlur && !text && (
//                 <Form.Label style={{ color: "red" }}>
//                   Please enter Text
//                 </Form.Label>
//               )} */}
//             </Form.Group>
//           </Col>
//           <Col>
//             <Form.Group style={{ flexBasis: "50%", padding: 10 }}>
//               <Form.Label>Description *</Form.Label>
//               <Form.Control
//                 type="text"
//                 style={{ minWidth: 300 }}
//                 placeholder="Description"
//                 name='description'
//                 // onBlur={() => setSymbolBlur(true)}
//                 value={itinerary.description || ""}
//                 onChange={onChange}
//                 required
//               />
//               {/* {symbolBlur && !symbol && (
//                 <Form.Label style={{ color: "red" }}>
//                   Please enter Symbol
//                 </Form.Label>
//               )} */}
//             </Form.Group>
//           </Col>
//           <Col>
//             <Form.Group style={{ flexBasis: "50%", padding: 10 }}>
//               <Form.Label>Display Order *</Form.Label>
//               <Form.Control
//                 type="number"
//                 style={{ minWidth: 300 }}
//                 placeholder="Display Order"
//                 name='displayOrder'
//                 // onBlur={() => setDisplayOrderBlur(true)}
//                 value={itinerary.displayOrder || ""}
//                 onChange={onChange}
//                 required
//               />
//               {/* {displayOrderBlur && !displayOrder && (
//                 <Form.Label style={{ color: "red" }}>
//                   Please enter Display Order
//                 </Form.Label>
//               )} */}
//             </Form.Group>
//           </Col>
//           <Button onClick={() => props.onClickRemove(props.index, itinerary._id)} style={{width:'100px', height:'30px'}} variant='secondary'>Remove</Button>
//         </Row>
//       </div>

//     </Form>
//     )
// }

export default function Faq(props) {
  const dispatch = useDispatch();
  const faqs = useSelector((state) => state.faq);
  const [removedIds, setRemovedIds] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [confirmModalMessage, setConfirmModalMessage] = useState("");
  const [action, setAction] = useState("");

  // console.log(removedIds);

  const onClickDelete = () => {
    dispatch(deleteFaq({ _id: currentId, tourId: router.query.id }));
  };

  const [data, setData] = useState([]);
  const initState = {
    question: "",
    description: "",
    displayOrder: "",
  };

  const toggleConfirmationModal = () => {
    setIsConfirmationModalOpen((state) => !state);
  };

  const initialFilter = {
    answer: "",
    question: "",
  };

  const [filters, setFilters] = useState(initialFilter);

  const removeFilters = () => {
    setFilters(initialFilter);
  };

  const columns = [
    {
      name: "Question",
      selector: (row) => row.question,
    },
    {
      name: "Answer",
      sortable: true,
      selector: (row) => row.answer,
    },
    {
      name: "Display Order",
      sortable: true,
      selector: (row) => row.displayOrder,
    },
    {
      name: "Created",
      sortable: true,
      selector: (row) =>
        row.created ? moment(row.created).format("MM/DD/YYYY hh:mm a") : null,
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
                href={`/admin/faq/edit?faqId=${row._id}&tourId=${router.query.id}`}
                // href='/admin/hello'
                iconclassName="bi bi-pencil-square"
                menuTitle="Edit"
              />
            </Dropdown.Item>

            <Dropdown.Item>
              <MenuLink
                onShow={() => {
                  setCurrentId(row._id);
                  // handleShow();
                  toggleConfirmationModal();
                  setConfirmModalMessage("You want to delete");
                  setAction("delete");
                  // if (row.active) {
                  //   handleShow();
                  //   setConfirmModalMessage('You want to delete');
                  //   setAction('delete');
                  // } else {
                  //   changeCustomerStatus(true, row._id);
                  // }
                }}
                // href={`/admin/faq/edit/${row._id}`}
                iconclassName="bi bi-pencil-square"
                menuTitle="Delete"
              />
            </Dropdown.Item>

            {/* <Dropdown.Item>
              <MenuLink
                onShow={() => {
                  setCurrentId(row._id);
                  if (row.active) {
                    handleShow();
                    setConfirmModalMessage('You want to deactivate');
                    setAction('customerStatus');
                  } else {
                    changeCustomerStatus(true, row._id);
                  }
                }}
                iconclassName={
                  row.active ? 'bi bi-dash-square-dotted' : 'bi bi-check'
                }
                menuTitle={row.active ? 'Deactivate' : 'Activate'}
              />
            </Dropdown.Item>

            {row.isEmailVerified ? null : (
              <Dropdown.Item>
                <MenuLink
                  onShow={() => {
                    setCurrentId(row._id);
                    // if (row.isEmailVerified) {
                    handleShow();
                    setAction('emailStatus');
                    setConfirmModalMessage('You want to verify faq email');
                    // verifyEmail()
                    // }
                    //  else {
                    //   verifyEmail(row._id);
                    // }
                  }}
                  iconclassName="bi bi-envelope-check"
                  menuTitle="Email Verify"
                ></MenuLink>
              </Dropdown.Item> */}
            {/* )} */}
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  const handleReset = () => {
    setData(faqs);
  };

  const onFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((state) => ({ ...state, [name]: value }));
  };

  const onClickAddMore = () => {
    setData((state) => [...state, initState]);
  };

  const onClickRemove = (index, id) => {
    setData((state) => {
      // return state.filter(item => item._id === id )
      const newData = [...state];
      newData.splice(index, 1);
      return newData;
    });
    if (!id) {
      return;
    }
    setRemovedIds((state) => [...state, id]);
  };

  useEffect(() => {
    setData(faqs);
  }, [faqs]);

  useEffect(() => {
    dispatch(getAllFaq({ tourId: router.query.id }));
  }, []);

  const router = useRouter();

  const getFilteredData = () => {
    let data = [];
    if (faqs.length) {
      data = faqs.filter((faq) => {
        const isMatch = Object.entries(filters).every((arr) => {
          const [key, value] = arr;
          if (value) {
            console.log(key, value, faq[key]);
            //   if (key === 'question') {
            //     // const newData = faqs.filter((item) => {
            //     // const {customerCreationDate} = item;
            //     // console.log(customerCreationDate, 'date')
            //     return (
            //       new Date(faq.customerCreationDate) >
            //         new Date(dateRanges.startDate) &&
            //       new Date(faq.customerCreationDate) <
            //         new Date(dateRanges.endDate)
            //     );

            //     // } )
            //   }

            //   if (key === 'name') {
            //     let name = faq['firstName'] + ' ' + faq['lastName'];
            //     return name.toLowerCase()?.startsWith(value.toLowerCase());
            //   }

            //   if (key === 'isEmailVerified') {
            //     if (faq[key]) {
            //       if (value === 'Not Verified') {
            //         return false;
            //       }
            //     } else if (!faq[key]) {
            //       if (value === 'Verified') {
            //         return false;
            //       }
            //     }
            //     return true;
            //   }

            //   if (key === 'active') {
            //     if (faq[key]) {
            //       if (value === 'Deactive') {
            //         return false;
            //       }
            //     } else if (!faq[key]) {
            //       if (value === 'Active') {
            //         return false;
            //       }
            //     }
            //     return true;
            //   }

            if (typeof faq[key] === "string") {
              return faq[key].toLowerCase()?.startsWith(value.toLowerCase());
            }

            return faq[key] === value;
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
            // onFocus={showDateFilter}
            type="text"
            style={{ minWidth: 300 }}
            placeholder="Search by Answer"
            name="answer"
            value={filters.answer}
            onChange={onFilterChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            style={{ minWidth: 300 }}
            placeholder="Search by Question"
            value={filters.question}
            name="question"
            onChange={onFilterChange}
          />
        </Form.Group>
        {/* <Form.Group>
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
        </Form.Group> */}
        {/* <Form.Group>
          <Form.Select
            name="active"
            onChange={onFilterChange}
            style={{ minWidth: 300 }}
          >
            <option>Search by Status</option>
            <option>Active</option>
            <option>Deactive</option>
          </Form.Select>
        </Form.Group> */}
        {/* <Form.Group>
          <Form.Select
            style={{ minWidth: 300 }}
            name="isEmailVerified"
            onChange={onFilterChange}
          >
            <option>Search by Email Status</option>
            <option>Verified</option>
            <option>Not Verified</option>
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // const isDataValid = data?.every((item) => {
    //     const result = Object.values(item)?.every((value) => {
    //         // if(value){
    //         //     retu
    //         // }
    //         return Boolean(value)
    //     })

    //     return result
    // });

    // if(!isDataValid){
    //     return ;
    // }

    // dispatch(updateItineraries({faqs:data, removedIds}))
  };

  return (
    <>
      <div className="bg-color" style={{ padding: 20 }}>
        <div>
          <Search header="Collapse" body={SearchBody} />
        </div>
        <div
          style={{ display: "flex", justifyContent: "flex-end", margin: 10 }}
        >
          <Button
            variant="primary"
            style={{ width: 100 }}
            onClick={() => {
              router.push(`/admin/faq/add/${router.query.id}`);
            }}
          >
            {"Add "}
          </Button>
        </div>

        {/* <Main /> */}

        {/*         
        {data?.map((itinerary, index) => (

            
            <Intinerary onClickRemove={onClickRemove} index={index} setData={setData} key={itinerary._id} data={itinerary}></Intinerary>

        ))} */}

        <DataTable columns={columns} data={data} pagination />
        {/* <div style={{ display: "flex", justifyContent:'flex-end' }}>
        <Button onClick={onClickAddMore} variant='secondary' style={{alignSelf:'right', height:'fit-content'}}>Add More</Button>
        </div> */}
        {/* <div style={{ display: "flex" }}>
        <Button
          variant="primary"
        //   onClick={handleSubmit}
          style={{
            alignSelf: "center",
            height: "fit-content",
            marginLeft: 10,
          }}
          // disabled={!text || !image }
        //   disabled={!text || !symbol }
        //   disabled={!text || !image || !symbol}
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
          onClick={() => {
            // handleReset();
          }}
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
      </div> */}

        {/* <Main /> */}

        <ConfirmModal
          title="Are you sure?"
          body={confirmModalMessage}
          btn1Text="Ok"
          btn2Text="Cancel"
          onFirst={() => {
            if (action === "delete") {
              // verifyEmail();
              // deleteFaq()
              onClickDelete();
            } else {
              // changeCustomerStatus(false);
            }
          }}
          show={isConfirmationModalOpen}
          onClose={toggleConfirmationModal}
        />
      </div>
    </>
  );
}
