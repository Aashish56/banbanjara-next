import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Hero from "frontComponents/hero/Hero";
import FindPerfectExperience from "../frontComponents/home/findPerfectExperience/FindPerfectExperience";
import FindThePerfectExperience2 from "../frontComponents/home/findThePerfectExperience2";
import TripsThatMatchYourInterest from "../frontComponents/home/tripsThatMatchYourInterest/TripsThatMatchYourInterest";
import JamStack from "../frontComponents/home/jamStack/JamStack.jsx";
import DestinationTour from "frontComponents/home/DestinationTour";
import LinkTags from "frontComponents/home/LinkTags";
import NearYou from "frontComponents/home/nearYou/NearYou";
import OurPartners from "frontComponents/home/OurPartners";
import Presssection from "frontComponents/home/Presssection";
import Reviews from "frontComponents/home/Reviews";
import TourCards from "frontComponents/home/TourCards";
import Traveltrends from "frontComponents/home/Traveltrend";
import Video from "frontComponents/home/Video";
import ManaliToLehLadakhBikeTrip from "frontComponents/home/manaliToLehLadhakBikeTrip";
import {
  // createHomePage,
  getHomePage,
  // updateHomePage,
} from "../redux/actions/homePage";
export default function HomePage() {
  const dispatch = useDispatch();
  const homePageData = useSelector((state) => state.homePage);
  const initArticleState = {
    description: "",
    title: "",
    blogImage: "",
    date: "",
  };
  const initBlogState = {
    // description: "",
    title: "",
    // blogImage: "",
    date: "",
  };
  const initialState = {
    travelTrends: {
      title: "",
      description: "",
      featuredArticles: [initArticleState, initArticleState],
      blogs: [initBlogState],
      showAllText: "",
      showAllUrl: "",
    },
    promotionBar: {
      image1: "",
      image1RedirectionUrl: "",
      image2: "",
      image2RedirectionUrl: "",
    },
    pressRelease: {
      title: "",
      shortDescription: "",
      description: "",
      logoImages: [[]],
    },
    partners: {
      title: "",
      data: [{ imageRedirection: "", image: "" }],
    },
    jamstacks: {
      heading: "",
      description: "",
      buttontext: "",
      buttonurl: "",
      data: [{ imageRedirection: "", image: "" }],
    },
    eleventhpage: {
      heading: "",
      description: "",
      video: {},
    },
    hottours: {
      heading: "",
      bottomtext: "",
      bottomtexturl: "",
      data: [
        { imageRedirection: "", image: "", driveshort: "", imagetitle: "" },
      ],
    },
    customerReview: {
      title: " ",
      cardData: [
        {
          cardImage: "",
          imageRedirection: "",
          reviewHtml: "",
          seeAllUrl: "",
          seeAllTitle: "",
          reviewsData: [{ image: "", comment: "" }],
        },
      ],
    },
    Destinations: {
      heading: "",
      subheading: "",
      dataentrysurroundtext: [],
      dataentryText: [],
      buttontitle: "",
      buttonurl: "",
    },
    basicPage: {
      logo: "",
      heading: "",
      subHeading: "",
      imageSlider: [{ image: "" }],
      location: { city: "", state: "", country: "" },
      bannerSmallText: [{ icon: "", label1: "", label2: "" }],
    },
    findThePerfectExperience1: {
      heading: "",
      subheading: "",
      cards: [{ imageRedirection: "", image: "", title: "" }],
    },
    findThePerfectExperience2: [
      {
        title: "",
        cards: [
          {
            imageRedirection: "",
            image: "",
          },
        ],
      },
    ],
    tripsThatMatchInterests: {
      title: "",
      description: "",
      themes: [{ imageSrc: "", imageRedirection: "", imageTitle: "" }],
    },
    tourCards: [
      {
        title: "",
        navTitle: "",
        order: 0,
        navRedirection: "",
        cards: [
          {
            title: "",
            averageRating: "",
            days: "",
            image: "",
            mainPrice: 0,
            discount: 0,
            redirectionUrl: "",
          },
        ],
      },
    ],
    footer: {
      subSection: {
        title: "",
        data: [
          {
            title: "",
            url: "",
          },
        ],
      },
      verSection: {
        title: "",
        data: [
          {
            title: "",
            url: "",
          },
        ],
      },
      footerLogo: "",
      followTitle: "",
      list: [
        {
          icon: "",
          url: "",
        },
      ],
      copyrightText: "",
    },
    manaliToLehLadakhBikeTrip: {
      image: "",
      title2: "",
      title3: "",
      description: "",
      leftTitle: "",
      leftUrl: "",
      imageCard: [
        {
          imageSrc: "",
          imageRedirection: "",
          rating: "",
          tourDirection: "",
          crossedRate: "",
          rate: "",
        },
      ],
    },
    nearYou: {
      bestsellers: "",
      nearYou: "",
      explore: "",
      url: "",
      cardArray: [
        {
          imageSrc: "",
          imageRedirection: "",
          rating: "",
          tourDistance: "",
          tourTitle: "",
          crossedRate: "",
          rate: "",
        },
      ],
    },
  };

  const [homePage, setHomePage] = useState();
  useEffect(() => {
    dispatch(getHomePage());
  }, []);
  useEffect(() => {
    if (homePageData) {
      // const data = homePageData?.find((it) => it?._id === props?.homePageId);
      // if (data) {
      setHomePage(homePageData);
      // }/
    }
  }, [homePageData]);
  const htmlEncode = (text) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/>/g, "&gt;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");
  };
  debugger;
  console.log("homePage", homePage);
  return (
    <>
      <Hero basicPage={homePage?.basicPage} />
      <br />
      <br />
      <FindPerfectExperience />
      <TripsThatMatchYourInterest />
      {/* <NearYou /> */}
      {/* <JamStack /> */}
      {/* <FindPerferctExperience /> */}
      <section className="home-site-content front-container">
        <FindPerfectExperience
          findThePerfectExperience1={homePage?.findThePerfectExperience1}
        />
        <FindThePerfectExperience2
          findThePerfectExperience2={homePage?.findThePerfectExperience2}
        />

        <NearYou />
        <TripsThatMatchYourInterest
          tripsThatMatchInterests={homePage?.tripsThatMatchInterests}
        />
        <ManaliToLehLadakhBikeTrip
          manaliToLehLadakhBikeTrip={homePage?.manaliToLehLadakhBikeTrip}
        />
        <TourCards tourCards={homePage?.tourCards} />
        {/* <NearYou /> */}
        <JamStack jamstack={homePage?.jamstacks} />
        {/* <FindPerferctExperience /> */}

        {/* <div className="container"></div>
        <div className="what-about-section section">
          <div className="container">
            <div className="what-about-wrapper">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                  <div className="what-about-image">
                    <img src={"images/home/JAMstac-image.jpg"} alt="" />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12 d-flex align-items-center">
                  <div className="what-about-summery">
                    <h3>What is JAMstack</h3>
                    <p>
                      {htmlEncode(` Whether you're a foodie or a hiker, an animal lover or an
                      archaeology , there’s adventure to explore your passion.
                      Whether you're a foodie or a hiker Whether you're a foodie
                      or a hiker, an animal lover or an archaeology , there’s
                      adventure to explore your passion. Whether you're a foodie
                      or a hiker`)}
                    </p>
                    <button className="btn btn-outline-secondary btn-radius">
                      Explore now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <DestinationTour
          destinations={homePage?.Destinations}
          hotTours={homePage?.hottours}
        />
        <div className="container">
          <Video eleventhpage={homePage?.eleventhpage} />
          <br />
          <Reviews customerReview={homePage?.customerReview} />
          <br />
          <Traveltrends
            travelTrends={homePage?.travelTrends}
            promotionBar={homePage?.promotionBar}
          />
          <br />
          <Presssection pressRelease={homePage?.pressRelease} />
        </div>
        <LinkTags customLinks={homePage?.customLinks} />
        <div className="container">
          <OurPartners partners={homePage?.partners} />
        </div>
      </section>
    </>
  );
}
