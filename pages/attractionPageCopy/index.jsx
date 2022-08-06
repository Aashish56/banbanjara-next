import React, { useEffect } from 'react'
import styles from './style.module.css'
import { getHomePage } from '../../redux/actions/homePage'
import { useDispatch, useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from "swiper/react";
import NearYouCard from "../../frontComponents/nearYouCard/NearYouCard";
import SwiperCore, { Navigation, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import { useState } from 'react';
import { getAllAttraction } from 'redux/actions/attraction';
SwiperCore.use([Navigation, Autoplay]);
const AttractionPage = () => {
    const dispatch = useDispatch();
    const {attraction} = useSelector(state=>state);
    const [attractionPageData , setAttractionPageData] = useState('');
    const [imagePrefix , setImagePrefix] = useState('');

    useEffect(() => {
        dispatch(getHomePage());
        dispatch(getAllAttraction());
        setImagePrefix(window?.location?.origin+'/uploads/attractionPage/');
    }, []);

    useEffect(()=>{
      setAttractionPageData(attraction?.attractionData[0]);
    } , [attraction?.attractionData]);

    console.log( 'attractionPageData ' , attractionPageData)

    return (
        <div className='fs-14'>
            {/* ------------------- Cover Section ------------------- */}

            <div className={styles.pageBannerSection} >
                <div className={styles.attractionContainer}>
                    <div className="page-banner-section-slider">
                        <div className="banner-slider-item">
                            <img src={imagePrefix+attractionPageData?.coverImage} alt="banner" />
                        </div>
                    </div>
                    <div className={styles.centredLeft}>
                        <h2 style={{ fontSize: "5vw" }}>
                            <b>{attractionPageData?.title}</b>
                        </h2>
                    </div>

                    <div className={`${styles.centeredright} ${styles.hiddenMobile}`}>
                        <ul className="banner-scroll-menu scroller">
                            <li className={`${styles.bannerScrollItem} fs-14`}>
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
                            </li>
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
                    <div className={styles.bottomRight}>View All destination </div>
                </div>
            </div>

            {/* ------------- Main Container ----------- */}

            <div className='container fs-14'>


                {/* ---------------------- Enquiry Form ------------------  */}


                <div className={styles.pageEnquiryForm}>
                    <div className="container">
                        <div className={styles.sectionTitle}>
                            <h2>get in touch</h2>
                        </div>
                        <form className={`${styles.enquiryForm} row`}>
                            <input className="form-control  col" type="name" name="name" placeholder="Your Name" />
                            <input className="form-control col" type="email" name="email" placeholder="Email" />
                            <input className="form-control col" type="tel" name="phone" placeholder="Phone" />
                            <input className={` form-control  col-2  ${styles.btnPrimary}`} type="submit" name="submit" />
                        </form>
                    </div>
                </div>

                {/* ------------------- Recently Browsed Section ---------------- */}
                <div>
                    <div className={styles.sectionTitle}>
                        <h2>you recently browsed</h2>
                    </div>
                    <div className="activity-cards-section py-5">
                        <div className={styles.tourWrapper} >
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
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((tour, i) => (
                                        <SwiperSlide key={tour}>
                                            <div className={` ${styles.tourItem} col-12 wow animate__animated animate__zoomIn`}
                                                data-wow-delay="0.2s" >
                                                <div className={styles.cardWrap}>
                                                    <div className={styles.cardImage}>
                                                        <a href="#">
                                                            <img src={`/images/recent_img${i + 1}.jpg`} alt="..." />
                                                        </a>
                                                    </div>
                                                    <div className={styles.cardDetails}>
                                                        <div className={styles.cardReview}><i className="fa fa-star"></i>3.9</div>
                                                        <div className={styles.cardName}>adventure activities in shimla</div>
                                                        <div className="d-flex align-items-center justify-content-center">
                                                            <div className={styles.cardPrice}>₹ 5555</div>
                                                            <button className={` ${styles.cardBtn} py-2 px-3 border-2 ${styles.btnOutlineSecondary}`}>book now</button>
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

                <div className='row'>

                    {/* -------------------------  Attraction  Cards section  ---------------------- */}


                    <div className="col-lg-8 col-md-12 col-12">
                        {attractionPageData?.attractionCards?.map((card, i) => (<div className={styles.about}>
                            <div className="about-title">
                                <h2>{card?.title}</h2>
                            </div>
                            <div>
                                <img src={imagePrefix+card.image} alt="" />
                            </div>
                            <div >
                                <p>{card?.description} <a href="#">read more...</a></p>
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
                        </div>))}
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

                    <div className="col-lg-4 col-md-12 col-12">
                        <div className={styles.relatedArticles}>
                            <div>
                                <h2>related articles</h2>
                            </div>
                            {
                                [1, 2, 3, 4].map((_) => {
                                    return (
                                        <div className={` ${styles.relatedArticleItem} row`}>
                                            <div className="col-5">
                                                <img src={`/images/recent_img${_}.jpg`} alt="" />
                                            </div>
                                            <div className={`${styles.articleItemName} col-7`}>
                                                10 resorts in shivpuri rishikesh: 2021 (with location & price
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>

                        {/* ------------------ Promotional Side Bar ------------------  */}
                        {attractionPageData?.promontionSideBar?.map(sideBar => (<div className={styles.pageAd}>
                            <a href={sideBar?.redirectionUrl}><img src={imagePrefix+sideBar.image} alt="" /></a>
                        </div>))}
                    </div>

                </div>


                {/* ------------------- Promotional Bar -------------------- */}


                <div className={`${styles.section} ${styles.hiddenMobile} relative`}>
                <div className="promo-wrapper">
                    <div className="row">
                        {
                            attractionPageData?.promotionBar?.map(promotionBar => (
                                    <div className={` ${styles.promoItem} col-sm-6 col-12`}>
                                        <div className={styles.promoImage}>
                                            <a href={promotionBar?.redirectionUrl}><img src={imagePrefix+promotionBar.image} alt="promo image" /></a>
                                        </div>
                                    </div>
                                ))
                        }


                    </div>
                </div>
            </div>

 {/* ------------------- Travegues Free Guide Section -------------------- */}

 <div className={styles.pageTravelogues}>
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
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(_ => (
                                        <SwiperSlide key={_}>
                                                        <div className={styles.tourItem}
                data-wow-delay="0.2s">
                <div className={`${styles.tourWrap}  ${styles.traveloguesWrap}`}>
                    <div className={styles.traveloguesImage}>
                        <a href="#">
                            <img src={`/images/recent_img${_}.jpg`} alt="..." />
                        </a>
                    </div>
                    <div className={styles.tourSummery}>
                        <h4 className={styles.tourTitle}>20 Best Things to do in Shimla - 2021
                            (with 4100+ Reviews)</h4>
                        <p style={{color: "#717171"}}>We enjoyed a lot staying here. Location was perfect with an
                            amazing view to the river and an orchid. Staff.....</p>
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
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(_ => (
                                        <SwiperSlide key={_}>
                                                           <div className={`${styles.relatedPlacesItem}`}>
                <img src={`/images/recent_img${_}.jpg`} alt=""/>
                <div className={styles.relatedPlacesText}>
                    <h2>shimla</h2>
                    <button className={styles.relatedPlacesBtn} type="button">321 listing</button>
                </div>
            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper> 
        </div>
    </div>


{/* ------------------- Faqs Section ------------------- */}
<div>
               
               <div className={styles.sectionTitle}>
                   <h2>FAQ's</h2>
               </div>
              
               <div className={`${styles.mobileFaq} row`}>
                   <div className="pl-5 col-lg-5 col-md-8 col-sm-8 col-12">
                       <div className="page-faqs-section" id="pageFaqsSection">
                           {[1,2,3].map(_=>(
                           <>
                           <div className={styles.faqCard}>
                               <div className="faq-header">
                                   <button className={`faqButton ${_!==1 && 'collapsed'} `} type="button" data-toggle="collapse" data-target={`#faq${_}`} aria-expanded="true">
                                       <span className={styles.faqHeaderNum}>0{_}</span> how to reach
                                   </button>
                               </div>
                               <div id={`faq${_}`} className={`collapse ${_===1 && 'show'}`} data-parent="#pageFaqsSection">
                                   <div className={styles.faqBody}>
                                       Kheerganga Trek (Khir Ganga), located at a height of about 2950 m, is one of the most well-known trekking destinations in Himachal Pradesh.
                                   </div>
                               </div>
                           </div>
                           <hr />
                           </>))}
                       </div>
                   </div>
                   <div className="col-lg-7 col-md-12 col-12">
                       <div className="faqs-image">
                           <img src="/images/faq_img.png" alt="..." style={{ height:"450px"}}/>
                       </div>
                   </div>
               </div>
           </div>


{/* ---------------------- Keep Exploring Kedarnath Section ----------------------- */}

<div>
    <div className={styles.sectionTitle}>
    <h2 >Keep exploring in Kedarkantha Trek</h2>
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

</div>


{/* ------------------- Keep Exploring Shimla --------------------- */}
<div>
    <div className={styles.sectionTitle}>
    <h2 >You may also like in Shimla</h2>
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

</div>


{/* ------------------- Listing Exploring Shimla --------------------- */}

<div>
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
    )
}

export default AttractionPage