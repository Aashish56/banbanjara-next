import { CKEditor } from 'ckeditor4-react';
import { useRouter } from 'next/router';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Card, Form, Row ,Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleAttraction, updateAttraction , createAttraction, getAllAttraction } from 'redux/actions/attraction';
import { createReviewPage, getReviewPage, updateReviewPage } from 'redux/actions/review';

const form = () => {


  const router = useRouter();

  const dispatch = useDispatch();
  const {reviewPage} = useSelector(state=>state);
    //  console.log( 'state -------------------> ' , state);

     useEffect(()=>{
       dispatch(getReviewPage())
     },[]);


     useEffect(()=>{
        setReviewObject((prev)=>({
              ...prev , 
              title : reviewPage[0]?.title || "",
              file :  reviewPage[0]?.file || '' ,
              type:reviewPage[0]?.type || "",
              previewCoverImage:  `${window.location.origin}/${reviewPage[0]?.file}`,
              description:reviewPage[0]?.description ||'',
        }));
           
         reviewPage[0]?.cards?.forEach((el)=> el.previewIcon = `${window?.location?.origin}/${el?.icon}`);

         setReviewCards(reviewPage[0]?.cards);


     },[reviewPage])


//   useEffect(()=>{
//     if(id){
//       attraction?.singleAttraction?.attractionCards.forEach((el) => el.previewImage = `${window?.location?.origin}/uploads/attractionPage/${el.image}`);
//       attraction?.singleAttraction?.promontionSideBar.forEach((el) => el.previewImage = `${window?.location?.origin}/uploads/attractionPage/${el.image}`);
//       attraction?.singleAttraction?.promotionBar.forEach((el) => el.previewImage = `${window?.location?.origin}/uploads/attractionPage/${el.image}`);
//       setAttractionCards(attraction?.singleAttraction?.attractionCards);
//       setPromotionalSideBar(attraction?.singleAttraction?.promontionSideBar);
//       setPromotionalBar(attraction?.singleAttraction?.promotionBar);
//       setAttractionObject((prev)=>({
//               ...prev , 
//               country:    attraction?.singleAttraction?.country  ,  
//               city :   attraction?.singleAttraction?.city , 
//               state :  attraction?.singleAttraction?.state ,
//               title :    attraction?.singleAttraction?.title ,
//               coverImage :    attraction?.singleAttraction?.coverImage  ,
//               previewCoverImage:   `${window?.location?.origin}/uploads/attractionPage/${attraction?.singleAttraction?.coverImage} ` 
//       }))
//     }

//   },[attraction?.singleAttraction])

  

const [previewImages , setPreviewImages] = useState({});
const [reviewObject , setReviewObject] = useState({
    title :  '',
    file :  ''  ,
    type:'',
    previewFile:    '',
    description:'',
    // faq: [{
    //     question: '',
    //     answer: '',
    //     order: '',
    // }],
});

const [reviewCards , setReviewCards] = useState([{
        title: "",
        order:'',
        redirectionUrl:'',  
        icon:'',
        previewIcon:''
}]);


console.log('reviewObject -------------------> ' , reviewObject)



const UploadFile = async (file, url , type) => {
    try {
      let header2 = new Headers({
        // 'Content-Type': 'multipart/form-data',
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyMi0wMS0xMFQxNzowNjoyOC41MDhaIiwiZW1haWwiOiJ2aWtyYW0uZHpvbmVAZ21haWwuY29tIiwiaWF0IjoxNjQxODM0Mzg4fQ.YeRkCmwfq49DXmWyp8f59qtMzgwo4PStigl7rgrwDoI",
      });

      var formData = new FormData();
      if(type==="image"){
        formData.append("image", file);
      }
      else{
        formData.append("video" , file);
      }
      

      const requestOptions = {
        method: "POST",
        body: formData,
        headers: header2,
      };

      if(type ==='image'){
        const resp = await fetch(
            `/api/reviewPage/uploadImage/${url}`,
            requestOptions
          );
          // console.log(resp);
          const data = await resp.json();
          console.log(data, "data 🍉🍉🍉🍉🍉🍉");
          return data?.image?.filename;
      }
      else{
        const resp = await fetch(
            `/api/reviewPage/uploadVideo`,
            requestOptions
          );
          // console.log(resp);
          const data = await resp.json();
          console.log( "data from the Upload Video " , data )
          // console.log(data, "data 🍉🍉🍉🍉🍉🍉");
          return data?.filename;
      }
     
    } catch (error) {
      console.log(error);
    }
  };

  


  const  isFileImage = (file) => {
        return file && file['type'].split('/')[0] === 'image';
    }


const reviewValuesHandler = (e)=>{
    if(e.target.name==='coverImage'){
        // console.log(  "this si file --------------->ś" , isFileImage(e.target.files[0]));
        if(isFileImage(e.target.files[0])){
            UploadFile(e.target.files[0] , 'reviewPage' , 'image').then(data=>{
                setReviewObject((prev)=>({
                    ...prev ,
                    coverImage : `uploads/reviewPage/${data}` ,
                    previewCoverImage : window.location.origin +
                    `/uploads/reviewPage/${data}`,
                    type:'image'
                 }))
             })
        }
        else{
            UploadFile(e.target.files[0] , 'reviewPage' , 'video').then(data=>{
                setReviewObject((prev)=>({
                    ...prev ,
                    coverImage : `uploads/videos/${data}`,
                    previewCoverImage : window.location.origin +
                    `/uploads/videos/${data}`,
                    type:'video'
                 }))
             })
        }
    }
      setReviewObject((prev)=>({
         ...prev , 
         [e.target.name] : e.target.value
      }))
}









const handleSubmit  = async (e)=>{
             e.preventDefault();
   const formData  = {
      title: reviewObject?.title,
      description : reviewObject?.description,
      file:reviewObject?.coverImage,
      cards:reviewCards,
      type:reviewObject?.type
   }



   if(reviewPage.length && reviewPage[0]?._id){
    console.log('in the If Part of ID -------------> ' , formData)
    formData._id = reviewPage[0]?._id;
     dispatch(updateReviewPage(formData)).then(()=>{
      router.push('/admin')
     })
   }
   else{
    dispatch(createReviewPage(formData)).then(()=>{
      router.push('/admin')
    })
   }

  //  if(id){
  //   formData._id = id;
  //   // console.log('in the IF condition ---------------> ' , !!id);
  //   dispatch(updateAttraction(formData)).then(()=>{
  //   //   dispatch(getAllAttraction());
  //   //   router.push('/admin/attraction');
  //     resetAllState();
  //   })
   
  //  }
  //  else{
  //   // console.log('in the else Part ', !!id);
  //   dispatch(createAttraction(formData)).then(()=>{
  //   //   dispatch(getAllAttraction());
  //   //   router.push('/admin/attraction');
  //     resetAllState();
  //   })
  //  }

  //  const resp =  await fetch('/api/reviewPage/createReviewPage', {
  //   method: 'POST',
  //   headers: {'Content-Type':'application/json'},
  //   body: JSON.stringify(formData)
  //  });

  //   const dataMain = await resp.json();
  //   console.log('this is the data form the servier ----------------> ' , dataMain);
    
}

const handleReset = ()=>{
    console.log('handle Reset called ----------->')
}


const addMoreCards = ()=>{
    setReviewCards((prev)=>{
          const prevData = [...prev];
          prevData.push({
            title: "",
            order:'',
            redirectionUrl:'',
            icon:'',
            previewIcon:''
          });
          return prevData;
    })
}

const CardValueHandler = (type , event , index , section)=>{
     const {name , value} = event.target;
       if(type === 'file'){
        UploadFile(event.target.files[0] ,'reviewPage','image').then(data=>{
            console.log('this is the Form Data ----------------> ' , data);
            setReviewCards((prev)=>{
                       const prevData = [...prev];
                       prevData[index].previewIcon = window.location.origin +`/uploads/reviewPage/${data}`;
                       prevData[index].icon = `uploads/reviewPage/${data}`;
                       return prevData
            })
            })
       }
       else{
        setReviewCards((prev)=>{
             const prevData  = [...prev];
             prevData[index][event.target.name] = event.target.value;
             return prevData;
        })
    }
}


console.log('this is the review Card ---------------------> ' , reviewCards &&  reviewCards[0]?.title);


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
          {!reviewPage.length ? `Add`  : `Edit `} Review  Page
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
            <div className='col-md-6'>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name='title' value={reviewObject.title} onChange={(e)=>reviewValuesHandler(e)}/>
            </div>
            <div className='col-md-6'>
            <div className='d-flex'>

            <Form.Group as={Col} controlId={`formAttractionCardObject`}>
            {reviewObject?.previewCoverImage ? (
                <img
                  src={reviewObject.previewCoverImage}
                  alt=""
                  style={{ width: "100px" }}
                />
              ) : (
                <img
                  src="/placeholder.png"
                  alt=""
                  className="form-img-avatar"
                  style={{ width: "100px" }}
                ></img>
              )}

              <div className="image-btn-parent-div">
                <Form.Group controlId={`formAttractionObject`}>
                  <Form.Label className="custom-file-upload">
                    Upload File
                  </Form.Label>
                  <Form.Control
                    name="coverImage"
                    type="file"
                    multiple={false}
                    onChange={(e) => reviewValuesHandler(e)}
                    // accept="icon/*"
                    className="image-input-field"
                  />
                </Form.Group>
              </div>
              </Form.Group>
            </div>
            </div>
            {/* </Form.Group> */}
            <div className='col-12 my-4'>
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name='description' value={reviewObject.description} onChange={(e)=>reviewValuesHandler(e)}/>
            </div>
        </Row>
       
 <Row>
  <hr className='my-3'/>
 <Col>
          {reviewCards?.map((cards, index) => (
            <Row className="my-5" key={index}>
              <div className="col-6 pr-3">
              <Form.Group  controlId="formGridLabel1">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  value={cards?.title}
                  type="text"
                  onChange={(e) => {
                    CardValueHandler("", e, index);
                  }}
                  placeholder="Title"
                />
              </Form.Group>
              </div>
             <div className='col-6 pl-3'>
             <Form.Group  controlId={`formRevieCard${index}`}>
              {cards?.previewIcon ? (
                <img
                  src={reviewCards[index].previewIcon}
                  alt=""
                  style={{ width: "100px" }}
                />
              ) : (
                <img
                  src="/placeholder.png"
                  alt=""
                  className="form-img-avatar"
                  style={{ width: "100px" }}
                ></img>
              )}
              <div className="image-btn-parent-div">
                <Form.Group controlId={`formRevieCard${index}`}>
                  <Form.Label className="custom-file-upload">
                    Upload Image
                  </Form.Label>
                  <Form.Control
                    name="icon"
                    type="file"
                    multiple={false}
                    onChange={(e) => CardValueHandler("file", e, index, "attractionCards")}
                    accept="icon/*"
                    className="image-input-field"
                  />
                </Form.Group>
              </div>
            </Form.Group>
             </div>

<div className='col-6 pr-3'>
<Form.Group  controlId="description">
            <Form.Label>
              Redirection Link <span className="tx-danger">*</span>
            </Form.Label>
            <Form.Control
                  name="redirectionUrl"
                  value={reviewCards[index].redirectionUrl}
                  type="text"
                  onChange={(e) => {
                    CardValueHandler("", e, index);
                  }}
                  placeholder="Redirection Url "
                />
            
          </Form.Group>
</div>


       <div className='col-6 pl-3'>
       <Form.Group  controlId="description">
            <Form.Label>
              Order <span className="tx-danger">*</span>
            </Form.Label>
            <Form.Control
                  name="order"
                  value={reviewCards[index].order}
                  type="number"
                  onChange={(e) => {
                    CardValueHandler("", e, index);
                  }}
                  placeholder="Order "
                />
          </Form.Group>
        </div>   
         
<hr className='my-4' />
            </Row>

          ))}
        </Col>
 </Row>
 <div className=' mt-2 d-flex justify-content-center'>
        <Button  onClick={addMoreCards} variant='primary' className='my-2'>Add More Cards </Button>
        </div>
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
                {reviewPage.length ? 'Update' : 'Submit'}
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