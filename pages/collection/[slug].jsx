import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { getHomePage } from "../../redux/actions/homePage";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import { BsFillGearFill, BsGeoAltFill ,BsHeart,BsLightbulb, BsShareFill} from "react-icons/bs";

import "swiper/css";
import "swiper/css/navigation";
import { useRouter } from "next/router";
import { getExploreNearBy, getReviews, getSingleCollectionBySlug } from "redux/actions/collection";
import Link from "next/link";
import moment from "moment";
import { getAllTourLogs } from "redux/actions/tourLogs";
import { getRelatedAttractionLinks, getTagTourLising } from "redux/actions/attraction";
SwiperCore.use([Navigation, Autoplay]);
const CollectionPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [imagePrefix , setImagePrefix] = useState('');

  useEffect(() => {
    dispatch(getHomePage());
    dispatch(getAllTourLogs());
    
    setImagePrefix(window?.location?.origin);
  }, []);

  const {slug} = router.query;
  const {collections , tourLogs , attraction} = useSelector(state=>state);

  useEffect(()=>{
    if(slug){
      dispatch(getSingleCollectionBySlug(slug));
      dispatch(getExploreNearBy(slug));
      dispatch(getReviews(slug));
    }
  },[slug]);

  useEffect(()=>{
    const locationObj = {
      country: collections.singleCollection?.country,
      state: collections.singleCollection?.state,
      city: collections.singleCollection?.city,
    };
    dispatch(getRelatedAttractionLinks(locationObj));
    dispatch(getTagTourLising(locationObj));
  },[collections?.singleCollection])




  console.log('this is the Collection Data -----------------> ' , collections)
  return (
    <div className="fs-14">
      {/* ------------------- Cover Section ------------------- */}

      <div className={styles.pageBannerSection}>
        <div className={styles.attractionContainer}>
          <div className="page-banner-section-slider">
            <div className="banner-slider-item">
              <img src={imagePrefix+collections?.singleCollection?.coverImage} alt="banner" />
            </div>
          </div>
          <div className={styles.centredLeft}>
            <h2 style={{ fontSize: "5vw" }}>
              <b>{collections?.singleCollection?.title}</b>
            </h2>
          </div>

          <div className={` ${styles.bottomRight}`}>
            <Link href="/allDestination" >
              <p className="text-white">
              View All destination 
              </p>
           
            </Link> 
          </div>
        </div>
      </div>

      {/* ------------- Main Container ----------- */}

      <div className="container fs-14">


        {/* ---------------------- Enquiry Form ------------------  */}

        <div className={styles.pageEnquiryForm}>
          <div className="container">
            <div className={styles.sectionTitle}>
              <h2>get in touch</h2>
            </div>
            <form className={`${styles.enquiryForm} row`}>
              <input
                className="form-control  col"
                type="name"
                name="name"
                placeholder="Name"
              />
              <input
                className="form-control col"
                type="email"
                name="email"
                placeholder="Email"
              />
              <input
                className="form-control col"
                type="tel"
                name="phone"
                placeholder="Phone"
              />
              <input
                className={` form-control  col-2  ${styles.btnPrimary}`}
                type="submit"
                name="submit"
              />
            </form>
          </div>
        </div>

        {/* ------------------- Recently Browsed Section ---------------- */}
        <div>
          <div className={styles.sectionTitle}>
            <h2>you recently browsed</h2>
          </div>
          <div className="activity-cards-section py-5">
            <div className={styles.tourWrapper}>
              <div className={`${styles.tourCarousel} row`}>
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
                  {tourLogs?.map((tour, i) => (
                    <SwiperSlide key={tour}>
                      <div
                        className={` ${styles.tourItem} col-12 wow animate__animated animate__zoomIn`}
                        data-wow-delay="0.2s"
                      >
                         <div className={styles.cardWrap}>
                          <div className={styles.cardImage}>
                            <a href="#">
                              <img
                                src={`${imagePrefix}/uploads/tour/${tour?.tourId?.cardImage}`}
                                alt="..."
                                onError={(e) => (
                                  (e.currentTarget.onerror = null),
                                  (e.target.src = "/images/recent_img4.jpg")
                                )}
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
                              <div className={styles.cardPrice}>
                                ₹ {tour?.tourId?.basicPrice}
                              </div>
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

        {/* ---------------  Artical Cards and Related Articles Section ------------------ */}

        <div className="centerSection">
          <div className="row">
          <div className={styles.sectionTitle11}>
              <strong>
                <h2>Popular things to do in shimla</h2>
              </strong>
            </div>


            {/* -------------------------  Popular things to do in shimla  ---------------------- */}

           
              <div className="col-lg-8 col-12">


          {/* ----------------------- 1st ----------------------- */}

                {collections?.singleCollection?.cards?.cardTypeOne?.map((el, i) => (
                  <div className={styles.card1}>
                    {/* <div className="about-title"> */}
                    <div className={` align-items-center d-flex ${styles.sectionTitle11} p-4`}>
                      <h4 className="m-0">1</h4>
                      <h3 className="m-0 ms-5 ">{el.title}</h3>
                    </div>
                    <div className={styles.card1Image}>
                      <a href="#">
                        <img
                          src={`${imagePrefix}/uploads/tour/${el.cardImage}`}
                          alt="promo image"
                        />
                      </a>
                    </div>
                    <div className='mx-5 my-3'>

                 <div className="row mt-5">
                  <div className="col-12 col-md-6">
                    <span className="d-flex align-items-center">
                    <BsFillGearFill className="me-4" style={{color:'#ffa500'}}/>
                     {el?.days || '-'} Days | {el?.night||'-'} Nights
                     <BsGeoAltFill className="ms-4 me-3" style={{color:'#ffa500'}}/>
                     {el?.city?.name} , {el?.state?.name}, {el?.country?.name}
                     </span>
                    
                  </div>
                  <div className="col-12 col-md-6">
                  <h4 className="d-flex align-items-center">
                    <BsLightbulb className="me-4" />
                     Quick Fact
                     <BsHeart className="mx-4" />
                    Save
                    <BsShareFill className="mx-4" />
                     Share
                     </h4>
                  </div>
                   </div>
                  
                    <div className="d-flex my-5">
                   <div className="d-flex flex-column align-items-center justify-content-center">
                  <img src="/images/meals.png"/>
                  <p className="mt-2">
                    Meals Included
                   </p>
                   </div>
                   <div className="d-flex ms-5  flex-column align-items-center justify-content-center">
                  <img src="/images/guide.png"/>
                   <p className="mt-2">
                    Guide
                   </p>
                   </div>

                   <div className="d-flex ms-5  flex-column align-items-center justify-content-center">
                  <img src="/images/cashback.png"/>
                   <p className="mt-2">
                    Cashback
                   </p>
                   </div>

                   <div className="d-flex ms-5  flex-column align-items-center justify-content-center">
                  <img src="/images/verfied_banban.png"/>
                   <p className="mt-2">
                    BanBanJara Verified
                   </p>
                   </div>
                    </div>

                  <h3 style={{fontWeight:600}}>
                    <span className="text-decoration-line-through me-3"  style={{fontWeight:400}}> ₹ {parseInt(el?.basicPrice||0)} </span>
                     ₹ {parseInt(el?.basicPrice||0) - parseInt(el?.discount||0)}
                  </h3>

                  <div className="d-flex mt-4 align-items-center"> 
                  <button
                      className={` ${styles.cardBtn} py-2 px-4 me-4 border-4 text-white` }
                      style={{background:'#ffa500'}}
                    >
                      Book Now
                    </button>

                  <button
                      className={` ${styles.cardBtn} py-2 px-3 border-2 ${styles.btnOutlineSecondary}`}
                    >
                      Send Enquiry  
                    </button>
                  </div>
                    </div>
                  </div>
                ))}


              {/* ...........................................2nd.......................................... */}
              <div className="col-lg-12 col-12">
                {collections?.singleCollection?.cards?.cardTypeTwo.map((el, i) => (
                  <div className={styles.card1}>
                    <div className={` align-items-center d-flex ${styles.sectionTitle11} p-4`}>
                      <h4 className="m-0">2</h4>
                      <h3 className="m-0 ms-5 ">{el?.title}</h3>
                    </div>

                    <div className={styles.card1Image}>
                        <img
                          src={imagePrefix+el.image}
                          alt="promo image"
                        />
                    </div>
                    <div className='mx-5 my-4'>
                      <div className="mt-3 d-flex" >
                        <span className="text-dark" style={{fontWeight:'600'}}>Known For :&nbsp; </span> 
                       {el?.knownOptions?.map(el=>(
                        <a href={el?.redirectionLink} style={{color:'#ffa500' , fontWeight:'600'}} target="__blank" rel="noopener noreferrer"> {el?.title} | &nbsp; </a>
                       ))}
                  </div>
                    <div className="my-5">
                    <h4 className="d-flex align-items-center">
                     <i className="fa-solid fa-gear me-4" style={{color:'#ffa500'}}/>
                     123 Active Covid Cases . 714 in Last 7 days
                     <BsGeoAltFill className="ms-4 me-3" style={{color:'#ffa500'}}/>
                     Distance from {collections?.singleCollection?.city?.name || collections?.singleCollection?.state?.name || collections?.singleCollection?.country?.name} , {el?.distance} kms.
                     </h4>
                    </div>
                    <div className="mb-5" style={{fontSize:'17px'}}>
                    {el?.description.slice(0,250)}... <span className="text-decoration-underline" style={{color:'#ffa500'}}>Read More...</span>
                    </div>
                    <button
                      className={` ${styles.cardBtn} py-2 px-3 border-2 ${styles.btnOutlineSecondary}`}
                    >
                      12 shimla attraction
                    </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* ..........................................3rd............................................ */}


              <div className="col-lg-12 col-12">
                {collections?.singleCollection?.cards?.cardTypeThree?.map((el, i) => (
                  <div className={styles.card1}>
                     <div className={` align-items-center d-flex ${styles.sectionTitle11} p-4`}>
                      <h4 className="m-0">3</h4>
                      <h3 className="m-0 ms-5 ">{el?.title}</h3>
                    </div>
                    <div className={styles.card1Image}>
                      <a href="#">
                        <img
                          src={imagePrefix+el?.image}
                          alt="promo image"
                        />
                      </a>
                    </div>
                    <div className="mx-5 my-3">
                    <div className="mb-5" style={{fontSize:'17px'}}>
                    {el?.description.slice(0,250)}... <span className="text-decoration-underline" style={{color:'#ffa500'}}>Read More...</span>
                    </div>
                    <br />
                      <div className="d-flex mb-3 align-items-center justify-content-between">
                        <h4 style={{fontSize:'18px'}}>{el?.subTitle}</h4>
                        <a href={el?.CTARedirectionUrl} target="__blank" rel="noreferrer noopener">
                        <button
                          className={` ${styles.cardBtn003} py-2 px-3 text-dark border-2 ${styles.btnOutlineSecondary003}`}
                        >
                            <b>{el?.CTAText}</b>
                        </button>
                        </a>
                      <div/>
                    </div>
                    <div className="row my-3">

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
                      slidesPerView: 2,
                    },
                    992: {
                      slidesPerView: 2,
                    },
                    576: {
                      slidesPerView: 1,
                    },
                    0: {
                      slidesPerView: 1,
                    },
                  }}
                  className="custom-swiper-arrow"
                  id="nearYouToursSwiper"
                >

                  
                    {el?.tours?.map((tour, i) => (
                       <SwiperSlide key={tour}>
                          <div className={styles.cardWrap03}>
                            <div className={styles.cardImage03}>
                              <a href="#">
                                <img
                                  src={`${imagePrefix}/uploads/tour/${tour?.cardImage}`}
                                  alt="..."
                                />
                              </a>
                            </div>
                            <div className={styles.cardDetails03}>
                              <div className={styles.cardReview03}>
                                <i className="fa fa-star"></i>{tour?.averageRating}(10)
                              </div>
                              <div className={styles.cardName03}>
                                {tour?.title}
                              </div>
                              <div className="d-flex align-items-center justify-content-center">
                                <div className={styles.cardPrice03}>₹ {parseInt(el?.basicPrice||0) - parseInt(el?.discount||0)}</div>
                                <button
                                  className={` ${styles.cardBtn03} py-2 px-3 border-2 ${styles.btnOutlineSecondary03}`}
                                >
                                  <h5> book now </h5>
                                </button>
                              </div>
                            </div>
                          </div>
                       </SwiperSlide>
                      ))}
                </Swiper>
                    
                    </div>
                    </div>
                  </div>
                ))}
              </div>


              {/* ............................................4th........................................... */}


              <div className="col-lg-12 col-12">
                {collections?.singleCollection?.cards?.cardTypeFour?.map((el, i) => (
                  <div className={styles.card1}>
                      <div className={` align-items-center d-flex ${styles.sectionTitle11} p-4`}>
                      <h4 className="m-0">4</h4>
                      <h3 className="m-0 ms-5 ">{el?.title}</h3>
                    </div>
                    <div className={styles.card1Image}>
                        <img
                          src={imagePrefix+el?.image}
                          alt="promo image"
                        />
                    </div>
                    <div className="mx-5 my-3">
                    <div className="mb-5" style={{fontSize:'17px'}}>
                    {el?.description.slice(0,250)}... <span className="text-decoration-underline" style={{color:'#ffa500'}}>Read More...</span>
                    </div>
                        <div className={styles.cardWrap04}>
                            <div className={styles.cardImage04}>
                                <img
                                  src={`${imagePrefix}/uploads/tour/${el?.tours?.cardImage}`}
                                  alt="..."
                                />
                            </div>
                            <div className={`${styles.cardDetails04} ms-3 mt-5` }>
                              <div className="d-flex justify-content-between align-items-center">
                                <h3>{el?.tours?.title}</h3>
                              <div className={styles.cardReview03}>
                                <h4>
                                <i className="fa fa-star"></i>{el?.tours?.averageRating}(10)
                                </h4>
                                
                              </div>
                              </div>
                              
                              <h2 className={`${styles.cardName03} mt-5`}>
                                {el?.tours?.title}
                              </h2>
                              <div className="d-flex align-items-center mt-4 justify-content-between">
                                <h3 className={styles.cardPrice03}>₹ {parseInt(el?.tours?.basicPrice||0) - parseInt(el?.tours?.discount||0)}</h3>
                                <button
                                  className={` ${styles.cardBtn03} py-2 px-3 border-2 ${styles.btnOutlineSecondary03}`}
                                >
                                  <h3> book now </h3>
                                </button>
                              </div>
                            </div>
                          </div>
                    <button
                      className={` ${styles.cardBtn} py-2 px-3 mt-5 ms-3 border-2 ${styles.btnOutlineSecondary}`}
                    >
                      book now
                    </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* -------------------------   Related  articles and Promotional Side Bar   ---------------------- */}

              <div className="col-lg-4 col-12">
                <div className={styles.relatedArticles}>
                  <div>
                    <h2>related articles</h2>
                  </div>
                  {collections?.singleCollection?.relatedArticles.map((el) => {
                    return (
                      <a href={el?.redirectionUrl} target='__blank' rel="norefrer noopener" className={` ${styles.relatedArticleItem} row`}>
                        <div className="col-4">
                          <img src={imagePrefix+el?.image} alt="" />
                        </div>
                        <div className={`${styles.articleItemName} col-7 text-dark`}>
                         {el?.title}
                        </div>
                      </a>
                    );
                  })}
                </div>

{/* ----------------------- Promotion Side Bar  --------------------- */}

                {collections?.singleCollection?.promotionalSideBar.map((el) => (
                  <a className={styles.pageAd} href={el?.redirectionUrl} rel="noopener noreferrer">
                    <img src={imagePrefix+el?.image} alt="" />
                  </a>
                ))}
              </div>
          </div>
        </div>

        {/* ..................................Explore Near By................................... */}
        <div>
          <div className={styles.sectionTitle21}>
            <h2>Explore Nearby</h2>
          </div>
          <div className="activity-cards-section py-5">
            <div className={styles.tourWrapper}>
              <div className={`${styles.tourCarousel} row`}>
                
                  {collections?.exploreNearBy?.map((el, i) => (
                    <div className="col-sm-3 col-12">
                    <div className={styles.cardWrapExplore}>
                      <div className={styles.cardImageExplore}>
                        <a href="#">
                          <img
                            src={`${imagePrefix}/uploads/attractionPage/${el?.coverImage}`}
                            alt="..."
                          />
                        </a>
                      </div>
                      <div className={styles.cardDetails}>
                        <div className={styles.cardName}>
                          <h5>
                            <span  style={{cursor:'pointer'}} onClick={()=> router.push(`/attraction/${el.title.split(' ').join("-")}`)} className="text-dark"> {el.title} </span>
                          </h5>
                        </div>
                        <h4>
                          <b> Learn More </b>
                        </h4>
                      </div>
                    </div>
                    </div>
                  ))}
              </div>
            </div>
           
          </div>
        </div>

        {/* ------------------- Promotional Bar -------------------- */}

        <div className={`${styles.section} ${styles.hiddenMobile} relative`}>
          <div className="promo-wrapper">
            <div className="row">
              {collections?.singleCollection?.promotionalBar.map((el) => (
                <div className={` ${styles.promoItem} col-sm-6 col-12`}>
                  <div className={styles.promoImage}>
                    <a href={el?.redirectionUrl} target='__blank' rel="norefrer noopner" >
                      <img src={imagePrefix+el?.image} alt="promo image" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ------------------- Reviews ------------------- */}

        <div className="reviews">
          <div className={styles.sectionTitle}>
            <h2>Reviews</h2>
          </div>

          <div className="row">
            
              {collections?.review?.map((el, i) => (
                // <div className={styles.about}>
                 <div className="col-sm-6 col-12" key={el?._id}>
                <div className={`${styles.tourExploringWrapReview} mb-4 p-4`}>
                  <div className="d-flex align-items-center ">
                  <div className={`${styles.cardWrap3} me-4`}>
                    <img src={imagePrefix+el?.image} alt="" />
                  </div>
                  <h5>
                      {el?.tourTitle}
                      <div className={styles.cardReview}>
                        {el?.user}
                        <h4>{moment(el?.created).format('ll')}</h4>
                      </div>
                    </h5>
                  </div>
                
                  <div>
                    <p>
                     {el?.description}
                    </p>
                  </div>
                
                </div>
              </div>
              ))}
           
          </div>
          <button
            className={` ${styles.cardBtnReview} py-2 px-3 border-2 ${styles.btnOutlineSecondary}`}
          >
            Show all 25 reviews
          </button>
        </div>


        {/* ---------------------- Keep Exploring  ----------------------- */}

        {attraction?.tagTourLinks?.length!==0 && (<div>
          <div className={styles.sectionTitle}>
            <h2>Keep exploring in {collections?.singleCollection?.city?.name ||
                collections.singleCollection?.state?.name ||
                collections.singleCollection?.country?.name}</h2>
          </div>

          <div className={styles.trekMargin}>
            <div className="tour-exploring">
              <div className={styles.tourExploringCarousel}>
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
                    <SwiperSlide key={el?.tag?._id}>
                      <div className={styles.tourExploringItem}>
                        <div className={styles.tourExploringWrap}>
                          <a href="#">
                            <h5>{el?.tag?.title?.slice(0, 25)}
                                {el?.tag?.title?.length > 25 && "...."}</h5>
                            <p>{el?.tours?.length} experiences</p>
                          </a>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>)}

        {/* ------------------- Keep Exploring  --------------------- */}

        <div>
          {attraction?.relatedAttractionLinks?.length !==0 && (<div className={styles.sectionTitle}>
            <h2>
              You may also like in{" "}
              {collections?.singleCollection?.city?.name ||
                collections.singleCollection?.state?.name ||
                collections.singleCollection?.country?.name}
            </h2>
          </div>)}

          <div className={styles.trekMargin}>
            <div className="tour-exploring">
              <div className={styles.tourExploringCarousel}>
                
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
                        <div className={styles.tourExploringItem}>
                          <div
                            className={styles.tourExploringWrap}
                            onClick={() => {
                              const slug = el?.title.split(" ").join("-");
                              router.push(`/attraction/${slug}`);
                            }}
                          >
                            <a>
                              <h5>
                                {el?.title.slice(0, 25)}{" "}
                                {el.title.length > 25 && "...."}
                              </h5>
                              {/* <p>29 experiences</p> */}
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
      </div>
    </div>
  );
};

export default CollectionPage;
