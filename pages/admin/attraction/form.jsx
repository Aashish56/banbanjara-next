
import { useRouter } from 'next/router';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Card, Form, Row ,Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleAttraction, updateAttraction , createAttraction, getAllAttraction } from 'redux/actions/attraction';
import { Country, State, City } from "country-state-city";
import Select from "react-select";

const form = () => {
  const router = useRouter();
  const {id} = router.query;
  console.log('this is ID ' , id );

  const dispatch = useDispatch();
  const {attraction} = useSelector(state=>state);

  useEffect(()=>{
   if(id){
    dispatch(getSingleAttraction(id)).then(()=>{
      console.log('then called after ' , attraction )
    })
   }
  },[id]);



  useEffect(()=>{
    if(id){
      attraction?.singleAttraction?.attractionCards.forEach((el) => el.previewImage = `${window?.location?.origin}/uploads/attractionPage/${el.image}`);
      attraction?.singleAttraction?.promontionSideBar.forEach((el) => el.previewImage = `${window?.location?.origin}/uploads/attractionPage/${el.image}`);
      attraction?.singleAttraction?.promotionBar.forEach((el) => el.previewImage = `${window?.location?.origin}/uploads/attractionPage/${el.image}`);
      setAttractionCards(attraction?.singleAttraction?.attractionCards);
      setPromotionalSideBar(attraction?.singleAttraction?.promontionSideBar);
      setPromotionalBar(attraction?.singleAttraction?.promotionBar);
      setAttractionObject((prev)=>({
              ...prev , 
              country:    attraction?.singleAttraction?.country  ,  
              city :   attraction?.singleAttraction?.city , 
              state :  attraction?.singleAttraction?.state ,
              title :    attraction?.singleAttraction?.title ,
              coverImage :    attraction?.singleAttraction?.coverImage  ,
              previewCoverImage:   `${window?.location?.origin}/uploads/attractionPage/${attraction?.singleAttraction?.coverImage} ` 
      }));
      setIsDisable(attraction?.singleAttraction?.isDisable);
      setCountry(attraction?.singleAttraction?.country);
      setState(attraction?.singleAttraction?.state);
      setCity(attraction?.singleAttraction?.city);
    }


// console.log( 'single attraction --------------------> ' , attraction);

  },[attraction?.singleAttraction])

  

const [previewImages , setPreviewImages] = useState({});
const [country, setCountry] = useState([]);
const [state, setState] = useState([]);
const [city, setCity] = useState([]);
const [isDisable , setIsDisable] = useState('1');
const [attractionObject , setAttractionObject] = useState({
    country:   '' ,  
    city :     '', 
    state :    '',
    title :  '',
    coverImage :  ''  ,
    previewCoverImage:    ''
    // faq: [{
    //     question: '',
    //     answer: '',
    //     order: '',
    // }],
});

const [attractionCards , setAttractionCards] = useState([{
        title: "",
        description: "",
        image: "",
        previewImage : ''
}]);

const [promotionalBar , setPromotionalBar] = useState([{
    redirectionUrl : '' , 
    image : '',
    previewImage:''
}]);

const [promotionalSideBar , setPromotionalSideBar] = useState([{
    redirectionUrl : '' , 
    image : '',
    previewImage:''
}]);


console.log('attractionCards -------------------> ' , attractionCards)


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
        `/api/attractionPage/uploadImage/${url}`,
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



const attractionValuesHandler = (e)=>{
    if(e.target.name==='coverImage'){
         UploadFile(e.target.files[0] , 'attractionPage').then(data=>{
            console.log('this is the Form Data ----------------> ' , data);
            setAttractionObject((prev)=>({
                ...prev ,
                coverImage : data ,
                previewCoverImage : window.location.origin +
                `/uploads/attractionPage/${data}`,
             }))
         })
    }
      setAttractionObject((prev)=>({
         ...prev , 
         [e.target.name] : e.target.value
      }))
}

const resetAllState = ()=>{
     setPromotionalBar([{
      redirectionUrl : '' , 
      image : '',
      previewImage:''
     }]);
     setPromotionalSideBar([{
      redirectionUrl : '' , 
      image : '',
      previewImage:''
     }])
     setAttractionCards([{
      title: "",
      description: "",
      image: "",
      previewImage : ''
     }]);

     setAttractionObject((prev)=>({
        ...prev , 
    country: '' ,  
    city : '', 
    state : '',
    title :  '',
    coverImage :  ''  ,
    previewCoverImage:    ''
     }))
}


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


const customSelectStyles = {
  control: (base) => ({
      ...base,
      minHeight: 25,
  }),
  valueContainer: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
  }),
  dropdownIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
  }),
  clearIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
  }),
};


