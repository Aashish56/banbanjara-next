import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { getAllTagPage, getExploreNearBy, getTagPageBySlug } from "../../redux/actions/tagPage";
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from "swiper/react";
import { BsArrowRight, BsFillGrid3X3GapFill,BsHeart,BsHeartFill,BsStarFill} from "react-icons/bs";
import NearYouCard from "../../frontComponents/nearYouCard/NearYouCard";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { getHomePage } from "redux/actions/homePage";
import { useRouter } from "next/router";
import { getAllTourLogs } from "redux/actions/tourLogs";
import { getLandingByLocation } from "redux/actions/landing";
import { getPopularDestination } from "redux/actions/destination";
import { getRelatedAttractionLinks , getTagTourLising, } from "redux/actions/attraction";

SwiperCore.use([Navigation, Autoplay]);
const TagPage = (data) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomePage());
    setImagePrefix(window?.location?.origin)
  }, []);

  const router = useRouter();
  const {slug} = router.query

  const { tagPage ,tourLogs,landing  , destination ,attraction} = useSelector(state=>state);
  const [imagePrefix , setImagePrefix] = useState('');



  useEffect(()=>{
   if(slug){
    dispatch(getTagPageBySlug(slug))
    dispatch(getAllTourLogs());
   }
  },[slug]);

  useEffect(()=>{
    const locationObj = {
      country: tagPage?.singleTag?.country,
      state: tagPage?.singleTag?.state,
      city: tagPage?.singleTag?.city,
    }; 
     dispatch(getExploreNearBy(locationObj));
     dispatch(getLandingByLocation(locationObj));
     dispatch(getPopularDestination(locationObj));
     dispatch(getRelatedAttractionLinks(locationObj));
     dispatch(getTagTourLising(locationObj));
  },[tagPage.singleTag]);


  useEffect(() => {
    landing?.landingByLocation.forEach((el) => {
      if (el?.cover) {
        el.cover = el.cover.split("\\").join("/");
      }
    });
    console.log("landing data ", landing?.landingByLocation);
  }, [landing?.landingByLocation]);

  return (
    <div className="fs-14">
      {/* ------------------- Cover Section ------------------- */}

      <div className={styles.pageBannerSection}>
        <div className={styles.tagContainer}>
          <div className="page-banner-section-slider">
            <div className={`banner-slider-item ${styles.coverImageContainer}`} >
              <img style={{width:'100%' , height:'100%' , objectFit:'cover'}}
                src={imagePrefix+tagPage?.singleTag?.image}
                alt="banner"
              />
            </div>
          </div>

          <div className={styles.centred}>
            <h2 style={{ fontSize: "8rem" }}>
              <b>{tagPage?.singleTag?.title}</b>
            </h2>
          </div>
      <div className={styles.bottom}>
        <a className="d-flex align-items-center cursor-pointer text-white" href={`/allDestination`} target='_blank' rel="noopener noreferrer" >
            <p className="me-3 m-0 p-0">
             View All Destination
            </p>
            <BsFillGrid3X3GapFill />
        </a>
          </div>
        </div>
      </div>


      {/* ------------- Main Container ----------- */}
      <div className="container fs-14">


        {/* ------------------- You Recently Browsed ---------------- */}
        
        <div>
          <div className={styles.sectionTitle}>
            <h2>You Recently Browsed</h2>
          </div>
          <div className="activity-cards-section py-5">
            <div className={styles.touristWrapper}>
              <div className={`${styles.touristCarousel} row`}>
                <Swiper
                  rewind={true}
                  navigation={true}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  speed={1000}
                  spaceBetween={10}
                  breakpoints={{
                    1200: {
                      slidesPerView: 4,
                    },
                    992: {
                      slidesPerView: 3,
                    },
                    576: {
                      slidesPerView: 2,
                    },
                    0: {
                      slidesPerView: 1,
                    },
                  }}
                  className="custom-swiper-arrow"
                  id="nearYouToursSwiper"
                >
                  {tourLogs.map((tour, i) => (
                    <SwiperSlide key={tour}>
                      <div
                        className={` ${styles.touristItem} col-12 wow animate__animated animate__zoomIn`}
                        data-wow-delay="0.2s"
                      >
                        <div className={styles.cardWrap}>
                          <div className={styles.cardImage}>
                            <a href="#">
                              <img
                                src={`${imagePrefix}/uploads/tour/${tour?.tourId?.cardImage}`}
                                onError={(e) => (
                                  (e.currentTarget.onerror = null),
                                  (e.target.src = "/images/recent_img4.jpg")
                                )}
                                alt="..."
                              />
                            </a>
                          </div>
                          <div className={styles.cardDetails}>
                            <div className={styles.cardReview}>
                            <i className="fa fa-star"></i>
                              {tour?.tourId?.averageRating || "0.0"}
                            </div>
                            <div className={styles.cardName}>
                            {tour?.tourId?.title}
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                              <div className={styles.cardPrice}> ₹ {tour?.tourId?.basicPrice}</div>
                              <button
                                className={` ${styles.cardBtn} py-2 px-3 border-2 ${styles.btnOutlineSecondary}`}
                              >
                                book now
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>


        {/* ---------------  stays in shimla ------------------ */}
        <div className="row">
          {/* ------------------------- row 1  ---------------------- */}
          <div className={styles.sectionTitle}>
            <h2>You Can Stay</h2>
          </div>
          <div className="col-md-8 mt-4 pe-5">
            <div className="d-flex align-items-center my-4">
            <button className={`btn btn-outline-secondary mx-2 ${styles.youCanStayButtons}  px-5 py-3 `}>Destination </button>
            <button className={`btn btn-outline-secondary mx-2 ${styles.youCanStayButtons}  px-5 py-3 `}>Tour Type  </button>
            <button className={`btn btn-outline-secondary mx-2 ${styles.youCanStayButtons}  px-5 py-3 `}>categories  </button>
            <button className={`btn btn-outline-secondary mx-2 ${styles.youCanStayButtons}  px-5 py-3 `}>duration  </button>
            <button className={`btn btn-outline-secondary mx-2 ${styles.youCanStayButtons}  px-5 py-3 `}>price range </button>
            </div>
            
            <div className="row">
              {[1,2,3,4,5,6,7,8,9,10,11,12].map((_) => {
                return (
                  <div className="col-md-6 p-4">
                  <div className={`${styles.cardWrap}` }>
                  <div className={` ${styles.traveloguesImage} ` }>
                    <div className="Stays position-relative">
                      <img src={`/images/recent_img${_}.jpg`}  alt=""  />
                      <div style={{position:'absolute' , top:'15px' , left:'15px'}}>
                    <BsHeart className="text-white h3"/>
                      </div>
                      <div>
                        <div className='d-flex py-2 px-4 ' style={{position:'absolute' , bottom:'15px' , right:'15px' , background:'white',borderRadius:'30px'}}>
                        <BsStarFill style={{color:'#FFD700'}} className='h3 me-3'/>
                        <span style={{color:'#FFD700'}}><b>3.6</b> (10)</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.tourSummery}>
                      <h4 className={styles.tourTitle}>
                        20 Best Things to do in Shimla - 2021 (with 4100+
                        Reviews)
                      </h4>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                      <div className={styles.cardPrice}><span className="text-decoration-line-through ">₹7,777</span>   ₹ 5555</div>
                      <button
                        className={` ${styles.cardBtn} py-2 px-3 border-2 ${styles.btnOutlineSecondary}`}
                      >
                        book now
                      </button>
                      </div>
                      
                    </div>
                  </div>
                    </div>
                    </div>
                );
              })}
            </div>
          </div>
          <div className="col-md-4 position-relative ps-md-4 ps-0">
<div className={`${styles.mapContainer} ps-md-4 ps-0`}>
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54674.0929476689!2d77.12400183536147!3d31.078288180327647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390578e3e35d6e67%3A0x1f7e7ff6ff9f54b7!2sShimla%2C%20Himachal%20Pradesh!5e0!3m2!1sen!2sin!4v1657562987951!5m2!1sen!2sin" width="100%" height="700" style={{border:'0' , borderRadius:'20px'}}  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
</div>
          </div>
        </div>


        {/* ---------------  Explore NearBy ------------------ */}
        <div className="row mt-5">
          {/* ------------------------- 1st Row   ---------------------- */}
          <div className={styles.sectionTitle}>
            <h2 className="mb-4">Explore NearBy </h2>
          </div>
          {tagPage?.exploreNearBy?.map(el=>{ 
            const slug = `/attraction/${el.title.split(' ').join('-')}`
            return (<div className="col-md-3 col-sm-4 col-6 mb-4 px-3" key={el._id} >
            <a className={styles.nearByCardWrapper} >
                  <div className={` ${styles.nearByCardImage} row`}>
                    <div className>
                      <img src={`${imagePrefix}/uploads/attractionPage/${el.coverImage}` } alt="" />
                    </div>
                  </div>
              <div className={styles.cardDetails}>
                <p className={styles.cardName} style={{fontWeight:'500' }} >
                  {el.title}
                </p>
                <div className="d-flex align-items-center">
                  <p style={{fontWeight:'500' ,color:'black' }} className='m-0 p-0'>
                  Learn More
                  </p>
                  <BsArrowRight style={{color:'#FFD700'}} className='ms-3 h3'/>
                </div>
              </div>
            </a>
          </div>)
        })}
        </div>

        {/* ------------------- Promotional Bar -------------------- */}


        <div className={`${styles.section} mt-5 ${styles.hiddenMobile} relative`}>
          <div className="promo-wrapper">
            <div className="row">
              {tagPage?.singleTag?.promotionalBar?.map((el) => (
                <div className={` ${styles.promoItem} col-sm-6 col-12`}>
                  <div className={styles.promoImage}>
                    <a href={el?.redirectionUrl} target='_blank'  rel='noreferrer noopener'>
                      <img
                        src={imagePrefix+el.image}
                        alt="promo image"
                      />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* ------------------- Travegues Free Guide Section -------------------- */}

        <div className={styles.pageTravelogues}>
          <div className={styles.sectionTitle}>
            <h2>Travelogues - Free Guide</h2>
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
              spaceBetween={50}
              breakpoints={{
                1200: {
                  slidesPerView: 3,
                },
                992: {
                  slidesPerView: 3,
                },
                576: {
                  slidesPerView: 2,
                },
                0: {
                  slidesPerView: 1,
                },
              }}
              className="custom-swiper-arrow"
              id="nearYouToursSwiper"
            >
              {landing?.landingByLocation?.map((el) => (
                <SwiperSlide key={el?._id}>
                  <div className={styles.tourItem} data-wow-delay="0.2s">
                    <div
                      className={`${styles.tourWrap}  ${styles.traveloguesWrap}`}
                    >
                      <div className={styles.traveloguesImage}>
                        <a href="#">
                          <img
                        src={`${window.location.origin}/${el?.cover}`}
                        />
                        </a>
                      </div>
                      <div className={styles.tourSummery}>
                      <h4 className={styles.tourTitle}>
                            {el?.title.slice(0, 60)}{" "}
                            {el?.title.length > 60 && "...."}{" "}
                          </h4>
                          <p style={{ color: "#717171" }}>
                            {el?.overview.slice(0, 120)}{" "}
                            {el?.overview.length > 120 && "...."}
                          </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>


        {/* -------------------  Popular Related Destination Section ---------------- */}
        <div className={styles.relatedPlaces}>
          <div className={styles.sectionTitle}>
            <h2>Popular Related Destination</h2>
          </div>
          <div className={`${styles.relatedPlacesCarousel} mt-5`}>
            <Swiper
              rewind={true}
              navigation={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              speed={1000}
              spaceBetween={50}
              breakpoints={{
                1200: {
                  slidesPerView: 4,
                },
                992: {
                  slidesPerView: 3,
                },
                576: {
                  slidesPerView: 2,
                },
                0: {
                  slidesPerView: 1,
                },
              }}
              className="custom-swiper-arrow"
              id="nearYouToursSwiper"
            >
              {destination?.popluarDestionation?.map((el, i) => (
                <SwiperSlide key={el?._id}>
                  <div className={`${styles.relatedPlacesItem}`}>
                    <img src={`/images/recent_img${i+1}.jpg`} alt="" />
                    <div className={styles.relatedPlacesText}>
                    <h2
                          style={{
                            height: "86px",
                            width: "250px",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {el.title}
                        </h2>
                      <button className={styles.relatedPlacesBtn} type="button">
                        321 listing
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>


        {/* ------------------- Keep Exploring Shimla --------------------- */}
        <div>
        {attraction?.tagTourLinks?.length !==0 && (<div className={styles.sectionTitle}>
            <h2>
              You may also like in{" "}
              {tagPage?.singleTag?.city?.name ||
                tagPage?.singleTag?.state?.name ||
                tagPage?.singleTag?.country?.name}
            </h2>
          </div>)}

          <div className={styles.trekMargin}>
            <div className="tourist-exploring">
              <div className={styles.touristExploringCarousel}>
                <Swiper
                  rewind={true}
                  navigation={true}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  speed={1000}
                  spaceBetween={5}
                  breakpoints={{
                    1200: {
                      slidesPerView: 6,
                    },
                    992: {
                      slidesPerView: 5,
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
                  {attraction?.tagTourLinks?.map((el) => (
                    <SwiperSlide key={el?._id}>
                      <div className={styles.touristExploringItem}>
                        <div className={styles.touristExploringWrap}>
                        <div
                            className={styles.tourExploringWrap}
                            onClick={() => {
                              const slug = el?.title?.split(" ").join("-");
                              router.push(`/attraction/${slug}`);
                            }}
                          >
                            <a>
                              <h5>
                              <h5>{el?.tag?.title?.slice(0, 25)}
                                {el?.tag?.title?.length > 25 && "...."}</h5>
                              </h5>
                              <p>{el?.tours?.length || 0} experiences</p>
                            </a>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>


        {/* ------------------- Listing Country State City --------------------- */}
        <div>
          <div className={styles.sectionTitle}>
          <h2>
              Keep  Exploring in {" "}
              {tagPage?.singleTag?.city?.name ||
                tagPage?.singleTag?.state?.name ||
                tagPage?.singleTag?.country?.name}
            </h2>
          </div>

          <div className={styles.trekMargin}>
            <div className="tour-exploring">
              <div className={styles.touristExploringCarousel}>
                <Swiper
                  rewind={true}
                  navigation={true}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  speed={1000}
                  spaceBetween={5}
                  breakpoints={{
                    1200: {
                      slidesPerView: 6,
                    },
                    992: {
                      slidesPerView: 5,
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
                  {attraction?.relatedAttractionLinks?.map((el) => (
                    <SwiperSlide key={el?._id}>
                      <div className={styles.touristExploringItem}>
                        <div className={styles.touristExploringWrap}>
                        <a>
                              <h5>
                                {el?.title.slice(0, 25)}{" "}
                                {el.title.length > 25 && "...."}
                              </h5>
                              {/* <p>{el?.tours?.length} experiences</p> */}
                            </a>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* <div className={styles.sectionTitle}>
            <h2>State Listing</h2>
          </div>


          <div className={styles.trekMargin}>
            <div className="tour-exploring">
              <div className={styles.touristExploringCarousel}>
                <Swiper
                  rewind={true}
                  navigation={true}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  speed={1000}
                  spaceBetween={5}
                  breakpoints={{
                    1200: {
                      slidesPerView: 6,
                    },
                    992: {
                      slidesPerView: 5,
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
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((_) => (
                    <SwiperSlide key={_}>
                      <div className={styles.touristExploringItem}>
                        <div className={styles.touristExploringWrap}>
                          <a href="#">
                            <h5>State to travel</h5>
                            <p>29 experiences</p>
                          </a>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TagPage;
