import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "../../../components/ConfirmModal";
import {
  getAllItinerary,
  updateItineraries,
  // updateItinerary,
} from "../../../redux/actions/itinerary";
import { Button, Row, Col, Form } from "react-bootstrap";
import { toast } from "react-toastify";

function Intinerary(props) {
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

      const data = await resp.json();
      return data?.image?.filename;
    } catch (error) {
      console.log(error);
    }
  };

  const initItineraryState = { title: "", description: "", displayOrder: "" };
  const [itinerary, setItinerary] = useState(props.data || initItineraryState);

  const onChange = (e) => {
    const { name, value } = e.target;

    setItinerary((state) => ({ ...state, [name]: value }));

    props.setData((data) => {
      const newData = data.map((item, index) => {
        if (index === props.index) {
          return { ...item, [name]: value };
        }
        return item;
      });

      return newData;
    });
  };

  const handleImage = async (e) => {
    const { name } = e.target;
    const file = e?.target?.files?.[0];

    if (!file) {
      return;
    }

    const image = await UploadFile(file, "itinerary");
    if (!image) {
      toast.error("Image could not be uploaded");
    }

    props.setData((data) => {
      const newData = data.map((item, index) => {
        if (index === props.index) {
          return { ...item, [name]: image };
        }
        return item;
      });

      return newData;
    });

    // props.setImages((state) => ({ ...state, [props.index]: file }));
    // const newState = {}
  };

  useEffect(() => {
    setItinerary(props.data);
  }, [props.data]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, display: "flex", flexWrap: "wrap" }}>
        <Row>
          <Col xl={12} lg={12} className="image-col">
            {/* {previewImage ? (
              <img src={previewImage} alt="" style={{ width: "100px" }} />
            ) : (
              <img
                src="/placeholder.png"
                alt=""
                className="form-img-avatar"
                style={{ width: "100px" }}
              ></img>
            )} */}

            {/* <div className="image-btn-parent-div">
              <Form.Group controlId="formFileMultiple">
                <Form.Label className="custom-file-upload">
                  {" "}
                  Upload Image *
                </Form.Label>
                <Form.Control
                  name="image"
                  type="file"
                  multiple={false}
                  onChange={(e) => handleImages(e)}
                  accept="image/*"
                  className="image-input-field"
                />
              </Form.Group>
            </div> */}
          </Col>

          <Col>
            <Form.Group style={{ flexBasis: "50%", padding: 10 }}>
              <Form.Label>Title *</Form.Label>
              <Form.Control
                type="text"
                style={{ minWidth: 300, textTransform: "capitalize" }}
                placeholder="title"
                value={itinerary.title || ""}
                onChange={onChange}
                name="title"
                // onBlur={() => setNameBlur(true)}
                required
              />
              {/* {nameBlur && !text && (
                <Form.Label style={{ color: "red" }}>
                  Please enter Text
                </Form.Label>
              )} */}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group style={{ flexBasis: "50%", padding: 10 }}>
              <Form.Label>Description *</Form.Label>
              <Form.Control
                type="text"
                style={{ minWidth: 300 }}
                placeholder="Description"
                name="description"
                // onBlur={() => setSymbolBlur(true)}
                value={itinerary.description || ""}
                onChange={onChange}
                required
              />
              {/* {symbolBlur && !symbol && (
                <Form.Label style={{ color: "red" }}>
                  Please enter Symbol
                </Form.Label>
              )} */}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group style={{ flexBasis: "50%", padding: 10 }}>
              <Form.Label>Display Order *</Form.Label>
              <Form.Control
                type="number"
                style={{ minWidth: 300 }}
                placeholder="Display Order"
                name="displayOrder"
                // onBlur={() => setDisplayOrderBlur(true)}
                value={itinerary.displayOrder || ""}
                onChange={onChange}
                required
              />
              {/* {displayOrderBlur && !displayOrder && (
                <Form.Label style={{ color: "red" }}>
                  Please enter Display Order
                </Form.Label>
              )} */}
            </Form.Group>
          </Col>

          <Col>
            {itinerary?.image ? (
              <img
                src={"uploads/itinerary/" + itinerary?.image}
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
            <Form.Group className="image-btn-parent-div">
              <Form.Label className="custom-file-upload">
                Image *
                <Form.Control
                  name="image"
                  style={{ cursor: "pointer" }}
                  type="file"
                  // hidden={true}
                  multiple={false}
                  onChange={handleImage}
                  accept="image/*"
                  className="image-input-field"
                />
              </Form.Label>

              {/* {displayOrderBlur && !displayOrder && (
                <Form.Label style={{ color: "red" }}>
                  Please enter Display Order
                </Form.Label>
              )} */}
            </Form.Group>
          </Col>

          <Button
            onClick={() => props.onClickRemove(props.index, itinerary._id)}
            style={{ width: "100px", height: "30px" }}
            variant="secondary"
          >
            Remove
          </Button>
        </Row>
      </div>
    </div>
  );
}

export default function ItineraryMain(props) {
  const dispatch = useDispatch();
  const itineraries = useSelector((state) => state.itinerary);
  const [removedIds, setRemovedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [images, setImages] = useState({});

  const initState = {
    title: "",
    description: "",
    displayOrder: "",
  };

  const handleReset = () => {
    setData(itineraries);
  };

  const onClickAddMore = () => {
    setData((state) => [...state, initState]);
  };

  const onClickRemove = (index, id) => {
    setData((state) => {
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
    if (data) {
      setData(itineraries);
    }
  }, [itineraries]);

  const router = useRouter();

  useEffect(() => {
    // if(router.query.id)
    dispatch(getAllItinerary({ tourId: router.query.id }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("e", e);
    try {
      setLoading(true);

      let isValid = data.every((item) => {
        return Object.entries(item)?.every(([key, value]) => {
          console.log(key, value, "value");
          if (key !== "__v") {
            return Boolean(value);
          }

          return true;
        });
      });

      if (!isValid) {
        return toast.error("Please fill all details");
      }

      dispatch(
        updateItineraries({
          itineraries: data,
          removedIds,
          tourId: router.query.id,
        })
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-color" style={{ padding: 20 }}>
        <Form onSubmit={handleSubmit}>
          {data?.map((itinerary, index) => (
            <Intinerary
              onClickRemove={onClickRemove}
              index={index}
              setData={setData}
              setImages={setImages}
              key={itinerary._id}
              data={itinerary}
              handleFormSubmit={handleSubmit}
            ></Intinerary>
          ))}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={onClickAddMore}
              variant="secondary"
              style={{ alignSelf: "right", height: "fit-content" }}
            >
              Add More
            </Button>
          </div>
          <div style={{ display: "flex" }}>
            <Button
              variant="primary"
              // onClick={handleSubmit}
              type="submit"
              style={{
                alignSelf: "center",
                height: "fit-content",
                marginLeft: 10,
              }}
              disabled={loading}
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
                handleReset();
              }}
              disabled={loading}
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
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </Form>
        {/* <Main /> */}

        <ConfirmModal
          title="Are you sure?"
          // body={confirmModalMessage}
          btn1Text="Ok"
          btn2Text="Cancel"
          onFirst={() => {
            if (action === "emailStatus") {
              // verifyEmail();
            } else {
              // changeCustomerStatus(false);
            }
          }}
          // show={show}
          // onClose={handleClose}
        />
      </div>
    </>
  );
}
