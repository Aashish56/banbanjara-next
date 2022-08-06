import React, { useState, useEffect } from "react";
// library
import { Form, Button, Tabs, Tab, Card, Table  ,Dropdown ,DropdownButton, Row} from "react-bootstrap";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux"; 
import { getAllReviews , deleteReview  , updateReviewStatus} from "redux/actions/reviewManagement";
import DataTable from "react-data-table-component";
import MenuLink from "components/MenuLink";
import Search from "components/Search";
const ReviewManagement = (props) => {
  const dispatch = useDispatch();
  const homePageData = useSelector((state) => state.homePage);

  const [imagePrefix, setImagePrefix] = useState('');
   
  const [reviewManagementData , setReviewManagementData] = useState([]);
  const [searchValue , setSearchValue] = useState('');
  const [selectStatus , setSelectStatus] = useState('');  

  const {reviewManagement} = useSelector(state=> state);
  useEffect(()=>{
    setReviewManagementData(reviewManagement?.reviewsList)
  },[reviewManagement])

  const router = useRouter();




useEffect(()=>{
    if(!searchValue){
       setReviewManagementData(reviewManagement?.reviewsList)
    }
    else{
         const filtredData = [] ; 
         reviewManagementData?.forEach(el=> el?.tourTitle?.toLowerCase().includes(searchValue.toLowerCase()) && filtredData.push(el));
         setReviewManagementData(filtredData);
    }
},[searchValue])

  useEffect(() => {
    setImagePrefix(window?.location?.origin);
        props.setTitle("Review Management");
    // getAttractionData();
    dispatch(getAllReviews());
  }, []);



  useEffect(()=>{
    console.log( 'select statuus' , selectStatus)
    if(!selectStatus){
      setReviewManagementData(reviewManagement?.reviewsList)
    }
    else{
      if(selectStatus === '0'){ 
        setReviewManagementData(()=>{
              const filtredData = reviewManagement?.reviewsList?.filter(el=>(el?.isDisable === selectStatus));
              return filtredData;
             });     
      }
      else{
        setReviewManagementData(()=>{
          const filtredData = reviewManagement?.reviewsList?.filter(el=>(el?.isDisable === selectStatus));
               return  filtredData;
         }); 
      }
    }
  },[selectStatus]);


  
const handleReset = ()=>{
  setSearchValue('');
  setSelectStatus('');
}

const deleteReviewHandler = (id)=>{
          dispatch(deleteReview(id)).then(()=>{
            dispatch(getAllReviews());
          })
}



const statusHandler = (el)=>{
  dispatch(updateReviewStatus(el)).then((()=>{
   dispatch(getAllReviews())
  }));
}


const columns = [
  {
    name: "Image",
    sortable: false,
    selector: (row) =>
      row.image ? (
        <img
          src={imagePrefix+row?.image}
          width={50}
          height={50}
        />
      ) : null,
  },
  {
    name: "User",
    sortable: true,
    selector: (row) => <span className="text-capital">{row.user}</span>,
  },
  {
    name: "Title",
    sortable: true,
    selector: (row) => row?.tour?.title,
  },
  {
    name: "Status",
    sortable: true,
    selector: (row) => (row.isDisable ==="1" ? "Active" : "Deactive"),
    cell: (row) => (
      <span
        style={
          row.isDisable ==="1"
            ? {
                padding: "5px 10px",
                color: "white",
                backgroundColor: "green",
              }
            : { padding: "5px 10px", color: "white", backgroundColor: "red" }
        }
      >
        {row.isDisable === "1" ? "Active" : "Deactive"}
      </span>
    ),
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
        <Dropdown.Item onClick={() => router.push({pathname:"/admin/reviewManagement/form" , query:{id:row?._id}})} >
        <MenuLink
          menuTitle="Edit"
        />
          </Dropdown.Item>
          <Dropdown.Item>
            <MenuLink
              onShow={() => {statusHandler(row)}}
              iconclassName={
                row.isDisable==="1" ? "bi bi-dash-square-dotted" : "bi bi-check"
              }
              menuTitle={row.isDisable === "1" ? "Deactivate" : "Activate"}
            />
          </Dropdown.Item>
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
          value={searchValue || ""}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </Form.Group>
      <Form.Group style={{ marginLeft: 10 }}>
        <Form.Select
          value={selectStatus || ""}
          onChange={(e) => setSelectStatus(e.target.value)}
          name="status"
        >
          <option value="">Search By Status</option>
          <option value={"1"}>Active</option>
          <option value={"0"}>Deactive</option>
        </Form.Select>
      </Form.Group>
      <Button
        variant="danger"
        type="reset"
        style={{ height: "fit-content", alignSelf: "center", marginLeft: 10 }}
        onClick={handleReset}
      >
        Reset
      </Button>
    </Form>
  </div>
);


// const SearchBody = ()=>(
//   <div style={{ display: "flex" }}>
//   <Form style={{ display: "flex", justifyContent: "space-between" }}>
//     <Form.Group>
//       {/* <Form.Label></Form.Label> */}
//       <Form.Control
//         type="text"
//         style={{ minWidth: 300 }}
//         placeholder="Search by Title"
//         value={searchValue}
//         onChange={(e)=>setSearchValue(e.target.value)}
//       />
//     </Form.Group>
//     <Button
//       variant="danger"
//       type="reset"
//       style={{ height: "fit-content", alignSelf: "center", marginLeft: 10 }}
//       onClick={() => setSearchValue('')}
//     >
//       Reset
//     </Button>
//   </Form>
//   </div>
// )



  return (
    <div className="fs-14 mt-3">

<div className="my-4">
      <Search header="Collapse" body={SearchBody} />
        <div className="d-flex justify-content-end align-items-center mx-4 mt-4" >
        <Button
        className="d-flex justify-content-center align-items-center py-2"
          variant="primary"
          style={{ width: 100 }}
          onClick={()=>router.push("/admin/reviewManagement/form")}
        >
          Add Review
          <i style={{ fontSize: 12 }} className="bi bi-plus-square ms-2"></i>
        </Button>
        {/* <Button className="ms-auto" onClick={} variant="primary">Add Page </Button> */}
        </div>
      </div>


      {/* <div className="my-3">
      <Search header="Collapse" body={SearchBody} />
      <div className="d-flex justify-content-end m-4" >
        <Button className="ms-auto" onClick={()=>router.push("/admin/reviewManagement/form")} variant="primary">Add Review</Button>
        </div>
      </div> */}
        

        <DataTable
            columns={columns}
            data={reviewManagementData}
            pagination
            noDataComponent="No Records Found !"
            persistTableHead
          />








        {/* <div className="mt-4 row">
          <div className="col-2 text-center">
          <b>Image</b> 
          </div>
          <div className="col-2 text-center">
          <b>User Name</b>  
          </div>
          <div className="col-2 text-center">
          <b>Title</b>  
          </div>
          <div className="col-2 text-center">
          <b>Stars</b>  
          </div>
          <div className="col-2 text-center">
            <b>Status</b> 
          </div>
          <div className="col-2 text-center">
             <b>Action</b>
          </div>
          <hr className="my-2" />


      {reviewManagementData?.map((el)=>(
        <Row className="mt-4 border-bottom" key={el}>
  <div className="col-2">
      <img width={80} style={{height:'40px' , objectFit:'cover'}} className='d-block mx-auto' src={`${imagePrefix}${el?.image}`} alt="" />
  </div>
  <div className="col-2 text-center">
  <p>{el?.user}</p>  
  </div>
  <div className="col-2 text-center">
  <p>{el?.tourTitle?.slice(0,150)}</p>  
  </div>
  <div className="col-2 text-center">
  <p>{el?.stars}</p>  
  </div>
  <div className="col-2 text-center">
  <span
          style={
            el?.isDisable === "1"
              ? {
                  padding: "5px 10px",
                  color: "white",
                  backgroundColor: "green",
                }
              : { padding: "5px 10px", color: "white", backgroundColor: "red" }
          }
        >
          {el?.isDisable === "1" ? "Active" : "Deactive"}
        </span>
  </div>
  <div className="col-2 text-center">
  <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Actions
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => router.push({pathname:"/admin/reviewManagement/form" , query:{id:el?._id}})} >
            Edit
          </Dropdown.Item>
          <Dropdown.Item onClick={()=>statusHandler(el)}>
          {el?.isDisable === '0'? 'Activate' : "Deactivate"}
          </Dropdown.Item>
          <Dropdown.Item onClick={()=>deleteReviewHandler(el?._id)}  >
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
  </div>
  </Row>

      ))}
        </div> */}
    </div>
  );
};
export default ReviewManagement;
