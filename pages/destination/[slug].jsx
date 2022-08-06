import React, { useEffect, useState } from "react";
import GeneraltransparentNavbar from "components/LandingPage/Navbar/General_transparentNavbar";
import Headerpic from "components/LandingPage/Header_pic";
import Tags from "components/LandingPage/Tags";
import himachal_pradesh_banner from "assets/Images/banner.jpg";
import Getintouch from "components/LandingPage/Get_intouch";
// import Tagpagecrousal from '../Tag page/Tagpage_crousal'
import About from "components/LandingPage/About";
import Landingcrousal from "components/LandingPage/Landing_crousal";
// import Staysshimla from 'components/LandingPage/'
import ExploreNearby from "components/LandingPage/Explore_nearby";
import Collectionreview from "components/LandingPage/Collection/Collection_review";
import PromotionalBar from "components/LandingPage/Collection/PromotionalBar";
import Travelogue from "components/LandingPage/Collection/Attraction_guidecrousal";
import Destination from "components/LandingPage/Collection/Attraction_popularrated";
import MapStayCards from "components/LandingPage/Collection/MapStayCards";
import Traveltrip from "components/LandingPage/Travel_trip";
import AttractionFaqs from "components/LandingPage/Attraction_faqs";
import Attractionlists from "components/LandingPage/Attraction_lists";
import { getAllDestination } from "redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getDestinationBySlug } from "redux/actions/destination";
import { getHomePage } from "redux/actions/homePage";

const DestinationPage = () => {
  const [landingDetail, setLandingDetail] = useState({});
  const [travelogs, setTravelLogs] = useState([]);
  const landingDetails = useSelector((state) => state.destination);
  const { destination } = useSelector((state) => state);
  const dispatch = useDispatch();
  const router = useRouter();
  const { slug } = router.query;



  console.log('this is the Destination Data ------------------> ' , destination);


  useEffect(() => {
    dispatch(getHomePage());
    dispatch(getAllDestination());
  }, []);
  useEffect(() => {
    dispatch(getDestinationBySlug(slug));
  }, [slug]);

  useEffect(() => {
    if (landingDetails?.length > 0) {
      const currentLanding = landingDetails.filter(
        (item) => item.title.toLowerCase() === slug && !item.isDisable
      );
      if (currentLanding?.length > 0) {
        setLandingDetail(currentLanding[0]);
        setTravelLogs(
          landingDetails.filter(
            (item) =>
              item.state === currentLanding[0]?.state &&
              item._id != currentLanding[0]._id
          )
        );
      }
    }
  }, [landingDetails]);

  return (
    <React.Fragment>
      <div className="wrapper">
        <Headerpic
          overview={landingDetail?.overview}
          img={landingDetail?.cover}
        />v  
      </div>
      <div className="container">
        <br />
        <Tags tag={landingDetail?.featuredTag} />
        <Getintouch />
        {/* <div class="page-activity-cards container">
          <div class="section-title">
            <h2>you recently browsed</h2>
          </div>
          <Tagpagecrousal />
        </div> */}
        <About state={landingDetail?.state} about={landingDetail?.howToGo} />
        <MapStayCards/>
        <h3 className="section-title">Adventure in Shimla</h3>
        <br />
        <Landingcrousal tour={landingDetail?.tourCards1} />
        <br />
        <h3 className="section-title">Camping in Shimla</h3>
        <br />
        <Landingcrousal tour={landingDetail?.tourCards2} />
        {/* <Staysshimla /> */}
        <ExploreNearby
          nearby={landingDetail?.exploreNearby}
          articles={landingDetail?.pormotionalSidebar}
        />
        
        <PromotionalBar/>

        <Collectionreview />
        <Travelogue travelogs={travelogs} />
        <Destination />
        <Traveltrip
          overview={landingDetail?.howToGo}
          weather={landingDetail?.localWeather}
          generalInfo={landingDetail?.generalInfo}
        />
        <AttractionFaqs faq={landingDetail?.faq} />
        <div className="tour-exploring single-tour-area">
          <h3 className="section-title">Keep exploring in Kedarkantha Trek</h3>
          <Attractionlists />
        </div>
      </div>
    </React.Fragment>
  );
};

export default DestinationPage;
