import { CKEditor } from "ckeditor4-react";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card, Form, Row, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleAttraction,
  updateAttraction,
  createAttraction,
  getAllAttraction,
} from "redux/actions/attraction";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
} from "redux/actions/reviewManagement";
import { getAllTours } from "redux/actions";

const form = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log("this is ID ", id);

  const dispatch = useDispatch();

  const {
    reviewManagement,
    tours: { tours },
  } = useSelector((state) => state);

  useEffect(() => {
    if (reviewManagement?.singleReview) {
      setReviewObject((prev) => ({
        ...prev,
        user: reviewManagement?.singleReview?.user,
        order: reviewManagement?.singleReview?.order,
        description: reviewManagement?.singleReview?.description,
        tour: reviewManagement?.singleReview?.tour?._id,
        stars: reviewManagement?.singleReview?.stars,
        coverImage: reviewManagement?.singleReview?.image,
        previewCoverImage: `${window.location.origin}${reviewManagement?.singleReview?.image}`,
      }));
    }
  }, [reviewManagement]);

  console.log(
    "this is the Review Management ---------------> ",
    reviewManagement
  );

  useEffect(() => {
    if (id) {
      dispatch(getSingleReview(id));
    }
  }, [id]);

  useEffect(() => {
    dispatch(getAllTours());
  }, []);

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

  // // console.log( 'single attraction --------------------> ' , attraction);

  //   },[attraction?.singleAttraction])

  const [reviewObject, setReviewObject] = useState({
    user: "",
    order: "",
    description: "",
    tour: "",
    stars: "",
    coverImage: "",
    previewCoverImage: "",
  });

  // console.log('attractionCards -------------------> ' , attractionCards);

  const reviewObjectValuesHandler = (e) => {
    if (e.target.name === "coverImage") {
      UploadFile(event.target.files[0], "reviewManagement").then((data) => {
        //  console.log('this is the Form Data ----------------> ' , data);
        setReviewObject((prev) => ({
          ...prev,
          previewCoverImage:
            window.location.origin + `/uploads/reviewManagement/${data}`,
          coverImage: `/uploads/reviewManagement/${data}`,
        }));
      });
    } else {
      setReviewObject((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

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
        `/api/reviewManagement/uploadImage/${url}`,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      tour: reviewObject.tour,
      user: reviewObject.user,
      order: reviewObject.order,
      description: reviewObject.description,
      stars: reviewObject.stars,
      image: reviewObject.coverImage,
    };
    console.log("this is the Review data -------------> ", formData);

    if (id) {
      formData._id = id;
      // console.log('in the IF condition ---------------> ' , !!id);
      dispatch(updateReview(formData)).then(() => {
        dispatch(getAllReviews());
        router.push("/admin/reviewManagement");
        // resetAllState();
      });
    } else {
      dispatch(createReview(formData)).then(() => {
        dispatch(getAllReviews());
        router.push("/admin/reviewManagement");
      });
    }
    //    else{
    //     // console.log('in the else Part ', !!id);
    //     dispatch(createAttraction(formData)).then(()=>{
    //       dispatch(getAllAttraction());
    //       router.push('/admin/attraction');
    //       resetAllState();
    //     })
    //    }

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
  };

  const handleReset = () => {
    console.log("handle Reset called ----------->");
  };
  debugger;
  console.log("reviw Object ----------------> ", reviewObject);

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
          {!id ? `Add` : `Edit `} Attraction Page
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
              <Row className="my-3">
                <div className="col-12 mb-4">
                  <div className="d-flex justify-content-center">
                    <Form.Group as={Col} controlId={`formAttractionCardObject`}>
                      {reviewObject?.previewCoverImage ? (
                        <img
                          className="d-block mx-auto mb-3"
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

                      <div className="image-btn-parent-div d-flex justify-content-center">
                        <Form.Group controlId={`formAttractionObject`}>
                          <Form.Label className="custom-file-upload">
                            Upload Image
                          </Form.Label>
                          <Form.Control
                            name="coverImage"
                            type="file"
                            multiple={false}
                            onChange={(e) => reviewObjectValuesHandler(e)}
                            accept="icon/*"
                            className="image-input-field"
                          />
                        </Form.Group>
                      </div>
                    </Form.Group>
                  </div>
                </div>
                {/* <Form.Group as={Col} controlId="formGridLabel2"> */}

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
                <div className="col-md-6 mb-4">
                  <Form.Label>User</Form.Label>
                  <Form.Select
                    name="user"
                    onChange={reviewObjectValuesHandler}
                    value={reviewObject?.user}
                  >
                    <option hidden>Select User</option>
                    <option value="Ban Ban Jara">Ban ban</option>
                    <option value="Ram Krishan">Ram Krishan</option>
                    <option value="Bali Ram">Baliram</option>
                  </Form.Select>
                  {/* <Form.Control type="text" name='title' value={reviewObject.user} onChange={(e)=>attractionValuesHandler(e)}/> */}
                </div>
                <div className="col-md-6 mb-4">
                  <Form.Label>Order</Form.Label>
                  {/* <Form.Select name="order" onChange={reviewObjectValuesHandler} value={reviewObject?.order}>
            <option hidden >Select Order</option>
            <option value="Ban Ban Jara">Ban ban</option>
            <option value="Ram Krishan">Ram Krishan</option>
            <option value="Bali Ram">Baliram</option>
            </Form.Select> */}
                  <Form.Control
                    type=" number"
                    name="order"
                    value={reviewObject.order}
                    onChange={reviewObjectValuesHandler}
                  />
                </div>

                <div className="col-md-6 mb-4">
                  <Form.Label>Tour Title</Form.Label>

                  {/* <Form.Control type="text" name='tourTitle' value={reviewObject.tourTitle} onChange={reviewObjectValuesHandler}/> */}
                  <Form.Select
                    name="tour"
                    onChange={reviewObjectValuesHandler}
                    value={reviewObject?.tour}
                  >
                    <option hidden>Select Tour </option>
                    {tours?.map((tour) => (
                      <option value={tour?._id}>{tour?.title}</option>
                    ))}
                  </Form.Select>
                </div>
                <div className="col-md-6 mb-4">
                  <Form.Label>Star</Form.Label>
                  <Form.Select
                    name="stars"
                    onChange={reviewObjectValuesHandler}
                    value={reviewObject?.stars}
                  >
                    <option hidden>Select Star</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    <option value="4">Four</option>
                    <option value="5">Five</option>
                  </Form.Select>
                </div>

                <div className="col-12 mb-4">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter Description"
                    rows={4}
                    name="description"
                    value={reviewObject.description}
                    onChange={reviewObjectValuesHandler}
                  />
                  {/* <Form.Control type="text" name='description' value={reviewObject.description} onChange={}/> */}
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
              {id ? "Update" : "Submit"}
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
  );
};

export default form;
