import React, { useState, useEffect } from "react";
// library
import { Form, Button, Tabs, Tab, Card, Table  ,Dropdown ,DropdownButton, Row} from "react-bootstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux"; 
import { toast } from "react-toastify";
import moment from "moment";
import { deleteAttraction, getAllAttraction, updateAttraction , updateAttractionStatus } from "redux/actions/attraction";
import Search from "components/Search";
import DataTable from "react-data-table-component";
import MenuLink from "components/MenuLink";
const AttractionPage = (props) => {
  const dispatch = useDispatch();
  const homePageData = useSelector((state) => state.homePage);

  const [attractionData, setAttractionData] = useState([]);
  const [searchValue , setSearchValue] = useState('');
  const [selectStatus , setSelectStatus] = useState('');
  const router = useRouter();
  const {attraction } = useSelector(state=> state);
   


  useEffect(() => {
    props.setTitle("Attraction Page");
    dispatch(getAllAttraction());
  }, []);

  useEffect(()=>{
    setAttractionData(attraction?.attractionData)
  },[attraction])


// console.log( 'this is attraction Dataa ----------------->' , attractionData)

const deleteAttractionHandler = (id)=>{
          dispatch(deleteAttraction(id)).then(()=>{
            dispatch(getAllAttraction());
          })
} 

useEffect(()=>{
  if(!searchValue){
    setAttractionData(attraction?.attractionData)
  }
  else{
    const filtredData = [];
    attraction?.attractionData.forEach((el)=>el?.title?.toLowerCase().includes(searchValue.toLowerCase()) && filtredData.push(el));
       setAttractionData(filtredData);
  }
},[searchValue]);

useEffect(()=>{
  console.log( 'select statuus' , selectStatus)
  if(!selectStatus){
    setAttractionData(attraction?.attractionData)
  }
  else{
    if(selectStatus === '0'){ 
           setAttractionData(()=>{
            const filtredData = attraction?.attractionData?.filter(el=>(el?.isDisable === selectStatus));
            return filtredData;
           });     
    }
    else{
      setAttractionData(()=>{
        const filtredData = attraction?.attractionData?.filter(el=>(el?.isDisable === selectStatus));
             return  filtredData;
       }); 
    }
  }
},[selectStatus]);

const statusHandler = (el)=>{
     dispatch(updateAttractionStatus(el)).then((()=>{
      dispatch(getAllAttraction())
     }));
}

const handleReset = ()=>{
  setSearchValue('');
  setSelectStatus('');
}

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


const columns = [
  {
    name: "Image",
    sortable: false,
    selector: (row) =>
      row.coverImage ? (
        <img
          src={`${window?.location?.origin}/uploads/attractionPage/${row?.coverImage}`}
          width={50}
          height={50}
        />
      ) : null,
  },
  {
    name: "Title",
    sortable: true,
    selector: (row) => <span className="text-capital">{row?.title}</span>,
  },
  {
    name: "City",
    sortable: true,
    selector: (row) => row?.city?.name,
  },

  {
    name: "View Page",
    sortable: true,
    selector: (row) => <a  target="_blank" rel="noreferrer" href={`${window?.location?.origin}/attraction/${row?.title?.split(' ').join('-')}`} className="text-capital cursor-pointer">View Page</a>,
  },
  {
    name: "Status",
    sortable: true,
    selector: (row) => (row?.isDisable ==="1" ? "Active" : "Deactive"),
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
        {row?.isDisable === "1" ? "Active" : "Deactive"}
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
        <Dropdown.Item onClick={() => router.push({pathname:"/admin/attraction/form" , query:{id:row?._id}})} >
        <MenuLink
          menuTitle="Edit"
        />
          </Dropdown.Item>
          <Dropdown.Item onClick={() => router.push({pathname:"/admin/attraction/addFaq" , query:{id:row?._id}})} >
        <MenuLink
          menuTitle="Add FAQ"
        />
          </Dropdown.Item>
          <Dropdown.Item>
            <MenuLink
              onShow={() => {statusHandler(row)}}
              iconclassName={
                row.isDisable==="1" ? "bi bi-dash-square-dotted" : "bi bi-check"
              }
              menuTitle={row?.isDisable === "1" ? "Deactivate" : "Activate"}
            />
          </Dropdown.Item>
          <Dropdown.Item onClick={()=>deleteAttractionHandler(row?._id)} >
          <MenuLink menuTitle='Delete'/>
            </Dropdown.Item>

        </Dropdown.Menu>
      </Dropdown>
    ),
  },
];


  return (
    <div className="fs-14 mt-3">
      <div className="my-4">
      <Search header="Collapse" body={SearchBody} />
        <div className="d-flex justify-content-end align-items-center mx-4 mt-4" >
        <Button
        className="d-flex justify-content-center align-items-center py-2"
          variant="primary"
          style={{ width: 100 }}
          onClick={()=>router.push("/admin/attraction/form")}
        >
          {"Add Page"}
          <i style={{ fontSize: 12 }} className="bi bi-plus-square ms-2"></i>
        </Button>
        {/* <Button className="ms-auto" onClick={} variant="primary">Add Page </Button> */}
        </div>
      </div>
       

        <DataTable
            columns={columns}
            data={attractionData}
            pagination
            noDataComponent="No Records Found !"
            persistTableHead
          />

        {/* <div className="mt-4 row">
          <div className="col-2 text-center">
          <b>Image</b> 
          </div>
          <div className="col-2 text-center">
          <b>Title</b>  
          </div>
          <div className="col-2 text-center">
          <b>City</b>  
          </div>
          <div className="col-2 text-center">
          <b>View Page</b> 
          </div>
          <div className="col-2 text-center">
            <b>Status</b> 
          </div>
          <div className="col-2 text-center">
             <b>Action</b>
          </div>
          <hr className="my-2" />
      {attractionData?.map((el)=>(
        <Row className="mt-4 border-bottom" key={el?._id}>
  <div className="col-2">
      <img width={80} className='d-block mx-auto' src={`${window?.location?.origin}/uploads/attractionPage/${el?.coverImage}`} alt="" />
  </div>
  <div className="col-2 text-center">
  <p>{el?.title}</p>  
  </div>
  <div className="col-2 text-center">
  <p>{el?.city || '-'}</p>  
  </div>
  <div className="col-2 text-center">
    <p className="cursor-pointer" onClick={()=>{const sluggedData = el?.title?.split(' ').join('-'); router.push(`/attraction/${sluggedData}`)}}>See Page</p>  
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
          <Dropdown.Item onClick={() => router.push({pathname:"/admin/attraction/form" , query:{id:el?._id}})} >
            Edit
          </Dropdown.Item>  
          <Dropdown.Item onClick={() => router.push({pathname:"/admin/attraction/addFaq" , query:{id:el?._id}})}>
            Add Faq
          </Dropdown.Item>
          <Dropdown.Item onClick={()=>statusHandler(el)}>
          {el?.isDisable === '0'? 'Activate' : "Deactivate"}
          </Dropdown.Item>
          <Dropdown.Item onClick={()=>deleteAttractionHandler(el?._id)} >
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
  </div>
  </Row>

      ))}




        </div> */}
        {/* <Table responsive hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Image</th>
      <th>Title</th>
      <th>City</th>
      <th>Front URL</th>
      <th>Status</th>
      <th>Created</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>
            
   </td>
    </tr>
  </tbody>
</Table> */}
    </div>
  );
};
export default AttractionPage;
