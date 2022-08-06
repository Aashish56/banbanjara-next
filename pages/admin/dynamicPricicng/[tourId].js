import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getTourById } from "../../../redux/actions";
import { updateTourVariants } from "../../../redux/actions";
import Select from "react-select";
import { getAllInclusions } from "../../../redux/actions/inclusion";
import { Accordion, Card, Row, Col, Form, Button } from "react-bootstrap";
import Schema from "validate";
import { toast } from "react-toastify";

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
    debugger;
    const resp = await fetch(`/api/tours/uploadImage/${url}`, requestOptions);
    // console.log(resp);
    const data = await resp.json();
    // console.log(data, "data 🍉🍉🍉🍉🍉🍉");
    debugger;
    return data?.image?.filename;
  } catch (error) {
    console.log(error);
  }
};
const Variants = (props) => {
  const initialState = [
    {
      pricingType: "",
      startDate: "",
      endDate: "",
      month: "",
      week: "",
      allMonth: "",
      variants: [
        {
          image: "",
          title: "",
          unlimitedPeople: false,
          minAdult: 0,
          maxAdult: 0,
          pricePerAdult: 0,
          vendorAmountPerAdult: 0,
          inclusions: [],
          childAllowed: true,
          children: {
            dependant: 0,
            independant: 0,
          },
          vendorAmountPerChild: 0,
        },
      ],
    },
  ];
  const inclusions = useSelector((state) => state.inclusion)?.filter(
    (x) => x.isDisable === false
  );
  const data = inclusions?.map((state) => ({
    label: state.name,
    value: state._id,
  }));

  const [dynamicPricing, setDynamicPricing] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [selectedInclusions, setSelectedInclusions] = useState([[[]]]);
  const router = useRouter();
  const tourId = router.query.tourId;
  //   console.log("tiurId", tourId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTourById(tourId));
    dispatch(getAllInclusions());
  }, [tourId]);
  const dynamicPricingRedux = useSelector(
    (state) => state.tours?.currentTour?.dynamicPricing
  );

  const currentTour = useSelector((state) => state.tours?.currentTour);
  //   console.log("currentTour", currentTour);
  useEffect(() => {
    props.setTitle(`Variants for ${currentTour?.title}`);
  }, [currentTour?.title]);
  const handleInclusionChange = (e, index) => {
    // debugger;
    setSelectedInclusions((items) => {
      items[index] = Array.isArray(e) ? e.map((x) => x.value) : [];
      return [...items];
    });
    setVariants((items) => {
      items[index].inclusions = Array.isArray(e) ? e.map((x) => x.value) : [];
      return [...items];
    });
  };
  const showError = (msg) => {
    toast.error(msg || "Please fill all required fields", {
      theme: "dark",
    });
  };
  useEffect(() => {
    if (dynamicPricingRedux?.length > 0) {
      setDynamicPricing(dynamicPricingRedux);
      setSelectedInclusions((prev) => {
        const inclusitionsArr = [];
        dynamicPricingRedux.forEach((item, index) => {
          inclusitionsArr.push(item?.inclusions);
        });
        return inclusitionsArr;
      });
    }
  }, [dynamicPricingRedux]);
  // console.log("variants", variants);
  const onChange = async (e, dynamicPricingIndex, index) => {
    // let fileObj;
    let fileObj;

    if (e.target.name === "image") {
      const file = e.target?.files?.[0];
      try {
        fileObj = await UploadFile(file, "variants");

        const image = window.location.origin + `/uploads/tour/${fileObj}`;
        setDynamicPricing((prev) => {
          prev[dynamicPricingIndex][index].image = image;
          return [...prev];
        });
      } catch (error) {
        console.log("error", error);
      }
    } else if (
      e.target.name === "dependant" ||
      e.target.name === "independant"
    ) {
      setDynamicPricing((prev) => {
        prev[dynamicPricingIndex][index].children[e.target.name] =
          e.target.value;
        return [...prev];
      });
    } else {
      setDynamicPricing((prev) => {
        prev[dynamicPricingIndex][index][e.target.name] = e.target.value;
        return [...prev];
      });
    }
  };
  const removeVariant = (dynamicPricingIndex, index) => {
    setDynamicPricing((prev) => {
      prev[dynamicPricingIndex].splice(index, 1);
      return [...prev];
    });
  };
  const addMoreVariants = (dynamicPricingIndex) => {
    setDynamicPricing((prev) => {
      return [...prev, initialState[0]];
    });
  };
  const removeDynamicPricing = (index) => {
    setDynamicPricing((prev) => {
      prev.splice(index, 1);
      return [...prev];
    });
  };
  const addMoreDynamicPricing = () => {
    setDynamicPricing((prev) => {
      prev[dynamicPricingIndex] = [
        ...prev.variants,
        initialState[0].variants[0],
      ];
      return [...prev];
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // let errors = variantSchema.validate({ values: variants });

    // if (errors.length) {
    //   console.log(errors, "errors");
    //   return showError();
    // }
    let isError = false;
    variants.forEach((item) => {
      if (!item.title) {
        showError();
        isError = true;
      }
    });
    if (isError) return;
    try {
      setLoading(true);

      dispatch(updateTourVariants(tourId, variants));
      // dispatch(
      //   !props.id
      //     ? createCategory({
      //         name: name,
      //         displayOrder: displayOrder,
      //       })
      //     : updateCategory({
      //         _id: props.id,
      //         name: name,
      //         displayOrder: displayOrder,
      //       })
      // );
      // toast.success("Variants saved successfully");
      setLoading(false);

      router.back();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  debugger;
  //   console.log("previewImages", previewImages);
  const headerJSX = (pricingType, index, last) => {
    // "DATE_RANGE", "MONTH", "WEEK", "ALL_MONTH"
    <Row>
      <Row>
        <Col md={3}>
          <Form.Group controlId="" className="">
            <Form.Label className="">Date type</Form.Label>
            <Radio name="pricingType" value="DATE_RANGE">
              Date range wise
            </Radio>
            <Radio name="pricingType" value="MONTH">
              Month wise
            </Radio>
            <Radio name="pricingType" value="WEEK">
              Week wise(days)
            </Radio>
            <Radio name="pricingType" value="ALL_MONTH">
              All month date wise
            </Radio>
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-center">
        {index !== 0 && (
          <Button
            variant="danger"
            style={{
              width: "150px",
              marginTop: 10,
              marginRight: 10,
            }}
            onClick={removeDynamicPricing.bind(null, index)}
          >
            Remove dynamic pricing
          </Button>
        )}
        {last && (
          <Button
            style={{ width: "150px", marginTop: 10 }}
            onClick={addMoreDynamicPricing}
          >
            Add more dynamic pricing
          </Button>
        )}
      </Row>
    </Row>;
  };
  const variantJSX = (variant, dynamicPricingIndex, index, last) => {
    return (
      <Row>
        <Col>
          <Row className="items-center">
            <Col md={4} className="image-col">
              {variant?.image ? (
                <img
                  src={variant?.image}
                  alt={variant?.title}
                  className="form-img-avatar square"
                  style={{ width: "100px" }}
                />
              ) : (
                <img
                  src="/placeholder.png"
                  alt={variant?.title}
                  className="form-img-avatar square"
                  style={{ width: "100px" }}
                ></img>
              )}

              <Form.Group
                controlId={`variantimage${index + 1}`}
                className="image-btn-parent-div"
              >
                <Form.Label className="custom-file-upload">
                  Variant image
                </Form.Label>
                <Form.Control
                  name="image"
                  type="file"
                  multiple={false}
                  onChange={(e) => onChange(e, dynamicPricingIndex, index)}
                  accept="image/*"
                  className="image-input-field"
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-0">
              <Form.Group controlId="" className="">
                <Form.Label className="">
                  Title <span className="tx-danger">*</span>
                </Form.Label>

                <Form.Control
                  name="title"
                  type="text"
                  value={variant?.title}
                  onChange={(e) => onChange(e, dynamicPricingIndex, index)}
                />
              </Form.Group>
            </Col>
            <Col md={2} className="mb-0">
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  name="unlimitedPeople"
                  value={variant?.unlimitedPeople}
                  onChange={(e) => onChange(e, dynamicPricingIndex, index)}
                  label="Unlimited People"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="" className="">
                <Form.Label className="">Minimum Adults</Form.Label>

                <Form.Control
                  name="minAdult"
                  type="number"
                  value={variant?.minAdult}
                  onChange={(e) => onChange(e, dynamicPricingIndex, index)}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="" className="">
                <Form.Label className="">Maxmum Adults</Form.Label>

                <Form.Control
                  name="maxAdult"
                  type="number"
                  value={variant?.maxAdult}
                  onChange={(e) => onChange(e, dynamicPricingIndex, index)}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="" className="">
                <Form.Label className="">Price per adult</Form.Label>

                <Form.Control
                  name="pricePerAdult"
                  type="number"
                  value={variant?.pricePerAdult}
                  onChange={(e) => onChange(e, dynamicPricingIndex, index)}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="" className="">
                <Form.Label className="">Vendor amount per adult</Form.Label>

                <Form.Control
                  name="vendorAmountPerAdult"
                  type="number"
                  value={variant?.vendorAmountPerAdult}
                  onChange={(e) => onChange(e, dynamicPricingIndex, index)}
                />
              </Form.Group>
            </Col>
            <Col md={12} className="mb-3">
              <Row className="items-center">
                <Col md={2}>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      name={"childAllowed"}
                      value={variant?.childAllowed}
                      onChange={(e) => onChange(e, dynamicPricingIndex, index)}
                      label="Child Allowed"
                    />
                  </Form.Group>
                </Col>
                <Col md={5} className="mb-0">
                  <Row>
                    <Col md={6}>
                      <Form.Group style={{ flexBasis: "33%" }}>
                        <Form.Label>Dependants</Form.Label>
                        <Form.Control
                          name="dependant"
                          type="number"
                          value={variant?.children?.dependant}
                          onChange={(e) =>
                            onChange(e, dynamicPricingIndex, index)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group style={{ flexBasis: "33%" }}>
                        <Form.Label>Non-Dependants</Form.Label>
                        <Form.Control
                          name="independant"
                          type="number"
                          value={variant?.children?.independant}
                          onChange={(e) =>
                            onChange(e, dynamicPricingIndex, index)
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
                <Col md={5} className="items-center">
                  <Form.Group style={{ flexBasis: "33%" }}>
                    <Form.Label>Vendor amount per child</Form.Label>
                    <Form.Control
                      name="vendorAmountPerChild"
                      type="number"
                      value={variant?.vendorAmountPerChild}
                      onChange={(e) => onChange(e, dynamicPricingIndex, index)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
            <Col md={12} className="mb-0">
              <Select
                isMulti
                options={data}
                value={data.filter((obj) =>
                  selectedInclusions[dynamicPricingIndex][index]?.includes(
                    obj.value
                  )
                )} // set selected values
                onChange={(e) =>
                  handleInclusionChange(e, dynamicPricingIndex, index)
                }
              >
                {selectedInclusions &&
                  selectedInclusions.length > 0 &&
                  selectedInclusions[dynamicPricingIndex].length > 0 &&
                  selectedInclusions[dynamicPricingIndex][index] && (
                    <div style={{ marginTop: 20, lineHeight: "25px" }}>
                      <div>
                        <b>Selected Value: </b>
                        {JSON.stringify(
                          selectedInclusions[dynamicPricingIndex][index],
                          null,
                          2
                        )}
                      </div>
                    </div>
                  )}
              </Select>
            </Col>
          </Row>
        </Col>

        <Row className="justify-center">
          {index !== 0 && (
            <Button
              variant="danger"
              style={{
                width: "150px",
                marginTop: 10,
                marginRight: 10,
              }}
              onClick={removeVariant.bind(null, dynamicPricingIndex, index)}
            >
              Remove variant
            </Button>
          )}
          {last && (
            <Button
              style={{ width: "150px", marginTop: 10 }}
              onClick={addMoreVariants.bind(null, dynamicPricingIndex)}
            >
              Add more Variants
            </Button>
          )}
        </Row>
      </Row>
    );
  };
  return (
    <Form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit}
    >
      <Row className="justify-end py-2" style={{ padding: "0 2em" }}>
        <Button
          variant="primary"
          style={{
            // alignSelf: "center",
            // height: "fit-content",
            width: "100px",
            // marginLeft: 5,
          }}
          onClick={router.back}
        >
          <i style={{ fontSize: 12 }} className="bi bi-arrow-left"></i>
          Back
        </Button>
      </Row>
      {dynamicPricing.map((dynamicPricing, dynamicPricingIndex) => (
        <Col>
          <Accordion defaultActiveKey={variants.length - 1}>
            <Accordion.Item eventKey={index}>
              <Accordion.Header>
                {variant?.title?.toUpperCase()}
              </Accordion.Header>
              <Accordion.Body>
                <Card>
                  <Card.Body>
                    {headerJSX(
                      pricingType,
                      dynamicPricingIndex,
                      dynamicPricingIndex === dynamicPricing.length - 1
                    )}
                    {dynamicPricing?.variants.map((variant, index) => {
                      variantJSX(
                        variant,
                        dynamicPricingIndex,
                        index,
                        index === dynamicPricing?.variants.length - 1
                      );
                    })}
                  </Card.Body>
                </Card>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      ))}
      <Row className="p-3">
        <Button
          variant="primary"
          type="submit"
          disabled={loading}
          style={{
            // alignSelf: "center",
            // height: "fit-content",
            width: "150px",
            marginLeft: 5,
          }}
          //   disabled={!country || !state || !cityName}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>

        <Button
          variant="secondary"
          style={{
            // alignSelf: "center",
            // height: "fit-content",
            width: "150px",
            marginLeft: 5,
          }}
          onClick={router.back}
        >
          Cancel
        </Button>
      </Row>
    </Form>
  );
};

export default Variants;
