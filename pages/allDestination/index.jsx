import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomePage } from "redux/actions/homePage";
import { Swiper, SwiperSlide } from "swiper/react";
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import styles from "./style.module.css";
import { EffectCoverflow, Pagination } from "swiper";
import PerfectExperienceStyles from "frontComponents/home/findPerfectExperience/FindPerfectExperience.styles.tw";
import { Button, Dropdown } from "react-bootstrap";
import { getAllDestination } from "redux/actions";
import { getAllTourLogs } from "redux/actions/tourLogs";
SwiperCore.use([Navigation, Autoplay]);

const AllDestination = () => {
  const dispatch = useDispatch();
  const [destinationData, setDestinationData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showAllDestination ,setShowAllDestination] = useState(false);
  const [filters, setFilters] = useState({
    country: null,
    state: null,
    city: null,
    sortOrder: null,
  });

  useEffect(() => {
    fetch("http://localhost:3344/api/allDestination/getDestination", {
      method: "POST",
    })
      .then((data) => data.json())
      .then(({ data }) => {
        if (data?.length) {
          console.log("allDestiationa ------------>", data);
          setCoverObject((prev) => ({
            ...prev,
            title: data[0].title,
            coverImage: data[0].coverImage,
          }));
        }
      });
    dispatch(getAllTourLogs());
    dispatch(getHomePage());
    dispatch(getAllDestination());

    setImagePrefix(window?.location?.origin);
  }, []);
  const { destination, tourLogs } = useSelector((state) => state);
  console.log('this is the Destination ---------> ' , destination)

  useEffect(() => {
    console.log("this is the filters ------------ >", filters);
    const { country, state, city, sortOrder } = filters;
    console.log("sort Order ", sortOrder);
    if (!country && !state && !city && !sortOrder) {
      setDestinationData(destination?.allDestination);
    }

    if (sortOrder) {
      if (sortOrder === "Ascending") {
        destinationData.sort(
          (a, b) => a?.state?.name?.toLowerCase() - b.state.toLowerCase()
        );
        console.log("ascening data ", destinationData);
      } else {
        const data = destinationData.sort(
          (a, b) => b?.state?.name?.toLowerCase() - a?.state?.name?.toLowerCase()
        );
        console.log("Decening data ", data);
      }
    }

    if (country) {
      console.log("country block called");
      setDestinationData(() => {
        const filtredData = destination?.allDestination?.filter(
          (el) => el?.country?.name?.toLowerCase() === filters?.country?.toLowerCase()
        );
        return filtredData;
      });
    }
    if (state) {
      console.log("state block called");
      setDestinationData(() => {
        const filtredData = destination?.allDestination?.filter(
          (el) => el?.state?.name?.toLowerCase() === filters?.state?.toLowerCase()
        );
        return filtredData;
      });
    }
    if (city) {
      console.log("city block called");
      setDestinationData(() => {
        const filtredData = destination?.allDestination?.filter(
          (el) => el?.city?.name?.toLowerCase() === filters?.city?.toLowerCase()
        );
        return filtredData;
      });
    }
  }, [filters]);

  useEffect(() => {
    setDestinationData(destination.allDestination.slice(0,8));
  }, [destination]);

  useEffect(() => {
    if (!searchValue) {
      setDestinationData(destination?.allDestination);
    }
  }, [searchValue]);

  const searchValueHandler = (e) => {
    setSearchValue(e.target.value);
    const value = e.target.value.toLowerCase();
    const filtredData = [];
    destinationData.forEach(
      (el) => el?.title.toLowerCase().includes(value) && filtredData.push(el)
    );
    setDestinationData(filtredData);
  };


   useEffect(()=>{
       if(showAllDestination){
        setDestinationData(destination?.allDestination)
       }
   },[showAllDestination])
  const [coverObject, setCoverObject] = useState({
    title: "",
    coverImage: "",
  });
  const [imagePrefix, setImagePrefix] = useState("");
  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(4);
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);


  console.log('this is the active slide --------------> ' , activeSlide )

  //     const sliderCards = [

  //         {
  //             image: "http://localhost:3344/uploads/findThePerfectExperience/image-1654771615582.jpg",
  // imageRedirection: "https://www.holidify.com/country/laos/places-to-visit.html",
  // title: "Kathmandu",
  // _id: "62a35b2f680845d72e029d40"
  //         },
  //         {image: "http://localhost:3344/uploads/findThePerfectExperience/image-1654771627047.jpg",
  // imageRedirection: "https://www.holidify.com/country/sri-lanka/",
  // title: "lanka",
  // _id: "62a35b2f680845d72e029d41"},
  // {
  //     image: "http://localhost:3344/uploads/findThePerfectExperience/image-1654771641152.jpg",
  // imageRedirection: "https://www.holidify.com/country/thailand/",
  // title: "Jaipur",
  // _id: "62a35b2f680845d72e029d42"
  // }
  //     ];




  return (
    <div className="fs-14">
      {/* ------------------- Cover Section ------------------- */}
      <div className={styles.pageBannerSection}>
        <div className={styles.attractionContainer}>
          <div className="page-banner-section-slider">
            <div className={`banner-slider-item ${styles.coverImageContainer}`} >
              <img style={{width:'100%' , height:'100%' , objectFit:'cover'}}
                src={`${imagePrefix}/uploads/allDestination/${coverObject?.coverImage}`}
                alt="banner"
              />
            </div>
          </div>
          <div className={styles.centredLeft}>
            <h2 style={{ fontSize: "3rem" }}>
              <b>{coverObject?.title}</b>
            </h2>
            <div className="mt-5">
              <input
                style={{
                  borderStyle: "unset",
                  color: "white",
                  borderBottom: "3px solid #e7e9f3",
                }}
                className={styles.destination_input}
                value={searchValue}
                onChange={searchValueHandler}
                placeholder="Find a Destination"
                type="text"
                name="fname"
                autofocus
              />
            </div>
          </div>

          <div className={`${styles.centeredright} ${styles.hiddenMobile}`}>
            {destinationData.length > 2 && (
              <PerfectExperienceStyles style={{ maxWidth: "700px" }}>
                <span style={{ width: "65%", marginBottom: "20px" }}>
                  <div className="d-flex  flex-column justify-content-center mb-1">
                    <h2>{destinationData[activeSlide]?.title}</h2>
                    <h5>{destinationData[activeSlide]?.city.name}</h5>
                  </div>
                  <Swiper
                    style={{ width: "100%" }}
                    effect={"coverflow"}
                    grabCursor={true}
                    ref={sliderRef}
                    loop={true}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    onSlideChange={(a) =>
                      setActiveSlide(a.activeIndex % destinationData.length)
                    }
                    coverflowEffect={{
                      rotate: 30,
                      stretch: 0,
                      depth: 100,
                      modifier: 1,
                      slideShadows: true,
                    }}
                    pagination={false}
                    modules={[EffectCoverflow, Pagination]}
                    className="mySwiper"
                  >
                    {destinationData?.map((item, index) => {
                      return (
                        <SwiperSlide>
                          <a key={index}>
                            <img
                              style={{ cursor: "pointer" }}
                              src={`/images/recent_img${index + 1}.jpg`}
                            />
                          </a>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                  <div className="d-flex justify-content-center">
                    <ImArrowLeft2
                      className="me-4 display-5 cursor-pointer"
                      onClick={handlePrev}
                    />
                    <ImArrowRight2
                      className="ms-4 display-5 cursor-pointer"
                      onClick={handleNext}
                    />
                  </div>
                </span>
              </PerfectExperienceStyles>
            )}
          </div>
        </div>
      </div>

      {/* --------------------- Main Container ------------------------ */}
      <div className="container">
        {/* ------------------- Your Recently Browsed Section ----------------- */}

        <div className="my-5">
          <div className={styles.sectionTitle}>
            <h2>You Recently Browsed</h2>
          </div>
          <div className="mt-5">
            <Swiper
              rewind={true}
              navigation={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              speed={1000}
              spaceBetween={30}
              breakpoints={{
                1200: {
                  slidesPerView: 6,
                },
                992: {
                  slidesPerView: 4,
                },
                576: {
                  slidesPerView: 3,
                },
                0: {
                  slidesPerView: 2,
                },
              }}
              className="custom-swiper-arrow"
              id="nearYouToursSwiper"
            >
              {tourLogs?.slice(0, 10)?.map((tour, i) => (
                <SwiperSlide key={tour}>
                  <div className={`${styles.tourWrap} my-4 `}>
                    <div className={styles.tourImage}>
                      <a href="#">
                        <img
                          src={`${window?.location?.origin}/uploads/tour/${tour?.tourId?.cardImage}`}
                          onError={(e) => (
                            (e.currentTarget.onerror = null),
                            (e.target.src = "/images/recent_img4.jpg")
                          )}
                          alt=""
                          style={{ width: "100%" }}
                        />
                      </a>
                    </div>
                    <div className={styles.tourSummery}>
                      <center>
                        <h4 className={styles.tourTitle}>
                          {tour?.tourId?.state?.name}
                        </h4>
                        <p>{tour?.tourId?.country?.name}</p>
                      </center>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* -------------------------- Nears By Destination ---------------------- */}


        <div className="my-5">
          <div className={styles.sectionTitle}>
            <h2>Near By Destination</h2>
          </div>
          <div className="mt-5">
            <Swiper
              rewind={true}
              navigation={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              speed={1000}
              spaceBetween={30}
              breakpoints={{
                1200: {
                  slidesPerView: 6,
                },
                992: {
                  slidesPerView: 4,
                },
                576: {
                  slidesPerView: 3,
                },
                0: {
                  slidesPerView: 2,
                },
              }}
              className="custom-swiper-arrow"
              id="nearYouToursSwiper"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((tour, i) => (
                <SwiperSlide key={tour}>
                  <div className={`${styles.tourWrap} my-4 `}>
                    <div className={styles.tourImage}>
                      <a href="#">
                        <img
                          src={`/images/recent_img${i+1}.jpg`}
                          alt=""
                          style={{ width: "100%" }}
                        />
                      </a>
                    </div>
                    <div className={styles.tourSummery}>
                      <center>
                        <h4 className={styles.tourTitle}>Himachal Pardesh</h4>
                        <p>India</p>
                      </center>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* ----------------------- Filters ---------------------------- */}

        <div className="my-5">
          <div className="btn-group" style={{ paddingRight: "10px" }}>
            <Dropdown
              onSelect={(value) =>
                setFilters((prev) => ({ ...prev, sortOrder: value }))
              }
            >
              <Dropdown.Toggle
                varient="transparent"
                className="text-black px-4 py-3 d-flex align-items-center justify-content-center"
                style={{
                  marginLeft: "10px",
                  border: "solid 1px",
                  borderRadius: "25px",
                  backgroundColor: "white",
                  width: "150px",
                }}
              >
                <img
                  className="me-2"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAQCAYAAADwMZRfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUUyNUM5NzYzQkJGMTFFQzk2MzZEQTYwMzNFOEQyMTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUUyNUM5NzczQkJGMTFFQzk2MzZEQTYwMzNFOEQyMTIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5RTI1Qzk3NDNCQkYxMUVDOTYzNkRBNjAzM0U4RDIxMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5RTI1Qzk3NTNCQkYxMUVDOTYzNkRBNjAzM0U4RDIxMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrBvu/oAAAORSURBVHjabFNLbBtFGP52d9beXb/ixE6ch+PEjkFpElR6a3hUQiBFCFRURA8IoUqo5UTDBVVUpIrEQ+LCoQgVuCDECSiHtiBoKrXQUCWqg5JYTZsSkjgJju3Gjt9e7653h0lyoZAZzT5m/u+bf77/G+7c2bewlizh3Il+fPDpz29fn00+YhcsuNqj2aNjn32Y/OmCVt/OgBMI/tushgGlLQRiaGpkK1eULk9lzUSmMmY29Gad8qjkNpG99cPN/OZ6iu5CtH1JuJqqk8T9+KWpqfUB2e28zBH7FsdxzRwLsNnEXH4pNjo9NfUCsdmxX2MbwttZXiXNHeFjTZ6CPNhlN24m6pOmZYEHB13XW+TgwPkW/1/vNcy9XIjA72VgNtiTYyQGgqHuOqE8+dPX4sHZd0/CfP/LsQelmT67yMEbGso+efLMb8sLszpKGbgcCja2ygxK4e96FGqthHxqHUS0QTj24jPQTBn+9g4Y1Vosnatd9XpcVwPhwUmJ8KawvYbxNw+jkCs75pazTbxlOA48dRSH33jHQGoJHV1dIE1uF3w+iu8v3oAoEkSjkd2UOSuP9esX4Xa7UagZrmvTd/+olCoBnpqI/frjevDQ8KE2v0/3eD0g9+7MfxxbyPVKNmEPzAb9l3i6YaJY7luq6maA/brAcdAqhcDipc/PrC7Gh3w9B1KkWK560+m0T5FEul8FNM1Aodi2yapmUkqx09m3VS7mnalU2scMVSet3dFTgUQViiLBaJi7udhEHiwelkUh2wWcemnQO766elwQ6grP5h0uT3X4tdHxamlcbQ52MnE5CkmWITBH9of9OHIwhGtzOah1DaLkRM8Tz2N4JJg/XXYPxTdUhVADzdGDtSMjw+rMtz7YiADS6iToDffBohZeGQmD6OXHVxMbz3GMXOCzaJMDVy5MbN2rLm/mGpycM9lx0iuL+PqjGbgdDnT09oDUNa1dVet2HhZ+Xyg0yrnk6fl4/ISDHU9Ta7Df+K695CSf5DeTAiF794cyQ+5UYOetqsz2DDAxOZcZlNj6/eXOvx8biMRku4gdAJUV0Mxi+Pb0yny+ont5nvu/7deyK6Q12PN6b0F2iAJoJNKtuSU62jAtiExZyzBAm7qToX7XiOdBRuQF4WESQ+e8oUiN2CV5VmHCskLg5adDaFQKX12ZcJdkSeRsokifPf7qN7S2ffuXL87DxuIeImGiyoqCfwQYAC4bmPjlgcPGAAAAAElFTkSuQmCC"
                  alt=""
                />{" "}
                &nbsp;&nbsp;Sort &nbsp;&nbsp;&nbsp;&nbsp;
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="Ascending">Ascending</Dropdown.Item>
                <Dropdown.Item eventKey="Deceding">Deceding</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {/* <button className="btn d-flex py-3 px-2 align-items-center justify-content-center " type="button" id="dropdownMenuButton1"  variant="light" style={{marginLeft:"10px",border:"solid 1px", borderRadius:"25px", backgroundColor:"white", width:"150px"}}>
         <img className='me-2' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAQCAYAAADwMZRfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUUyNUM5NzYzQkJGMTFFQzk2MzZEQTYwMzNFOEQyMTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUUyNUM5NzczQkJGMTFFQzk2MzZEQTYwMzNFOEQyMTIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5RTI1Qzk3NDNCQkYxMUVDOTYzNkRBNjAzM0U4RDIxMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5RTI1Qzk3NTNCQkYxMUVDOTYzNkRBNjAzM0U4RDIxMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrBvu/oAAAORSURBVHjabFNLbBtFGP52d9beXb/ixE6ch+PEjkFpElR6a3hUQiBFCFRURA8IoUqo5UTDBVVUpIrEQ+LCoQgVuCDECSiHtiBoKrXQUCWqg5JYTZsSkjgJju3Gjt9e7653h0lyoZAZzT5m/u+bf77/G+7c2bewlizh3Il+fPDpz29fn00+YhcsuNqj2aNjn32Y/OmCVt/OgBMI/tushgGlLQRiaGpkK1eULk9lzUSmMmY29Gad8qjkNpG99cPN/OZ6iu5CtH1JuJqqk8T9+KWpqfUB2e28zBH7FsdxzRwLsNnEXH4pNjo9NfUCsdmxX2MbwttZXiXNHeFjTZ6CPNhlN24m6pOmZYEHB13XW+TgwPkW/1/vNcy9XIjA72VgNtiTYyQGgqHuOqE8+dPX4sHZd0/CfP/LsQelmT67yMEbGso+efLMb8sLszpKGbgcCja2ygxK4e96FGqthHxqHUS0QTj24jPQTBn+9g4Y1Vosnatd9XpcVwPhwUmJ8KawvYbxNw+jkCs75pazTbxlOA48dRSH33jHQGoJHV1dIE1uF3w+iu8v3oAoEkSjkd2UOSuP9esX4Xa7UagZrmvTd/+olCoBnpqI/frjevDQ8KE2v0/3eD0g9+7MfxxbyPVKNmEPzAb9l3i6YaJY7luq6maA/brAcdAqhcDipc/PrC7Gh3w9B1KkWK560+m0T5FEul8FNM1Aodi2yapmUkqx09m3VS7mnalU2scMVSet3dFTgUQViiLBaJi7udhEHiwelkUh2wWcemnQO766elwQ6grP5h0uT3X4tdHxamlcbQ52MnE5CkmWITBH9of9OHIwhGtzOah1DaLkRM8Tz2N4JJg/XXYPxTdUhVADzdGDtSMjw+rMtz7YiADS6iToDffBohZeGQmD6OXHVxMbz3GMXOCzaJMDVy5MbN2rLm/mGpycM9lx0iuL+PqjGbgdDnT09oDUNa1dVet2HhZ+Xyg0yrnk6fl4/ISDHU9Ta7Df+K695CSf5DeTAiF794cyQ+5UYOetqsz2DDAxOZcZlNj6/eXOvx8biMRku4gdAJUV0Mxi+Pb0yny+ont5nvu/7deyK6Q12PN6b0F2iAJoJNKtuSU62jAtiExZyzBAm7qToX7XiOdBRuQF4WESQ+e8oUiN2CV5VmHCskLg5adDaFQKX12ZcJdkSeRsokifPf7qN7S2ffuXL87DxuIeImGiyoqCfwQYAC4bmPjlgcPGAAAAAElFTkSuQmCC' alt=""/> &nbsp;&nbsp;Sort 
        </button> */}
          </div>
          <div class="btn-group" style={{ paddingRight: "10px" }}>
            <Dropdown
              onSelect={(value) =>
                setFilters((prev) => ({ ...prev, country: value }))
              }
            >
              <Dropdown.Toggle
                varient="transparent"
                className="text-black px-4 py-3"
                style={{
                  marginLeft: "10px",
                  border: "solid 1px",
                  borderRadius: "25px",
                  backgroundColor: "white",
                  width: "150px",
                }}
              >
                Select Country &nbsp;&nbsp;&nbsp;
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="India" active>
                  India
                </Dropdown.Item>
                <Dropdown.Item eventKey="USA">USA</Dropdown.Item>
                <Dropdown.Item eventKey="Canada">Canada</Dropdown.Item>
                <Dropdown.Item eventKey="Sri Lanka">Sri Lanka</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div class="btn-group" style={{ paddingRight: "10px" }}>
            <Dropdown
              onSelect={(value) =>
                setFilters((prev) => ({ ...prev, state: value }))
              }
            >
              <Dropdown.Toggle
                varient="transparent"
                className="text-black px-4 py-3"
                style={{
                  marginLeft: "10px",
                  border: "solid 1px",
                  borderRadius: "25px",
                  backgroundColor: "white",
                  width: "150px",
                }}
              >
                Select State &nbsp;&nbsp;&nbsp;
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="Punjab" active>
                  Punjab
                </Dropdown.Item>
                <Dropdown.Item eventKey="Himachal Pradesh">
                  Himachal Pradesh
                </Dropdown.Item>
                <Dropdown.Item eventKey="Rajasthan">Rajasthan</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown
              onSelect={(value) =>
                setFilters((prev) => ({ ...prev, city: value }))
              }
            >
              <Dropdown.Toggle
                varient="transparent"
                className="text-black px-4 py-3"
                style={{
                  marginLeft: "10px",
                  border: "solid 1px",
                  borderRadius: "25px",
                  backgroundColor: "white",
                  width: "150px",
                }}
              >
                Select City &nbsp;&nbsp;&nbsp;
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="Amritsar">Amritsar</Dropdown.Item>
                <Dropdown.Item eventKey="Shimla">Shimla</Dropdown.Item>
                <Dropdown.Item eventKey="Mohali">Mohali</Dropdown.Item>
                <Dropdown.Item eventKey="Jaipur">Jaipur</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div class="btn-group">
            {/* <hr style={{height:"5px", width:"5px", color:"black"}}/> */}|
          </div>
          {(filters.country || filters.state || filters.city) && (
            <div className="btn-group" style={{ paddingLeft: "10px" }}>
              <div className="d-flex">
                {filters.country && (
                  <div
                    className={`${styles.chip} d-flex align-items-center px-5 py-2 mx-3`}
                  >
                    {filters.country}{" "}
                    <span
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, country: null }))
                      }
                    >
                      X
                    </span>
                  </div>
                )}
                {filters.state && (
                  <div
                    className={`${styles.chip} d-flex align-items-center px-5 py-2 mx-3`}
                  >
                    {filters?.state}{" "}
                    <span className="cursor-pointer"
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, state: null }))
                      }
                    >
                      X
                    </span>
                  </div>
                )}
                {filters?.city && (
                  <div
                    className={`${styles.chip} d-flex align-items-center px-5 py-2 mx-3`}
                  >
                    {filters?.city}{" "}
                    <span
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, city: null }))
                      }
                    >
                      X
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* -------------------  All Destination  Section ---------------------- */}

        <div className="my-5">
          <div className={styles.sectionTitle}>
            <h2 className="mb-3">All Destination</h2>
          </div>
          <div className="row">
            {destinationData?.map((el, i) => (
              <div className="px-5 mb-5 col-lg-3  col-md-4 col-sm-6 col-12 ">
                <div
                  className={`${styles.tourWrap}  ${styles.traveloguesWrap} `}
                >
                  <div className={styles.traveloguesImage}>
                    <a href="#">
                      <img
                        src={`/images/recent_img${i + 1}.jpg`}
                        alt=""
                        width="100%"
                      />
                    </a>
                  </div>
                  <div
                    className={`${styles.tourSummery} ${styles.traveloguesSummary}`}
                  >
                    <h6 className="bold">
                      <center>{el?.state?.name}</center>
                    </h6>
                    <h6
                      style={{
                        color: "#717171",
                        textTransform: "capitalize",
                        textAlign: "center",
                      }}
                    >
                      {el?.country?.name}
                    </h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {!showAllDestination && (<div className="mb-5 ">
          <button
          onClick={()=> setShowAllDestination((prev)=> !prev)}
            className="btn mx-auto d-flex py-3 px-2 align-items-center justify-content-center mb-5 "
            type="button"
            id="dropdownMenuButton1"
            variant="light"
            style={{
              marginLeft: "10px",
              border: "solid 1px",
              borderRadius: "25px",
              backgroundColor: "white",
              width: "150px",
            }}
          >
            View All Destination
          </button>
        </div>)}
      </div>
    </div>
  );
};
export default AllDestination;