const handleSubmit  = async (e)=>{
             e.preventDefault();
  console.log('Befoer Deleting preview Image Object key ----------------> ' , {attractionCards , promotionalBar , promotionalSideBar})

  attractionCards.forEach((v)=> delete v.previewImage );
  promotionalSideBar.forEach((v)=> delete v.previewImage );
  promotionalBar.forEach((v)=> delete v.previewImage);
  

  console.log('after Deleting preview Image Object key ----------------> ' , {attractionCards , promotionalBar , promotionalSideBar})

  

   const formData  = {
      title:attractionObject?.title,
      state:attractionObject?.state ,
      coverImage:attractionObject?.coverImage,
      country:attractionObject?.country,
      city:attractionObject?.city,
      attractionCards:attractionCards,
      promontionSideBar:promotionalSideBar,
      promotionBar : promotionalBar,
      isDisable : isDisable
   }

   if(id){
    formData._id = id;
    // console.log('in the IF condition ---------------> ' , !!id);
    dispatch(updateAttraction(formData)).then(()=>{
      dispatch(getAllAttraction());
      router.push('/admin/attraction');
      resetAllState();
    })
   
   }
   else{
    // console.log('in the else Part ', !!id);
    dispatch(createAttraction(formData)).then(()=>{
      dispatch(getAllAttraction());
      router.push('/admin/attraction');
      resetAllState();
    })
   }

  //  const resp =  await fetch('/api/attractionPage/createAtraction', {
  //   method: 'post',
  //   headers: {'Content-Type':'application/json'},
  //   body: JSON.stringify({
  //     title:attractionObject?.title,
  //     state:attractionObject?.state ,
  //     coverImage:attractionObject?.coverImage,
  //     country:attractionObject?.country,
  //     city:attractionObject?.city,
  //     attractionCards:attractionCards,
  //     promontionSideBar:promotionalSideBar,
  //     promotionBar : promotionalBar,
  //   })
  //  });

  //   const dataMain = await resp.json();
  //   console.log('this is the data form the servier ----------------> ' , dataMain);
    
}

const handleReset = ()=>{
    console.log('handle Reset called ----------->')
}


const addMoreCards = ()=>{
    setAttractionCards((prev)=>{
          const prevData = [...prev];
          prevData.push({
            title: "",
            description: "",
            image: "",
            previewImage : ''
          });
          return prevData;
    })
}

const addMorePromitionalBar = ()=>{
    setPromotionalBar((prev)=>{
        const prevData = [...prev];
        prevData.push({
          image: "",
          redirectionUrl :'',
          previewImage : ''
        });
        return prevData;
  })
}
const addMorePromitionalSideBar = ()=>{
    setPromotionalSideBar((prev)=>{
        const prevData = [...prev];
        prevData.push({
          image: "",
          redirectionUrl :'',
          previewImage : ''
        });
        return prevData;
  })
}


console.log({country , state , city});

