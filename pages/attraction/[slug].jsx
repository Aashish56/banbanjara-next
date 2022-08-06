import React, { useEffect } from "react";
import styles from "./style.module.css";
import { getHomePage } from "../../redux/actions/homePage";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";
import {
  getAttractionBySlug,
  getRelatedArticles,
  getRelatedAttractionLinks,
  getTagTourLising,
} from "redux/actions/attraction";
import { getAllDestination } from "redux/actions";
import { getAllTourLogs } from "redux/actions/tourLogs";
import { useRouter } from "next/router";
import { getPopularDestination } from "redux/actions/destination";
import { getLandingByLocation } from "redux/actions/landing";
SwiperCore.use([Navigation, Autoplay]);
const AttractionPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { attraction, tourLogs, destination, landing } = useSelector(
    (state) => state
  );
  console.log("this is the all Attraction -----------------> ", attraction.tagTourLinks);
  const [attractionPageData, setAttractionPageData] = useState("");

  // console.log('attration state -----------> ' , attraction)
  const [imagePrefix, setImagePrefix] = useState("");

  const { slug } = router.query;

  useEffect(() => {
    dispatch(getHomePage());
    dispatch(getAllDestination());
    dispatch(getAllTourLogs());
    setImagePrefix(window?.location?.origin + "/uploads/attractionPage/");
  }, []);
  useEffect(() => {
    landing?.landingByLocation.forEach((el) => {
      if (el?.cover) {
        el.cover = el.cover.split("\\").join("/");
      }
    });
    console.log("landing data ", landing?.landingByLocation);
  }, [landing?.landingByLocation]);

  useEffect(() => {
    if (!slug) {
      return;
    }
    dispatch(getAttractionBySlug(slug));
  }, [slug]);

  useEffect(() => {
    setAttractionPageData(attraction?.singleAttraction);
    const locationObj = {
      country: attraction?.singleAttraction?.country,
      state: attraction?.singleAttraction?.state,
      city: attraction?.singleAttraction?.city,
    };
    //    console.log( "attraction Dta ----------->"  , attraction?.singleAttraction)
    dispatch(getRelatedArticles(locationObj));
    dispatch(getPopularDestination(locationObj));
    dispatch(getLandingByLocation(locationObj));
    dispatch(getRelatedAttractionLinks(locationObj));
    dispatch(getTagTourLising(locationObj));
  }, [attraction?.singleAttraction]);

  useEffect(() => {
    const filtredLinks = attraction?.relatedAttractionLinks?.filter(
      (el) => el?._id !== attraction.singleAttraction?._id
    );
    attraction.relatedAttractionLinks = filtredLinks;
  }, [attraction.relatedAttractionLinks]);

  return (
    <div className="fs-14">
      {/* ------------------- Cover Section ------------------- */}

      <div className={styles.pageBannerSection}>
        <div className={styles.attractionContainer}>
          <div className="page-banner-section-slider">
            <div className={`banner-slider-item `}>
              <img
                src={imagePrefix + attractionPageData?.coverImage}
                alt="banner"
              />
            </div>
          </div>
          <div className={styles.centredLeft}>
            <h2 style={{ fontSize: "3vw" }}>
              <b>{attractionPageData?.title}</b>
            </h2>
          </div>

          <div className={`${styles.centeredright} ${styles.hiddenMobile}`}>
            <ul className="banner-scroll-menu scroller">
              {destination?.allDestination?.map((el) => (
                <li className={`${styles.bannerScrollItem} fs-14`}>
                  <a
                    href="#"
                    onClick={() => {
                      const sluggedData = el?.title?.split(" ").join("-");
                      router.push(`/destination/${sluggedData}`);
                    }}
                  >
                    {el?.title}
                  </a>
                </li>
              ))}
              {/* <li className={`${styles.bannerScrollItem} fs-14`}>
                                <a href="#">recommanded things to do in mumbai</a>
                            </li>
                            <li className={`${styles.bannerScrollItem} fs-14`}>
                                <a href='#'>adventure things to do in mumbai</a>
                            </li>
                            <li className={`${styles.bannerScrollItem} fs-14`}>
                                <a href="#">things to do in mumbai with family</a>
                            </li>
                            <li className={`${styles.bannerScrollItem} fs-14`}>
                                <a href="#">popular day outings in mumbai</a>
                            </li> */}
              {/* <li className={styles.bannerScrollItem}>
                                        <a href="#">recommanded things to do in mumbai</a>
                                    </li>
                                    <li className={styles.bannerScrollItem}>
                                        <a href="#">recommanded things to do in mumbai</a>
                                    </li>
                                    <li className={styles.bannerScrollItem}>
                                        <a href="#">recommanded things to do in mumbai</a>
                                    </li>
                                    <li className={styles.bannerScrollItem}>
                                        <a href="#">recommanded things to do in mumbai</a>
                                    </li>
                                    <li className={styles.bannerScrollItem}>
                                        <a href="#">recommanded things to do in mumbai</a>
                                    </li>
                                    <li className={styles.bannerScrollItem}>
                                        <a href="#">recommanded things to do in mumbai</a>
                                    </li> */}
            </ul>
          </div>
          <div
            className={`${styles.bottomRight} cursor-pointer`}
            onClick={() => router.push("/allDestination")}
          >
            View All destination{" "}
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
                placeholder="Your Name"
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
                                src={`${window?.location?.origin}/uploads/tour/${tour?.tourId?.cardImage}`}
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

        <div className="row">
          {/* -------------------------  Attraction  Cards section  ---------------------- */}

          <div className="col-lg-8 col-md-12 col-12">
            {attractionPageData?.attractionCards?.map((card, i) => (
              <div className={styles.about}>
                <div className="about-title">
                  <h2>{card?.title}</h2>
                </div>
                {card?.image && (
                  <div>
                    <img src={imagePrefix + card.image} alt="" />
                  </div>
                )}
                <div className="px-3">
                  <p className="d-inline px-4">{card?.description}</p>
                  <a href="#" className="d-inline">
                    read more...
                  </a>
                  {/* <p>Renowned as one of the most iconic structures of India, Gateway of India, was
                                    constructed
                                    along the Mumbai Harbour in 1924. Located at the tip of Apollo Bunder, this massive
                                    structure represents a commemorate memorial.</p>
                                <p>It was constructed in honour of King George V and his wife Queen Mary when they were
                                    on
                                    their tour to India. Once a grandeur of the British settlement, this famous tourist
                                    spot
                                    today pulls food stallers, vendors, nature lovers, and photographers to adore its
                                    charm.
                                    <a href="#">read more...</a>
                                </p> */}
                </div>
              </div>
            ))}
            {/* <div className={styles.about}>

                            <div >
                                <h2>what not to miss at gateway of india</h2>
                            </div>
                            <div>
                                <p><b>1. Embrace the architectural brilliance of Gateway of India –</b> The whole
                                    structure is
                                    carved out from a mixture of indissoluble concrete and yellow basalt. Here, you get
                                    to see a perfect mash between Indian and Saracenic architectural style with a tinge
                                    of Muslim architectural flavor. </p>
                                <p><b>2. Click sunrise and sunset pictures –</b> Gateway of India overlooks the vastly
                                    stretched Arabian Sea. The region is highly adored by photographers and nature
                                    lovers. If photography is your passion, spare a day off from your hectic schedule
                                    and visit Gateway of India early in the morning. From morning till evening, you will
                                    have plenty of moments to capture the beautiful transformations of the sky and the
                                    shining sea waves. </p>
                                <p><b>3. Get on a boat to Elephanta Caves –</b> If you are on a Mumbai tour, you can't
                                    simply
                                    miss on visiting the mighty Elephanta Caves. To reach there, you need to board a
                                    boat downstairs from the Gateway of India.
                                    <a href="#" >read more...</a>
                                </p>
                            </div>
                        </div> */}
          </div>

          {/* -------------------------  Attraction  Related  articles  ---------------------- */}

          {attraction?.relatedArticles?.length && (<div className="col-lg-4 col-md-12 col-12">
            <div className={styles.relatedArticles}>
              <div>
                <h2>Related articles</h2>
              </div>
                {attraction?.relatedArticles?.map((el) => {
                  return (
                    <div
                      onClick={() => {
                        const slug = el?.title.split(" ").join("-");
                        router.push(`/attraction/${slug}`);
                      }}
                      className={` ${styles.relatedArticleItem} row cursor-pointer`}
                    >
                      <div className="col-5">
                        <img src={imagePrefix + el?.coverImage} alt="" />
                      </div>
                      <div className={`${styles.articleItemName} col-7`}>
                        {el?.title}
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* ------------------ Promotional Side Bar ------------------  */}
            {attractionPageData?.promontionSideBar?.map((sideBar) => (
              <div className={styles.pageAd} style={{ height: "350px" }}>
                <a
                  href={sideBar?.redirectionUrl}
                  target="__blank"
                  rel="noreferrer"
                >
                  <img
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                    src={imagePrefix + sideBar.image}
                    alt=""
                  />
                </a>
              </div>
            ))}
          </div>)}
        </div>

        {/* ------------------- Promotional Bar -------------------- */}

        <div className={`${styles.section} ${styles.hiddenMobile} relative`}>
          <div className="promo-wrapper">
            <div className="row">
              {attractionPageData?.promotionBar?.map((promotionBar) => (
                <div className={` ${styles.promoItem} col-sm-6 col-12`}>
                  <div className={styles.promoImage}>
                    <a
                      href={promotionBar?.redirectionUrl}
                      target="__blank"
                      rel="noreferrer"
                    >
                      <img
                        src={imagePrefix + promotionBar.image}
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

        {landing?.landingByLocation?.length !==0 && (<div className={styles.pageTravelogues}>
          <div className={styles.sectionTitle}>
            <h2>travelogues - free guid</h2>
          </div>
          <div>
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
                {landing?.landingByLocation?.map((el, i) => (
                  <SwiperSlide key={i}>
                    <div className={styles.tourItem} data-wow-delay="0.2s">
                      <div
                        className={`${styles.tourWrap}  ${styles.traveloguesWrap}`}
                      >
                        <div className={styles.traveloguesImage}>
                          <a href="#">
                            <img
                              src={`${window.location.origin}/${el?.cover}`}
                              alt="..."
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
        </div>)}

        {/* -------------------  Popular Related Destination Section ---------------- */}

        {destination?.popluarDestionation?.length !==0 && (<div className={styles.relatedPlaces}>
          <div className={styles.sectionTitle}>
            <h2>popular related destinations</h2>
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
                  <SwiperSlide key={i}>
                    <div className={`${styles.relatedPlacesItem}`}>
                      <img src={`/images/recent_img${i + 1}.jpg`} alt="" />
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
                        {/* <button className={styles.relatedPlacesBtn} type="button">321 listing</button> */}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
          </div>
        </div>)}

        {/* ------------------- Faqs Section ------------------- */}
       {attractionPageData?.faq?.length!==0 && ( <div>
          <div className={styles.sectionTitle}>
            <h2>FAQ's</h2>
          </div>

          <div className={`${styles.mobileFaq} row`}>
            <div className="pl-5 col-12 mx-auto my-5">
              <div className="page-faqs-section" id="pageFaqsSection">
                {/* {[1,2,3].map(_=>(
                          ))} */}

                
                  {attractionPageData?.faq?.map((el, i) => (
                    <>
                      <div className={styles.faqCard} key={el?._id}>
                        <div className="faq-header ">
                          <button
                            className={`faqButton  ${
                              i + 1 !== 1 && "collapsed"
                            } `}
                            type="button"
                            data-toggle={`#collapse${i}`}
                            aria-expanded="true"
                          >
                            <span className={styles.faqHeaderNum}>
                              0{i + 1}
                            </span>{" "}
                            {el?.question}
                          </button>
                        </div>
                        <div
                          id={`collapse${i}`}
                          className={`collapse ${i + 1 === 1 && "show"}`}
                          data-parent="#pageFaqsSection"
                        >
                          <div
                            className={`${styles.faqBody} accordion-body`}
                            dangerouslySetInnerHTML={{ __html: el?.answer }}
                          />
                        </div>
                      </div>
                      <hr />
                    </>
                  ))}
              </div>
            </div>
            {/* <div className="col-lg-7 col-md-12 col-12">
                       <div className="faqs-image">
                           <img src="/images/faq_img.png" alt="..." style={{ height:"450px"}}/>
                       </div>
                   </div> */}
          </div>
        </div>)}

        {/* ---------------------- Keep Exploring  ----------------------- */}

        {attraction?.tagTourLinks?.length!==0 && (<div>
          <div className={styles.sectionTitle}>
            <h2>Keep exploring in {attraction?.singleAttraction?.city?.name ||
                attraction?.singleAttraction?.state?.name ||
                attraction?.singleAttraction?.country?.name}</h2>
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
              {attraction?.singleAttraction?.city?.name ||
                attraction?.singleAttraction?.state?.name ||
                attraction?.singleAttraction?.country?.name}
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

        {/* ------------------- Listing Exploring Shimla --------------------- */}

        {/* <div>
    <div className={styles.sectionTitle}>
    <h2 >Listing in Shimla</h2>
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
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(_ => (
                                        <SwiperSlide key={_}>
                                                           <div className={styles.tourExploringItem}>
                        <div className={styles.tourExploringWrap}>
                            <a href="#">
                                <h5>Nature and Outdoors</h5>
                                <p>29 experiences</p>
                            </a>
                        </div>
                    </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                </div>
            </div>
        </div>

</div> */}
      </div>
    </div>
  );
};

export default AttractionPage;
