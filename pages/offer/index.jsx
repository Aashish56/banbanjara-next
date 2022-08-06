import React, { useEffect, useRef , useCallback} from "react";
import styles from "./style.module.css";
import { getHomePage } from "../../redux/actions/homePage";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import NearYouCard from "../../frontComponents/nearYouCard/NearYouCard";
// import Accordion from "../../frontComponents/Accordion/Accordion"
// import SwiperCore, { Navigation, Autoplay } from "swiper";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";
import { getOfferPage } from "redux/actions/offerPage";
import moment from "moment";
import { Nav, Row, Tab, Col } from "react-bootstrap";

// import { Accordion, Button, Card } from "react-bootstrap";

// import Accordion from './Accordion';

// SwiperCore.use([Navigation, Autoplay]);
const OfferPage = () => {
  const dispatch = useDispatch();
  const [offerPageData, setOfferPageData] = useState("");
  const [typeCashbackOffer, setTypeCashbackOffer] = useState([]);
  const [typeCoupenackOffer, setTypeCoupenOffer] = useState([]);
  const [imagePrefix, setImagePrefix] = useState("");
  const sliderRef = useRef(null);

  useEffect(() => {
    // dispatch(getHomePage());
    dispatch(getOfferPage());
    dispatch(getHomePage());
    setImagePrefix(window?.location?.origin + "/uploads/offerPage/");
  }, []);

  const { offerPage } = useSelector((state) => state);

  const getDateDiffrence = () => {
    var a = moment(new Date());
    var b = moment(new Date());
    return a.diff(b, 'days');
  }

  console.log('this is the Diffrence of Time in the Monent iidihfsfhd ', getDateDiffrence())


  useEffect(() => {
    if (offerPage) {
      setOfferPageData(offerPage[0]);
    }
    let typeCoupen = [];
    let typeCashBack = [];
    offerPage[0]?.offers.forEach((el) => {
      if (el.offerType === 'Coupon' ) {
        typeCoupen = [...typeCoupen, ...el.offer];
      }
      else if (el.offerType === "Cashback") {
        typeCashBack = [...typeCashBack, ...el.offer];
      }
    });
    setTypeCashbackOffer(typeCashBack);
    setTypeCoupenOffer(typeCoupen)
  }, [offerPage]);

  const isEven = (value) => {
    if (value % 2 === 0) {
      return true
    }
    return false
  }
  console.log('this is Offers ============> ', offerPageData)


  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);




  // ------------------ offer Cards Component --------------

  const OfferCards = ({ offerData }) => {
    return (
      <div className="promo-wrapper-accordion">
        <div className="offerCards row">
          <Swiper
            navigation={true}
            modules={[Navigation]}
            slidesPerView={3}
            effect={"coverflow"}
            // grabCursor={true}
            ref={sliderRef}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            spaceBetween={10}
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
          >
            {offerData?.map((el) => (
              <SwiperSlide>
                <div
                  className={` ${styles.promoItemAccordion} col-sm-4 col-12`}
                >
                  <div className={`${styles.cardDetails} d-flex align-items-center justify-content-center flex-column`} >
                    <div className={styles.cardName}>
                      <button
                        className={` mx-auto d-block ${styles.cardBtnOffer1} py-2 px-3 border-2 ${styles.btnOutined}`}
                      >
                        <b>
                          {el?.discountType === "Percentage" ? 'Up To' : (<i class="fa fa-rupee" />)}
                          <br />
                          <strong>
                            <h1>{el?.discountType === "Percentage" ? `${el?.discount || 0} %` : el?.discount || 0}</h1>
                          </strong>
                        </b>
                      </button>
                      <br />
                      <h4 className="text-center">offer valid till 3 june 2021</h4>
                    </div>
                    <div className={styles.cardPrice}>
                      View Package
                    </div>
                    <button
                      className={` ${styles.cardBtn} py-2 px-3 border-2 ${styles.btnOutlineSecondary}`}
                    >
                      <b>
                        Grab The <br /> Deal
                      </b>
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    )
  }




  return (
    <div className="fs-14">
      {/* ------------------- Cover Section ------------------- */}
      <div className={styles.pageBannerSection}>
        <div className={styles.attractionContainer}>
          <div className="page-banner-section-slider">
            <div className="banner-slider-item">
              <img
                src={imagePrefix + offerPageData?.headerImage}
                alt="banner"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ------------- Main Container ----------- */}

      <div className="container fs-14">
        {/* ---------------------- linear gradient button ------------------  */}

        <div className={styles.pageEnquiryForm}>
          <div className="container">
            <div className={styles.sectionTitle11}>
              {/* <h2>50% Discount For Around The World</h2> */}
              <div className={styles.sectionTitle}>
                <h2 className="pb-4">{offerPageData?.heading}</h2>
              </div>
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row className="customOfferTabs">
                  <Col sm={12}>
                    <Nav variant="pills" className="justify-content-center">
                      <Nav.Item  >
                        <Nav.Link eventKey="first">Cashback</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Coupans</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={12} className='mt-5'>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <OfferCards offerData={typeCashbackOffer} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <OfferCards offerData={typeCoupenackOffer} />
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>


{/* <div className="d-flex justify-content-between">
  <a onClick={ ()=>handlePrev()}>Prev</a>
  <a onClick={()=>handleNext()}>Next</a>
</div> */}




            </div>
          </div>
        </div>

        {/* ......................................................................... */}

        <div className={styles.sectionTitle1}>
          <div class="input-group mb-3">
            <button class="input-group-text d-flex justify-content-center" for="inputGroupSelect01">
              <a href={offerPageData?.directionalBarLink1} className='text-white' target='_blank' rel="noopener noreferrer" >
                <h3 className="text-center">
                  {offerPageData?.directionalBar1}
                </h3>
              </a>
            </button>
          </div>{" "}
        </div>



        {/* ------------------------- row 1  ---------------------- */}
        {offerPageData?.offersSection?.map((el, i) => (
          <div className="row">
            <div className={`col-sm-6 ${isEven(i + 1) && 'order-sm-2'}`}>
              <div className={styles.cardWrap1}>
                <a href="#">
                  <img src={imagePrefix + el?.icon} alt="promo image" />
                </a>
              </div>
            </div>
            <div className={`col-sm-6 ${isEven(i) && 'order-sm-1'}`}>
              <div className={styles.cardWrap2}>
                <div>
                  <b>
                    <h3>{el?.label1}</h3>
                  </b>
                  <h4>
                    {el?.text}
                  </h4>
                  {/* {offerPageData?.offersSection} */}

                  <button
                    className={` ${styles.cardBtn} py-2 px-3 border-2 ${styles.btnOutlineSecondary}`}
                  >
                    <a href={el?.link} target='_blank' rel="noopener noreferrer">
                      <b>Grab The Deal</b>
                    </a>

                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}


        {/* <div className="row">

            <div className="col-sm-6">
              <div className={styles.cardWrap2}>
                {[1].map((_) => {
                  return (
                    <div>
                      <b>
                        {" "}
                        <h3>Kheergang Trek with camping</h3>
                      </b>
                      <h4>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Repellat iure ipsum porro iusto, hic dolorum optio
                        laudantium vel cum earum quo assumenda atque, minima
                        nobis id quae aliquam, placeat odio.
                      </h4>

                      {offerPageData?.offersSection}

                      <button
                        className={` ${styles.cardBtn} py-2 px-3 border-2 ${styles.btnOutlineSecondary}`}
                      >
                        <b>Grab The Deal</b>
                      </button>
                    </div>
                  );  
                })}
              </div>
            </div>
          </div> */}

        {/* ---------------  Artical Cards and Related Articles Section ------------------ */}



        <div className="row">
          {/* -------------------------  Attraction  Cards section  ---------------------- */}
          <div className="col-lg-12  col-12">
          <img src={imagePrefix+offerPageData?.testimonials} alt="" />
            {/* <div className={styles.cardWrap3}>
             
              {[1].map((_) => {
                return (
                  <div>
                    <h2>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Repellat iure ipsum porro iusto, hic dolorum optio
                      laudantium vel cum earum quo assumenda atque, minima nobis
                      id quae aliquam, placeat odio.
                    </h2>

                    <img src={`/images/recent_img${_}.jpg`} alt="" />
                    <h3>
                      <b>Sara Martin</b>
                      <br />
                      <br />
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star"></span>
                    </h3>
                  </div>
                );
              })}
            </div> */}
          </div>

          {/* ...................................................................... */}

          <div className={styles.sectionTitle1}>
            <div class="input-group mb-3">
              <button class="input-group-text justify-content-center" for="inputGroupSelect01">
                {/* <h3>
                <i class="fa fa-info-circle" aria-hidden="true"></i>
                it pays to be on an experience with us,literally! Read more.
              </h3> */}
                <h3 className="text-center">
                  {/* <i class="fa fa-info-circle" aria-hidden="true"></i> */}
                </h3>
                <a href={offerPageData?.directionalBarLink2} className='text-white' target='_blank' rel="noopener noreferrer" >
                  <h3> {offerPageData?.directionalBar2}</h3>
                </a>
              </button>
            </div>{" "}
          </div>

          {/* ............................................................................ */}
        </div>
      </div>
    </div>
  );
};

export default OfferPage;