const attractionCardValueHandler = (type , event , index , section)=>{
     const {name , value} = event.target;
       if(type === 'file'){
        UploadFile(event.target.files[0] , 'attractionPage').then(data=>{
            console.log('this is the Form Data ----------------> ' , data);
            setAttractionCards((prev)=>{
                       const prevData = [...prev];
                       prevData[index].previewImage = window.location.origin +`/uploads/attractionPage/${data}`;
                       prevData[index].image = data;
                       return prevData
            })
          })
       }
       else{
        setAttractionCards((prev)=>{
             const prevData  = [...prev];
             prevData[index][event.target.name] = event.target.value;
             return prevData;
        })
    }
}

const promotionalBarValueHandler = (type , event , index , section)=>{
    const {name , value} = event.target;
    if(type === 'file'){
     UploadFile(event.target.files[0] , 'attractionPage').then(data=>{
        //  console.log('this is the Form Data ----------------> ' , data);
         setPromotionalBar((prev)=>{
                    const prevData = [...prev];
                    prevData[index].previewImage = window.location.origin +`/uploads/attractionPage/${data}`;
                    prevData[index].image = data;
                    return prevData
         })
         })
    }
    else{
     setPromotionalBar((prev)=>{
          const prevData  = [...prev];
          prevData[index][event.target.name] = event.target.value;
          return prevData;
     })
 }
}

const promotionalSideBarValueHandler = (type , event , index , section)=>{
    const {name , value} = event.target;
    if(type === 'file'){
     UploadFile(event.target.files[0] , 'attractionPage').then(data=>{
        //  console.log('this is the Form Data ----------------> ' , data);
        setPromotionalSideBar((prev)=>{
                    const prevData = [...prev];
                    prevData[index].previewImage = window.location.origin +`/uploads/attractionPage/${data}`;
                    prevData[index].image = data;
                    return prevData
         })
         })
    }
    else{
        setPromotionalSideBar((prev)=>{
          const prevData  = [...prev];
          prevData[index][event.target.name] = event.target.value;
          return prevData;
     })
 }
}

