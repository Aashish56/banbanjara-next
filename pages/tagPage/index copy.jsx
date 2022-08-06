import React, { useEffect } from "react";
import styles from "./style.module.css";
import { getAllTagPage } from "../../redux/actions/tagPage";
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from "swiper/react";
import NearYouCard from "../../frontComponents/nearYouCard/NearYouCard";
import SwiperCore, { Navigation, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
SwiperCore.use([Navigation, Autoplay]);
const tagPage = (data) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTagPage());
  }, []);

  const { tagPage } = useSelector(state=>state);
  console.log('tagPage-', tagPage);

  return (
    <div className="fs-14">
      {/* ------------------- Cover Section ------------------- */}

      <div className={styles.pageBannerSection}>
        {/* <div className={styles.tagPageContainer}> */}
        {/* <div className="page-banner-section-slider">
            <div className="banner-slider-item">
              <img src="/images/banner_image.jpg" alt="banner" />
            </div>
          </div> */}

        <div className={`${styles.centeredright} ${styles.hiddenMobile}`}></div>
        {/* <div className={styles.bottomRight}>View All destination </div> */}
        {/* </div> */}
      </div>

      {/* ------------- Main Container ----------- */}

      <div className="container fs-14">
        {/* ---------------------- Banner Image ------------------  */}

        <div className="col-xl-12">
          {[1].map((_, i) => (
            <div className={styles.about}>
              <div className="about-title"></div>
              <div>
                <img src={`/images/recent_img${_}.jpg`} alt="" />
              </div>
            </div>
          ))}
        </div>
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
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((tour, i) => (
                    <SwiperSlide key={tour}>
                      <div
                        className={` ${styles.touristItem} col-12 wow animate__animated animate__zoomIn`}
                        data-wow-delay="0.2s"
                      >
                        <div className={styles.cardWrap}>
                          <div className={styles.cardImage}>
                            <a href="#">
                              <img
                                src={`/images/recent_img${i + 1}.jpg`}
                                alt="..."
                              />
                            </a>
                          </div>
                          <div className={styles.cardDetails}>
                            <div className={styles.cardReview}>
                              <i className="fa fa-star"></i>3.9
                            </div>
                            <div className={styles.cardName}>
                              adventure activities in shimla
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                              <div className={styles.cardPrice}>₹ 5555</div>
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
          <div>
            <h2>you can stay</h2>
          </div>
          <div className="col-sm-4">
            <div className={styles.cardWrap}>
              {[1].map((_) => {
                return (
                  <div className={` ${styles.traveloguesImage} row`}>
                    <div className="Stays">
                      <img src={`/images/recent_img${_}.jpg`} alt="" />
                    </div>
                    <div className={styles.tourSummery}>
                      <h4 className={styles.tourTitle}>
                        20 Best Things to do in Shimla - 2021 (with 4100+
                        Reviews)
                      </h4>
                      <div className={styles.cardPrice}>₹ 5555</div>
                      <button
                        className={` ${styles.cardBtn} py-2 px-3 border-2 ${styles.btnOutlineSecondary}`}
                      >
                        book now
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {[1, 2, 3].map((_) => (
              <div className={styles.pageAd}>
                <img src={`/images/recent_img${_}.jpg`} alt="" />
              </div>
            ))}
          </div>
          <div className="col-sm-4">
            <div className={styles.cardWrap}>
              {[1].map((_) => {
                return (
                  <div className={` ${styles.traveloguesImage} row`}>
                    <div className="Stays">
                      <img src={`/images/recent_img${_}.jpg`} alt="" />
                    </div>
                    <div className={styles.tourSummery}>
                      <h4 className={styles.tourTitle}>
                        20 Best Things to do in Shimla - 2021 (with 4100+
                        Reviews)
                      </h4>
                      <div className={styles.cardPrice}>₹ 5555</div>
                      <button
                        className={` ${styles.cardBtn} py-2 px-3 border-2 ${styles.btnOutlineSecondary}`}
                      >
                        book now
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {[1, 2, 3].map((_) => (
              <div className={styles.pageAd}>
                <img src={`/images/recent_img${_}.jpg`} alt="" />
              </div>
            ))}
          </div>
        </div>

        <div className="row">
          {/* -------------------------  2nd row  ---------------------- */}

          <div className="col-sm-4">
            <div className={styles.cardWrap}>
              {[1].map((_) => {
                return (
                  <div className={` ${styles.traveloguesImage} row`}>
                    <div className="Stays">
                      <img src={`/images/recent_img${_}.jpg`} alt="" />
                    </div>
                    <div className={styles.tourSummery}>
                      <h4 className={styles.tourTitle}>
                        20 Best Things to do in Shimla - 2021 (with 4100+
                        Reviews)
                      </h4>
                      <div className={styles.cardPrice}>₹ 5555</div>
                      <button
                        className={` ${styles.cardBtn} py-2 px-3 border-2 ${styles.btnOutlineSecondary}`}
                      >
                        book now
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {[1, 2, 3].map((_) => (
              <div className={styles.pageAd}>
                <img src={`/images/recent_img${_}.jpg`} alt="" />
              </div>
            ))}
          </div>
          <div className="col-sm-4">
            <div className={styles.cardWrap}>
              {[1].map((_) => {
                return (
                  <div className={` ${styles.traveloguesImage} row`}>
                    <div className="Stays">
                      <img src={`/images/recent_img${_}.jpg`} alt="" />
                    </div>
                    <div className={styles.tourSummery}>
                      <h4 className={styles.tourTitle}>
                        20 Best Things to do in Shimla - 2021 (with 4100+
                        Reviews)
                      </h4>
                      <div className={styles.cardPrice}>₹ 5555</div>
                      <button
                        className={` ${styles.cardBtn} py-2 px-3 border-2 ${styles.btnOutlineSecondary}`}
                      >
                        book now
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {[1, 2, 3].map((_) => (
              <div className={styles.pageAd}>
                <img src={`/images/recent_img${_}.jpg`} alt="" />
              </div>
            ))}
          </div>
        </div>

        {/* ---------------  Explore NearBy ------------------ */}

        <div className="row">
          {/* ------------------------- 1st Row   ---------------------- */}
          <div>
            <h2>Explore NearBy </h2>
          </div>
          <div className="col-sm-2">
            <div className={styles.cardWrap}>
              {[1].map((_) => {
                return (
                  <div className={` ${styles.cardImage} row`}>
                    <div className>
                      <img src={`/images/recent_img${_}.jpg`} alt="" />
                    </div>
                  </div>
                );
              })}
              <div className={styles.cardDetails}>
                <div className={styles.cardName}>
                  adventure activities in shimla
                </div>

                <div className={styles.cardPrice}>₹ 5555</div>
                <button
                  className={` ${styles.cardBtn} py-2 px-3 border-2 ${styles.btnOutlineSecondary}`}
                >
                  book now
                </button>
              </div>
            </div>
            {[1, 2, 3].map((_) => (
              <div className={styles.pageAd}>
                <img src={`/images/recent_img${_}.jpg`} alt="" />
              </div>
            ))}
          </div>
          <div className="col-sm-2">
            <div className={styles.cardWrap}>
              {[1].map((_) => {
                return (
                  <div className={` ${styles.cardImage} row`}>
                    <div className>
                      <img src={`/images/recent_img${_}.jpg`} alt="" />
                    </div>
                  </div>
                );
              })}
              <div className={styles.cardDetails}>
                <div className={styles.cardName}>
                  adventure activities in shimla
                </div>

                <div className={styles.cardPrice}>₹ 5555</div>
                <button
                  className={` ${styles.cardBtn} py-2 px-3 border-2 ${styles.btnOutlineSecondary}`}
                >
                  book now
                </button>
              </div>
            </div>

            {[1, 2, 3].map((_) => (
              <div className={styles.pageAd}>
                <img src={`/images/recent_img${_}.jpg`} alt="" />
              </div>
            ))}
          </div>
          <div className="col-sm-2">
            <div className={styles.cardWrap}>
              {[1].map((_) => {
                return (
                  <div className={` ${styles.cardImage} row`}>
                    <div className>
                      <img src={`/images/recent_img${_}.jpg`} alt="" />
                    </div>
                  </div>
                );
              })}
              <div className={styles.cardDetails}>
                <div className={styles.cardName}>
                  adventure activities in shimla
                </div>

                <div className={styles.cardPrice}>₹ 5555</div>
                <button
                  className={` ${styles.cardBtn} py-2 px-3 border-2 ${styles.btnOutlineSecondary}`}
                >
                  book now
                </button>
              </div>
            </div>

            {[1, 2, 3].map((_) => (
              <div className={styles.pageAd}>
                <img src={`/images/recent_img${_}.jpg`} alt="" />
              </div>
            ))}
          </div>
          <div className="col-sm-2">
            <div className={styles.cardWrap}>
              {[1].map((_) => {
                return (
                  <div className={` ${styles.cardImage} row`}>
                    <div className>
                      <img src={`/images/recent_img${_}.jpg`} alt="" />
                    </div>
                  </div>
                );
              })}
              <div className={styles.cardDetails}>
                <div className={styles.cardName}>
                  adventure activities in shimla
                </div>

                <div className={styles.cardPrice}>₹ 5555</div>
                <button
                  className={` ${styles.cardBtn} py-2 px-3 border-2 ${styles.btnOutlineSecondary}`}
                >
                  book now
                </button>
              </div>
            </div>

            {[1, 2, 3].map((_) => (
              <div className={styles.pageAd}>
                <img src={`/images/recent_img${_}.jpg`} alt="" />
              </div>
            ))}
          </div>
        </div>

        <div className="row">
          {/* -------------------------  2nd row  ---------------------- */}

          <div className="col-sm-2">
            <div className={styles.cardWrap}>
              {[1].map((_) => {
                return (
                  <div className={` ${styles.cardImage} row`}>
                    <div className>
                      <img src={`/images/recent_img${_}.jpg`} alt="" />
                    </div>
                  </div>
                );
              })}
              <div className={styles.cardDetails}>
                <div className={styles.cardName}>
                  adventure activities in shimla
                </div>

                <div className={styles.cardPrice}>₹ 5555</div>
                <button
                  className={` ${styles.cardBtn} py-2 px-3 border-2 ${styles.btnOutlineSecondary}`}
                >
                  book now
                </button>
              </div>
            </div>

            {[1, 2, 3].map((_) => (
              <div className={styles.pageAd}>
                <img src={`/images/recent_img${_}.jpg`} alt="" />
              </div>
            ))}
          </div>
          <div className="col-sm-2">
            <div className={styles.cardWrap}>
              {[1].map((_) => {
                return (
                  <div className={` ${styles.cardImage} row`}>
                    <div className>
                      <img src={`/images/recent_img${_}.jpg`} alt="" />
                    </div>
                  </div>
                );
              })}
              <div className={styles.cardDetails}>
                <div className={styles.cardName}>
                  adventure activities in shimla
                </div>

                <div className={styles.cardPrice}>₹ 5555</div>
                <button
                  className={` ${styles.cardBtn} py-2 px-3 border-2 ${styles.btnOutlineSecondary}`}
                >
                  book now
                </button>
              </div>
            </div>

            {[1, 2, 3].map((_) => (
              <div className={styles.pageAd}>
                <img src={`/images/recent_img${_}.jpg`} alt="" />
              </div>
            ))}
          </div>
          <div className="col-sm-2">
            <div className={styles.cardWrap}>
              {[1].map((_) => {
                return (
                  <div className={` ${styles.cardImage} row`}>
                    <div className>
                      <img src={`/images/recent_img${_}.jpg`} alt="" />
                    </div>
                  </div>
                );
              })}
              <div className={styles.cardDetails}>
                <div className={styles.cardName}>
                  adventure activities in shimla
                </div>

                <div className={styles.cardPrice}>₹ 5555</div>
                <button
                  className={` ${styles.cardBtn} py-2 px-3 border-2 ${styles.btnOutlineSecondary}`}
                >
                  book now
                </button>
              </div>
            </div>

            {[1, 2, 3].map((_) => (
              <div className={styles.pageAd}>
                <img src={`/images/recent_img${_}.jpg`} alt="" />
              </div>
            ))}
          </div>
          <div className="col-sm-2">
            <div className={styles.cardWrap}>
              {[1].map((_) => {
                return (
                  <div className={` ${styles.cardImage} row`}>
                    <div className>
                      <img src={`/images/recent_img${_}.jpg`} alt="" />
                    </div>
                  </div>
                );
              })}
              <div className={styles.cardDetails}>
                <div className={styles.cardName}>
                  adventure activities in shimla
                </div>

                <div className={styles.cardPrice}>₹ 5555</div>
                <button
                  className={` ${styles.cardBtn} py-2 px-3 border-2 ${styles.btnOutlineSecondary}`}
                >
                  book now
                </button>
              </div>
            </div>

            {[1, 2, 3].map((_) => (
              <div className={styles.pageAd}>
                <img src={`/images/recent_img${_}.jpg`} alt="" />
              </div>
            ))}
          </div>
        </div>

        {/* ------------------- Promotional Bar -------------------- */}

        <div className={`${styles.section} ${styles.hiddenMobile} relative`}>
          <div className="promo-wrapper">
            <div className="row">
              {[1, 2].map((_) => (
                <div className={` ${styles.promoItem} col-sm-6 col-12`}>
                  <div className={styles.promoImage}>
                    <a href="#">
                      <img
                        src={`uploads/Itinerary/images-1648236318435.jpg`}
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
            <h2>Countries</h2>
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
              {[1, 2, 3, 4, 5, 6, 7, 8].map((_) => (
                <SwiperSlide key={_}>
                  <div className={styles.tourItem} data-wow-delay="0.2s">
                    <div
                      className={`${styles.tourWrap}  ${styles.traveloguesWrap}`}
                    >
                      <div className={styles.traveloguesImage}>
                        <a href="#">
                          <img src={`/images/recent_img${_}.jpg`} alt="..." />
                        </a>
                      </div>
                      <div className={styles.tourSummery}>
                        <h4 className={styles.tourTitle}>
                          20 Best Things to do in Shimla - 2021 (with 4100+
                          Reviews)
                        </h4>
                        <p style={{ color: "#717171" }}>
                          We enjoyed a lot staying here. Location was perfect
                          with an amazing view to the river and an orchid.
                          Staff.....
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
            <h2>City</h2>
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
              {[1, 2, 3, 4, 5, 6, 7, 8].map((_) => (
                <SwiperSlide key={_}>
                  <div className={`${styles.relatedPlacesItem}`}>
                    <img src={`/images/recent_img${_}.jpg`} alt="" />
                    <div className={styles.relatedPlacesText}>
                      <h2>shimla</h2>
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
          <div className={styles.sectionTitle}>
            <h2>You may also like in Shimla</h2>
          </div>

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
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((_) => (
                    <SwiperSlide key={_}>
                      <div className={styles.touristExploringItem}>
                        <div className={styles.touristExploringWrap}>
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
        </div>

        {/* ------------------- Listing Country State City --------------------- */}

        <div>
          <div className={styles.sectionTitle}>
            <h2>Country Listing</h2>
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
                            <h5>Countries to travel</h5>
                            <p>29 experiences</p>
                          </a>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* <div className={styles.tourExploringItem}>
                        <div className={styles.tourExploringWrap}>
                            <a href="#">
                                <h5>Nature and Outdoors</h5>
                                <p>29 experiences</p>
                            </a>
                        </div>
                    </div> */}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.sectionTitle}>
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

                {/* <div className={styles.tourExploringItem}>
                        <div className={styles.tourExploringWrap}>
                            <a href="#">
                                <h5>Nature and Outdoors</h5>
                                <p>29 experiences</p>
                            </a>
                        </div>
                    </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default tagPage;
