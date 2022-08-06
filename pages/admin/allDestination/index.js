import { useRouter } from 'next/router';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Card, Form, Row ,Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// import { getSingleAttraction, updateAttraction , createAttraction, getAllAttraction } from 'redux/actions/attraction';

const form = () => {


  const router = useRouter();
  const {id} = router.query;
  console.log('this is ID ' , id );

  const dispatch = useDispatch();
//   const {attraction} = useSelector(state=>state);

  useEffect(()=>{
    fetch('http://localhost:3344/api/allDestination/getDestination',{
        method:'POST'
    }).then(data=> data.json()).then(({data})=>{
        if(data?.length){
            setDesinationObject(prev=>({
                ...prev,
                  country:data[0].country,
                  state: data[0].state , 
                  title:data[0].title,
                  city : data[0].city,
                  coverImage : data[0].coverImage,
                  previewCoverImage : window.location.origin+'/uploads/allDestination/'+data[0]?.coverImage,
                  _id: data[0]?._id
            }))
            }
        });
  },[]);




  

const [previewImages , setPreviewImages] = useState({});
const [desinationObject , setDesinationObject] = useState({
    country:   '' ,  
    city :     '', 
    state :    '',
    title :  '',
    coverImage :  ''  ,
    previewCoverImage:    ''
});



const UploadFile = async (file, url) => {
    try {
      let header2 = new Headers({
        // 'Content-Type': 'multipart/form-data',
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyMi0wMS0xMFQxNzowNjoyOC41MDhaIiwiZW1haWwiOiJ2aWtyYW0uZHpvbmVAZ21haWwuY29tIiwiaWF0IjoxNjQxODM0Mzg4fQ.YeRkCmwfq49DXmWyp8f59qtMzgwo4PStigl7rgrwDoI",
      });

      var formData = new FormData();
      formData.append("image", file);

      const requestOptions = {
        method: "POST",
        body: formData,
        headers: header2,
      };
      const resp = await fetch(
        `/api/allDestination/uploadImage/${url}`,
        requestOptions
      );
      // console.log(resp);
      const data = await resp.json();
      // console.log(data, "data 🍉🍉🍉🍉🍉🍉");
      return data?.image?.filename;
    } catch (error) {
      console.log(error);
    }
  };


const destinationValuesHandler = (e)=>{
    if(e.target.name==='coverImage'){
         UploadFile(e.target.files[0] , 'allDestination').then(data=>{
            console.log('this is the Form Data ----------------> ' , data);
            setDesinationObject((prev)=>({
                ...prev ,
                coverImage : data ,
                previewCoverImage : window.location.origin +
                `/uploads/allDestination/${data}`,
             }))
         })
    }
      setDesinationObject((prev)=>({
         ...prev , 
         [e.target.name] : e.target.value
      }))
}

const resetAllState = ()=>{
     setDesinationObject((prev)=>({
        ...prev , 
    country: '' ,  
    city : '', 
    state : '',
    title :  '',
    coverImage :  ''  ,
    previewCoverImage: ''
     }))
}




const handleSubmit  = async (e)=>{
             e.preventDefault();
//   console.log('Befoer Deleting preview Image Object key ----------------> ' , {attractionCards , promotionalBar , promotionalSideBar})
//   console.log('after Deleting preview Image Object key ----------------> ' , {attractionCards , promotionalBar , promotionalSideBar})

  

   const formData  = {
     title:desinationObject?.title,
      state:desinationObject?.state ,
      coverImage:desinationObject?.coverImage,
      country:desinationObject?.country,
      city:desinationObject?.city,
      _id : desinationObject?._id || null
     
   }

   if(formData?._id){
    console.log('in the ID Part --------------> ' )
    const data = await fetch('http://localhost:3344/api/allDestination/updateDestination',{
        method:'POST',
        headers:{
          'content-type': 'application/json'
        },
        body:JSON.stringify(formData)
 });
 const resp = await data.json();
   console.log('this is Resp ----------------> ' , resp);
   resetAllState();
   router.push('/admin');
   }
   else{
    console.log('in the not of ID Part --------------> ' )
    const data = await fetch('http://localhost:3344/api/allDestination/createDestination',{
        method:'POST',
        headers:{
          'content-type': 'application/json'
        },
        body:JSON.stringify(formData)
 });
 const resp = await data.json();
   console.log('this is Resp ----------------> ' , resp);
   resetAllState();
   router.push('/admin');
   }    
}

const handleReset = ()=>{
    console.log('handle Reset called ----------->')
}



  return (
    <Card style={{ margin: "10px" }}>
      <Card.Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontWeight: "700", fontSize: "15px" }}>
          {!id ? `Add`  : `Edit `} Attraction Page
        </span>
        <Button variant="primary" style={{ width: 100 }} onClick={router.back}>
          <i style={{ fontSize: 12 }} className="bi bi-arrow-left"></i>
          {" Back"}
        </Button>
      </Card.Header>
      <Card.Body>
        <Form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit}
        >
          <div style={{ marginBottom: "10px" }}>
          <Col
        className="mb-3"
        style={{
          border: "1px solid #afadad",
          padding: " 20px 10px",
          borderRadius: "3px",
        }}
      >
        <Row className='my-3'>
        {/* <Form.Group as={Col} controlId="formGridLabel2"> */}
            <div className=' col-md-4'>
            <Form.Label>Country</Form.Label>
            <Form.Control type="text" name='country' value={desinationObject.country} onChange={(e)=>destinationValuesHandler(e)}/>
            </div>
            <div className='col-md-4'>
            <Form.Label>State</Form.Label>
            <Form.Control type="text" name='state' value={desinationObject.state} onChange={(e)=>destinationValuesHandler(e)}/>
            </div>
            <div className='col-md-4'>
            <Form.Label>City</Form.Label>
            <Form.Control type="text" name='city' value={desinationObject.city} onChange={(e)=>destinationValuesHandler(e)}/>
            </div>
            <div className='col-md-6'>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name='title' value={desinationObject.title} onChange={(e)=>destinationValuesHandler(e)}/>
            </div>
            <div className='col-md-6'>
            <div className='d-flex'>
            {/* <Form.Control type="file" name='coverImage'  onChange={(e)=>destinationValuesHandler(e)} /> */}
            
            {desinationObject?.previewCoverImage ? (
                <img
                  src={desinationObject.previewCoverImage}
                  alt=""
                  style={{ width: "100px" }}
                />
              ) : (
                <img
                  src="/placeholder.png"
                  alt=""
                  className="form-img-avatar"
                  style={{ width: "100px" }}
                />
              )}
            <div className="image-btn-parent-div">
                <Form.Group controlId='alldestinationObject'>
                  <Form.Label className="custom-file-upload">
                    Upload Image
                  </Form.Label>
                  <Form.Control
                    name="coverImage"
                    type="file"
                    multiple={false}
                    onChange={(e) => destinationValuesHandler(e)}
                    accept="icon/*"
                    className="image-input-field"
                  />
                </Form.Group>
              </div>


            </div>
            </div>
            {/* </Form.Group> */}
        </Row>
 </Col>


          </div>
            <div style={{ display: "flex" }}>
              <Button
                variant="primary"
                type="submit"
                style={{
                  alignSelf: "center",
                  height: "fit-content",
                }}
              >
                {id ? 'Update' : 'Submit'}
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
        </Form>
      </Card.Body>
    </Card>
  )
}

export default form