console.log( 'attractionObject ----------------> ' , attractionObject )

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
        <Row className='my-3 align-items-center'>
        {/* <Form.Group as={Col} controlId="formGridLabel2"> */}  


        <div className='col-12 my-2'>
            <div className='d-flex justify-content-center'>
            <Form.Group as={Col} controlId={`formAttractionCardObject`}>
            {attractionObject?.previewCoverImage ? (
                <img className='d-block mx-auto mb-3'
                  src={attractionObject.previewCoverImage}
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

              <div className="image-btn-parent-div  d-flex justify-content-center">
                <Form.Group controlId={`formAttractionObject`}>
                  <Form.Label className="custom-file-upload">
                    Upload Cover Image
                  </Form.Label>
                  <Form.Control
                    name="coverImage"
                    type="file"
                    multiple={false}
                    onChange={(e) => attractionValuesHandler(e)}
                    accept="icon/*"
                    className="image-input-field"
                  />
                </Form.Group>
              </div>
              </Form.Group>
            </div>
            </div>



        <Form.Group style={{ flexBasis: "50%"}}>
                            <Select
                                id="country"
                                instanceId="country"
                                name="country"
                                label="Country"
                                options={updatedCountries}
                                value={country || ""}
                                onChange={(res) => {
                                  console.log('This is the Country Response -----------> ' , res)
                                  setCountry(res);  
                                    const value = {
                                      target:{
                                        value: res,
                                        name:'country'
                                      }
                                    }  
                                    attractionValuesHandler(value)
                                }}
                                placeholder="Select Country"
                            />

                            {/* {formik.touched.country && formik.errors.country ? (
                                <div style={{ color: 'red' }}>{formik.errors.country}</div>
                            ) : null} */}
                        </Form.Group>

                        <Form.Group  style={{ flexBasis: "50%" }}>
                        <Select
                                id="state"
                                instanceId="state"
                                name="state"
                                className='py-2'
                                label="State"
                                options={updatedStates(country ? country.value : null)}
                                value={state|| ""}
                                onChange={(res) => {
                                  console.log('This is the State Response -----------> ' , res)
                                  setState(res);
                                  const value = {
                                    target:{
                                      value: res,
                                      name:'state'
                                    }
                                  }  
                                  attractionValuesHandler(value)
                                }}
                                placeholder="Select State"
                                styles={customSelectStyles}
                            />
                            {/* {formik.touched.state && formik.errors.state ? (
                                <div style={{ color: 'red' }}>{formik.errors.state}</div>
                            ) : null} */}
                        </Form.Group>

                        <Form.Group style={{ flexBasis: "50%" }}>
                            <Select
                                id="city"
                                instanceId="city"
                                name="city"
                                label="City"
                                options={updatedCities(
                                  state?.countryCode || null,
                                  state ? state.value : null
                              )}
                                value={city || ""}
                                onChange={(res) => {
                                  console.log('This is the City Response -----------> ' , res)
                                  setCity(res);
                                  const value = {
                                    target:{
                                      value: res,
                                      name:'city'
                                    }
                                  }  
                                  attractionValuesHandler(value)
                                }}
                                placeholder="Select City"
                                styles={customSelectStyles}
                            />
                            {/* {formik.touched.city && formik.errors.city ? (
                                <div style={{ color: 'red' }}>{formik.errors.city}</div>
                            ) : null} */}
                        </Form.Group>



            {/* <div className=' col-md-4'>
            <Form.Label>Country</Form.Label>
            <Form.Control type="text" name='country' value={attractionObject.country} onChange={(e)=>attractionValuesHandler(e)}/>
            </div> */}
            {/* <div className='col-md-4'>
            <Form.Label>State</Form.Label>
            <Form.Control type="text" name='state' value={attractionObject.state} onChange={(e)=>attractionValuesHandler(e)}/>
            </div> */}
            {/* <div className='col-md-4'>
            <Form.Label>City</Form.Label>
            <Form.Control type="text" name='city' value={attractionObject.city} onChange={(e)=>attractionValuesHandler(e)}/>
            </div> */}
            <div className='col-md-6'>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name='title' placeholder='Enter Title' value={attractionObject.title} onChange={(e)=>attractionValuesHandler(e)}/>
            </div>
            {/* </Form.Group> */}
        </Row>
 <hr className='my-5'/>

 <Row>
 <h2 className='mb-3'>Add Attraction Cards </h2>
 <Col>
          {attractionCards?.map((cards, index) => (
            <Row className="mb-3" key={index}>
              <Form.Group as={Col} controlId="formGridLabel1">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  value={attractionCards?.[index].title}
                  type="text"
                  onChange={(e) => {
                    attractionCardValueHandler("", e, index);
                  }}
                  placeholder="Enter Title"
                />
              </Form.Group>



              {/* <Form.Group as={Col} controlId="formGridLabel2">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  name="description"
                value={attractionCards?.[index].description}
                  type="text"
                  onChange={(e) => {
                    attractionCardValueHandler("", e, index,);
                  }}
                  placeholder="Description"
                />
              </Form.Group> */}



              {/* <Form.Group as={Col} controlId="formGridLabel2">
                <Form.Label>URL</Form.Label>
                <Form.Control
                  name="order"
                  value={}
                  type="text"
                  onChange={(e) => {
                    onChangeArrayHandler("", e, index, "attractionCards");
                  }}
                  placeholder="Order"
                />
              </Form.Group> */}
              <Form.Group as={Col} controlId={`formAttractionCard${index}`}>
              <div className='d-flex align-items-center flex-column'>
              {cards?.previewImage ? (
                <img
                  src={attractionCards?.[index].previewImage}
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
                <Form.Group controlId={`formAttractionCard${index}`}>
                  <Form.Label className="custom-file-upload">
                    Upload Image
                  </Form.Label>
                  <Form.Control
                    name="image"
                    type="file"
                    multiple={false}
                    onChange={(e) => attractionCardValueHandler("file", e, index, "attractionCards")}
                    accept="icon/*"
                    className="image-input-field"
                  />
                </Form.Group>
              </div>

              </div>

            </Form.Group>

            <Form.Group controlId="description">
            <Form.Label>
              Description <span className="tx-danger">*</span>
            </Form.Label>
    <Form.Control as="textarea" placeholder='Enter Description' name='description' rows={4} value={attractionCards?.[index].description} onChange={(e)=>attractionCardValueHandler("", e, index , 'attractionCards')} />
          </Form.Group>
            </Row>
          ))}
                  <div className='my-3 d-flex justify-content-center'>
        <Button  onClick={addMoreCards} variant='primary' className='my-2 '>Add More Attraction Card </Button>
        </div>
        </Col>
 </Row>

 <hr className='my-5'/>

 <Row>
 <h2 className='mb-3'>Add Promotional Side Bar Cards </h2>
 <Col>
          {promotionalSideBar?.map((promtionSideBar, index) => (
            <Row className="mb-3" key={index}>
              <Form.Group as={Col} controlId="formGridLabel1">
                <Form.Label>Redirection URL</Form.Label>
                <Form.Control
                  name="redirectionUrl"
                  value={promotionalSideBar?.[index].redirectionUrl}
                  type="text"
                  onChange={(e) => {
                    promotionalSideBarValueHandler("", e, index , 'promotionBar');
                  }}
                  placeholder="Redirection Url"
                />
              </Form.Group>

              {/* <Form.Group as={Col} controlId="formGridLabel2">
                <Form.Label>URL</Form.Label>
                <Form.Control
                  name="order"
                  value={}
                  type="text"
                  onChange={(e) => {
                    onChangeArrayHandler("", e, index, "attractionCards");
                  }}
                  placeholder="Order"
                />
              </Form.Group> */}
              <Form.Group as={Col} controlId={`formPromotionalBar${index}`}>
                <div className='d-flex align-items-center flex-column'>
                {promtionSideBar?.previewImage ? (
                <img
                  src={promotionalSideBar?.[index].previewImage}
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
                <Form.Group controlId={`formPromotionalBar${index}`}>
                  <Form.Label className="custom-file-upload">
                    Upload Image
                  </Form.Label>
                  <Form.Control
                    name="image"
                    type="file"
                    multiple={false}
                    onChange={(e) => promotionalSideBarValueHandler("file", e, index, "promotionBar")}
                    accept="icon/*"
                    className="image-input-field"
                  />
                </Form.Group>
              </div>
                </div>

            </Form.Group>
            </Row>
          ))}
        </Col>

        <div className='my-3 d-flex justify-content-center'>
        <Button onClick={addMorePromitionalSideBar} className='my-2' variant='primary'>Add  Promtional Side Bar </Button>
        </div>
 </Row>


 <Row>
 <h2 className='mb-3'>Add Promotional Bar Cards </h2>
 <Col>
          {promotionalBar?.map((promotion, index) => (
            <Row className="mb-3" key={index}>
              <Form.Group as={Col} controlId="formGridLabel1">
                <Form.Label>Redirection URL </Form.Label>
                <Form.Control
                  name="redirectionUrl"
                  value={promotionalBar?.[index].redirectionUrl}
                  type="text"
                  onChange={(e) => {
                    promotionalBarValueHandler("", e, index , 'promotionBar');
                  }}
                  placeholder="Redirection Url"
                />
              </Form.Group>

              {/* <Form.Group as={Col} controlId="formGridLabel2">
                <Form.Label>URL</Form.Label>
                <Form.Control
                  name="order"
                  value={}
                  type="text"
                  onChange={(e) => {
                    onChangeArrayHandler("", e, index, "attractionCards");
                  }}
                  placeholder="Order"
                />
              </Form.Group> */}
              <Form.Group as={Col} controlId={`formPromotionBar${index}`}>
              <div className='d-flex align-items-center flex-column'>
              {promotion?.previewImage ? (
                <img
                  src={promotionalBar?.[index].previewImage}
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
                <Form.Group controlId={`formPromotionBar${index}`}>
                  <Form.Label className="custom-file-upload">
                    Upload Image
                  </Form.Label>
                  <Form.Control
                    name="image"
                    type="file"
                    multiple={false}
                    onChange={(e) => promotionalBarValueHandler("file", e, index, "promotionBar")}
                    accept="icon/*"
                    className="image-input-field"
                  />
                </Form.Group>
              </div>

              </div>

            </Form.Group>
            </Row>
          ))}
        </Col>

        <div className='my-3 d-flex justify-content-center'>
        <Button onClick={addMorePromitionalBar} className='my-2' variant='primary'>Add Promtional Bar </Button>
        </div>
 </Row>

 <hr className='my-5'/>

 


        


        {/* <h2>Profile</h2>
        <Button
          onClick={addMoreProfiles}
          variant="primary"
          style={{
            alignSelf: "center",
            height: "fit-content",
            margin: "5px 0px",
          }}
        >
          Add more Title and Url
        </Button> */}
        {/* <Col>
          {header?.profile?.data?.map((item, index) => (
            <Row className="mb-3" key={index}>
              <Form.Group as={Col} controlId="formGridLabel1">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  value={header?.profile?.data?.[index].title}
                  type="text"
                  onChange={(e) => {
                    onChange("", e, index, "profile");
                  }}
                  placeholder="Enter title"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLabel2">
                <Form.Label>Url</Form.Label>
                <Form.Control
                  name="url"
                  value={header?.profile?.data?.[index]?.url}
                  type="text"
                  onChange={(e) => {
                    onChange("", e, index, "profile");
                  }}
                  placeholder="Url"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridLabel2">
                <Form.Label>Order</Form.Label>
                <Form.Control
                  name="order"
                  value={header?.profile?.data?.[index]?.order}
                  type="number"
                  onChange={(e) => {
                    onChange("", e, index, "profile");
                  }}
                  placeholder="Order"
                />
              </Form.Group>
            </Row>
          ))}
        </Col> */}
      </Col>
      {/* <Col
        className="mb-3"
        style={{
          border: "1px solid #afadad",
          padding: " 20px 10px",
          borderRadius: "3px",
        }}
      >
        <h2>Attraction Cards</h2>
        <Button
          onClick={addMoreCards}
          variant="primary"
          style={{
            alignSelf: "center",
            height: "fit-content",
            margin: "5px 0px",
            //   marginLeft: 5,
          }}
        >
          Add more Title and Url
        </Button>
        <Col>
          {header?.contact?.data?.map((BannerSmall, index) => (
            <Row className="mb-3" key={index}>
              <Form.Group as={Col} controlId="formGridLabel1">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  value={header?.contact?.data?.[index].title}
                  type="title"
                  onChange={(e) => {
                    onChange("", e, index, "contact");
                  }}
                  placeholder="Title"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLabel2">
                <Form.Label>Url</Form.Label>
                <Form.Control
                  name="url"
                  value={header?.contact?.data?.[index].url}
                  type="text"
                  onChange={(e) => {
                    onChange("", e, index, "contact");
                  }}
                  placeholder="Url"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridLabel2">
                <Form.Label>Order</Form.Label>
                <Form.Control
                  name="order"
                  value={header?.contact?.data?.[index].order}
                  type="number"
                  onChange={(e) => {
                    onChange("", e, index, "contact");
                  }}
                  placeholder="Order"
                />
              </Form.Group>
              <Form.Group as={Col} controlId={`formIconHeader${index}`}>
              {previewImage?.[index] ? (
                <img
                  src={previewImage?.[index]}
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
                <Form.Group controlId={`formIconHeader${index}`}>
                  <Form.Label className="custom-file-upload">
                    Upload Icon
                  </Form.Label>
                  <Form.Control
                    name="icon"
                    type="file"
                    multiple={false}
                    onChange={(e) => onChange("file", e, index, "contact")}
                    accept="icon/*"
                    className="image-input-field"
                  />
                </Form.Group>
              </div>
            </Form.Group>
            </Row>
          ))}
        </Col>
      </Col> */}


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