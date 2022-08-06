import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
const _ = require("lodash");
import { toast } from "react-toastify";
import Select from "react-select";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import {
  createOfferPage,
  updateOfferPage,
  getOfferPage,
} from "../../../redux/actions/offerPage";
import { getAllOffers } from "../../../redux/actions/offers";

const OfferPage = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOffers());
    dispatch(getOfferPage());
  }, []);

  const offerPageData = useSelector((state) => state.offerPage);
  const offers = useSelector((state) => state.offers);
  console.log("offers-", offers);

  const offersList = offers?.map((offr) => ({
    label: offr.title,
    value: offr._id,
    ...offr,
  }));

  useEffect(() => {
    setBasicPage((state) => ({
      ...state,
      heading: offerPageData[0]?.heading,
      directionalBar1: offerPageData[0]?.directionalBar1,
      directionalBarLink1:offerPageData[0]?.directionalBarLink1 ,
      directionalBarLink2:offerPageData[0]?.directionalBarLink2 ,
      directionalBar2: offerPageData[0]?.directionalBar2,
      headingTabs: offerPageData[0]?.tabHeadings,
      headerImage: offerPageData[0]?.logo1,
      bannerSmallText: offerPageData[0]?.offersSection,
      offers: offerPageData[0]?.offers,
      logo1:offerPageData[0]?.headerImage,
      logo2 : offerPageData[0]?.testimonials
    }));
    // if (offerPageData?.[0]?.headerImage) {
    //   setPreviewLogo("/uploads/offerPage/" + offerPageData?.[0]?.headerImage);
    // }

    // if (offerPageData?.[0]?.testimonials) {
    //   setPreviewLogo1("/uploads/offerPage/" + offerPageData?.[0]?.testimonials);
    // }

    // if (offerPageData?.[0]?.offersSection) {
    //   let newPreviewImages = {};
    //   offerPageData?.[0]?.offersSection?.forEach((oSection, index) => {
    //     if (oSection?.icon) {
    //       newPreviewImages[index] = "/uploads/offerPage/" + oSection?.icon;
    //     }
    //   });

    //   setPreviewImage(newPreviewImages);
    // }
  }, [offerPageData]);

  const initBasicPage = {
    logo1: "",
    logo2: "",
    heading: "",
    directionalBar1: "",
    directionalBarLink1: "",
    directionalBar2: "",
    directionalBarLink2: "",
    // imageSlider: [{ image: "" }],
    // tabHeadings: [{ label: "" }],
    bannerSmallText: [
      {
        icon: "",
        label1: "",
        text: "",
        link: "",
      },
    ],
    offers: [{ offerType:'', offer: []}],
  };

  const [previewLogo, setPreviewLogo] = useState("");
  const [previewLogo1, setPreviewLogo1] = useState("");
  const [basicPage, setBasicPage] = useState(initBasicPage);

  console.log('this is The offer Page Data ----------------> ' , basicPage )

  const [previewImage, setPreviewImage] = useState({});
  // const [previewSlider, setPreviewSlider] = useState({});

  const UploadFile = async (file, url) => {
    try {
      let header2 = new Headers({
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
        `/api/homePage/uploadImage/${url}`,
        requestOptions
      );
      console.log(resp);
      const data = await resp.json();
      return data?.image?.filename;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(basicPage, "BasicPage basicPage");

    if (basicPage) {
      setBasicPage(basicPage);
      console.log(basicPage, " Heading Basic Page ");
      const newPreviewImages = {};
      const newPreviewIcon = {};

      const logoImage = basicPage?.logo1;

      // setPreviewLogo(
      //   window.location.origin + `/uploads/offerPage/${logoImage}`
      // );

      // basicPage?.bannerSmallText?.map((item, index) => {
      //   console.log(item, "item");

      //   newPreviewIcon[index] =
      //     window.location.origin + `/uploads/offerPage/${item.icon}`;
      // });

      // basicPage?.imageSlider?.map((item, index) => {
      //   console.log(item, "item");

      //   newPreviewImages[index] =
      //     window.location.origin + `/uploads/basicPage/${item.image}`;
      // });
      // setPreviewSlider(newPreviewImages);
      // setPreviewImage(newPreviewIcon);
    }
  }, [basicPage]);

  const AddIconsAndLabels = () => {
    setBasicPage((state) => ({
      ...state,
      bannerSmallText: [
        ...state.bannerSmallText,
        {
          icon: "",
          label1: "",
          text: "",
          link: "",
        },
      ],
    }));
  };

  const AddOffers = () => {
    setBasicPage((state) => ({
      ...state,
      offers: [...state.offers, { offerType:"", offer: [] }],
    }));
  };

  const onChange = async (type, e, index = -1, order = null) => {
    let value = "";
    let key = e?.target?.name;

    if (type === "file") {
      const file = e.target?.files?.[0];
      if (file) {
        value = await UploadFile(file, "offerPage");
      }
    } else if (type === "select") {
      value = e;
      key = "offer";
    } else {
      value = e?.target?.value;
    }

    console.log(type, e, index, order, key, value);

    setBasicPage((state) => {
      const newBasicPage = _.cloneDeep(state);

      if (index === "logo1" || index === "logo2") {
        newBasicPage[key] = value;
        return newBasicPage;
      } else if (index !== -1) {
       if (key === "offer") {
          let elem = newBasicPage["offers"][index];
          newBasicPage["offers"]?.splice(index, 1, {
            ...elem,
            [key]: value,
          });
        }
        else if(key ==='offerType'){
          let elem = newBasicPage["offers"][index];
          newBasicPage['offers']?.splice(index,1,{
            ...elem,
            offerType : value,
          })          
        }
        else {
          let elem = newBasicPage["bannerSmallText"][index];
          newBasicPage["bannerSmallText"]?.splice(index, 1, {
            ...elem,
            [key]: value,
          });
        }
      } else {
        newBasicPage[key] = value;
      }
      return newBasicPage;
    });

    if (type !== "file") return;

    // console.log(order, "Order 🍳🍳🍳🍳");
    if (index >= 0 && order === "slider") {
      // const newPreviewImages = _.cloneDeep(previewSlider);
      // newPreviewImages[index] = URL.createObjectURL(e.target?.files[0]);
      // setPreviewSlider(newPreviewImages);
      // console.log(previewSlider, "🐱🍰🎂  previewSlider");
      // return;
    } else if (index >= 0) {
      const newPreviewImages = _.cloneDeep(previewImage);
      newPreviewImages[index] = URL.createObjectURL(e.target?.files[0]);
      setPreviewImage(newPreviewImages);
    }

    if (index === "logo1") {
      const logo = URL.createObjectURL(e.target?.files[0]);
      setPreviewLogo(logo);
    }

    if (index === "logo2") {
      const logo = URL.createObjectURL(e.target?.files[0]);
      setPreviewLogo1(logo);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newBasicPage;
    if (offerPageData?.[0]?._id) {
      newBasicPage = {
        _id: offerPageData?.[0]?._id,
        ..._.cloneDeep(basicPage),
      };
    }

    dispatch(
      !offerPageData?.[0]?._id
        ? createOfferPage(basicPage)
        : updateOfferPage(newBasicPage)
    );
    // router.back();
  };

  console.log("basicPage------------------------------>", basicPage);
  // console.log("previewImage-", previewImage);

  return (
    <Form style={{ padding: "3rem 1rem" }} onSubmit={handleSubmit}>
      {/* <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridHeading">
              <Form.Label>Days</Form.Label>
              <Form.Control
                  name="days"
                  value={basicPage?.days}
                  type="text"
                  placeholder="Enter Days"
                  onChange={(e) => {
                      onChange("", e);
                  }}
              />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridSubHeading">
              <Form.Label>Hours</Form.Label>
              <Form.Control
                  name="hours"
                  value={basicPage?.hours}
                  type="text"
                  placeholder="Enter Hours"
                  onChange={(e) => {
                      onChange("", e);
                  }}
              />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridHeading">
              <Form.Label>Mins</Form.Label>
              <Form.Control
                  name="mins"
                  value={basicPage?.mins}
                  type="text"
                  placeholder="Enter Mins"
                  onChange={(e) => {
                      onChange("", e);
                  }}
              />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridSubHeading">
              <Form.Label>Secs</Form.Label>
              <Form.Control
                  name="secs"
                  value={basicPage?.secs}
                  type="text"
                  placeholder="Enter Secs"
                  onChange={(e) => {
                      onChange("", e);
                  }}
              />
          </Form.Group>
      </Row> */}
      <Col xl={12} lg={12} className="image-col">
        {basicPage?.logo1 ? (
          <img
            src={`${window?.location?.origin}/uploads/offerPage/${basicPage?.logo1}`}
            alt=""
            style={{ margin: "auto", height: "200px", marginBottom: "15px" }}
          />
        ) : (
          <img
            src="/placeholder.png"
            alt=""
            className="form-img-avatar"
            style={{
              width: "100px",
              margin: "auto",
              border: "none",
              height: "200px",
            }}
          ></img>
        )}

        <div className="image-btn-parent-div">
          <Form.Group controlId="formFileMultiple">
            <Form.Label className="custom-file-upload">Upload Image</Form.Label>
            <Form.Control
              name="logo1"
              type="file"
              multiple={false}
              onChange={(e) => onChange("file", e, "logo1")}
              accept="image/*"
              className="image-input-field"
            />
          </Form.Group>
        </div>
      </Col>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridHeading">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="heading"
            value={basicPage?.heading}
            type="text"
            placeholder="Enter Title"
            onChange={(e) => {
              onChange("", e);
            }}
          />
        </Form.Group>
      </Row>
      

      {/* <Row className="mb-3">
        {basicPage?.tabHeadings?.map((BannerSmall, index) => (
            <Form.Group as={Col} key={index} controlId="formGridLabel1">
                <Form.Label>Tab Heading {index + 1}</Form.Label>
                <Form.Control
                    name="label"
                    value={basicPage?.tabHeadings?.[index].label}
                    type="text"
                    onChange={(e) => {
                        onChange("", e, index);
                    }}
                    placeholder={`Tab Heading ${index + 1}`}
                />
            </Form.Group>
        ))}
    </Row> */}

      {/* <Button
        onClick={AddTabHeadings}
        variant="primary"
        style={{
          alignSelf: "center",
          height: "fit-content",
          marginBottom: '1rem',
        }}
    >
        Add More Tab Headings
    </Button> */}

      <Row className="mb-3">
        {basicPage?.offers?.map((off, index) => (
        <>
           <Form.Group as={Col} sm={12} className='mb-3' key={index} controlId="formGridLabel1">
           <Form.Label>Offer Type {index + 1}</Form.Label>
           <Form.Control
            name="offerType"
            value={off?.offerType}
            type="text"
            placeholder="Offer Type"
            onChange={(e) => {
              onChange("", e,index);
            }}
          />
           </Form.Group>
          <Form.Group as={Col} sm={12} className='mb-3' key={index} controlId="formGridLabel1">
            <Form.Label>Offer {index + 1}</Form.Label>
            <Select
              id="offers"
              instanceId="offers"
              name="offer"
              label="Offer"
              options={offersList}
              value={off.offer || ""}
              onChange={(e) => {
                onChange("select", e, index);
              }}
              isMulti
              placeholder="Select Offer"
            />
          </Form.Group>
        </>
        ))}
      </Row>

      <Button
        onClick={AddOffers}
        variant="primary"
        style={{
          alignSelf: "center",
          height: "fit-content",
          marginBottom: "1rem",
        }}
      >
        Add More Offers
      </Button>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridHeading">
          <Form.Label>Directional Bar 1</Form.Label>
          <Form.Control
            name="directionalBar1"
            value={basicPage?.directionalBar1}
            type="text"
            placeholder="Enter Directional Bar 1"
            onChange={(e) => {
              onChange("", e);
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridHeading">
          <Form.Label>Directional Bar Link 1</Form.Label>
          <Form.Control
            name="directionalBarLink1"
            value={basicPage?.directionalBarLink1}
            type="text"
            placeholder="Enter Directional Bar Link 1"
            onChange={(e) => {
              onChange("", e);
            }}
          />
        </Form.Group>
      </Row>

      {basicPage?.bannerSmallText?.map((BannerSmall, index) => (
        <Row className="mb-3" key={index}>
          <Form.Group as={Col}  sm={12} controlId="formGridIcon">
            {BannerSmall.icon ? (
              <img
                src={`${window?.location?.origin}/uploads/offerPage/${BannerSmall.icon}`}
                alt=""
                style={{ width: "100px" }}
                className='mx-auto d-block'
              />
            ) : (
              <img
                src="/placeholder.png"
                alt=""
                className="form-img-avatar mx-auto d-block"
                style={{ width: "100px" }}
              ></img>
            )}
            <div className="image-btn-parent-div d-flex justify-content-center my-2">
              <Form.Group controlId={`formFileMultiple${index}`}>
                <Form.Label className="custom-file-upload">
                  Upload Offer Image
                </Form.Label>
                <Form.Control
                  name="icon"
                  type="file"
                  multiple={false}
                  onChange={(e) => onChange("file", e, index)}
                  accept="icon/*"
                  className="image-input-field"
                />
              </Form.Group>
            </div>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridLabel1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="label1"
              value={basicPage?.bannerSmallText?.[index].label1}
              type="text"
              onChange={(e) => {
                onChange("", e, index);
              }}
              placeholder={`Offer Section ${index + 1} `}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridLabel1">
            <Form.Label>Description </Form.Label>
            <Form.Control
              name="text"
              value={basicPage?.bannerSmallText?.[index].text}
              type="text"
              onChange={(e) => {
                onChange("", e, index);
              }}
              placeholder={`Offer Section Text ${index + 1} `}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridLabel1">
            <Form.Label>Redirection Link </Form.Label>
            <Form.Control
              name="link"
              value={basicPage?.bannerSmallText?.[index].link}
              type="text"
              onChange={(e) => {
                onChange("", e, index);
              }}
              placeholder={`Offer Section Link ${index + 1} `}
            />
          </Form.Group>
          <hr className="my-3" />
        </Row>
      ))}

      <Button
        onClick={AddIconsAndLabels}
        variant="primary"
        style={{
          alignSelf: "center",
          height: "fit-content",
          marginBottom: "1rem",
        }}
      >
        Add More Offer Section
      </Button>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridHeading">
          <Form.Label>Directional Bar 2</Form.Label>
          <Form.Control
            name="directionalBar2"
            value={basicPage?.directionalBar2}
            type="text"
            placeholder="Enter Directional Bar 2"
            onChange={(e) => {
              onChange("", e);
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridHeading">
          <Form.Label>Directional Bar Link 2</Form.Label>
          <Form.Control
            name="directionalBarLink2"
            value={basicPage?.directionalBarLink2}
            type="text"
            placeholder="Enter Directional Bar Link 2"
            onChange={(e) => {
              onChange("", e);
            }}
          />
        </Form.Group>
      </Row>

      <Col xl={12} lg={12} className="image-col">

        {basicPage?.logo2 ? (
         <img
         src={`${window?.location?.origin}/uploads/offerPage/${basicPage?.logo2}`}
         alt=""
         style={{ margin: "auto", height: "200px", marginBottom: "15px" }}
       />
     ) : (
       <img
         src="/placeholder.png"
         alt=""
         className="form-img-avatar"
         style={{
           width: "100px",
           margin: "auto",
           border: "none",
           height: "200px",
         }}
       />
        )}

        <div className="image-btn-parent-div">
        <Form.Group controlId="formFileMultiplelogo2">
            <Form.Label className="custom-file-upload">Upload Image</Form.Label>
            <Form.Control
              name="logo2"
              type="file"
              multiple={false}
              onChange={(e) => onChange("file", e, "logo2")}
              accept="image/*"
              className="image-input-field"
            />
          </Form.Group>
        </div>
      </Col>

      <div style={{ display: "flex" }}>
        <Button
          variant="primary"
          type="submit"
          style={{
            alignSelf: "center",
            height: "fit-content",
            marginLeft: 10,
          }}
          // disabled={!offerType || !description || !validity}
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
      </div>
    </Form>
  );
};

export default OfferPage;
