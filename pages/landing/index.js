import React, { useEffect } from 'react';
import GeneraltransparentNavbar from 'components/LandingPage/Navbar/General_transparentNavbar';
import Headerpic from 'components/LandingPage/Header_pic';
// import Landingbanner from '/images/banner_image.jpg';
import Tagpage from 'components/LandingPage/Tags';
import Getintouch from 'components/LandingPage/Get_intouch';
import About from 'components/LandingPage/About';
import Landingcrousal from 'components/LandingPage/Landing_crousal';
import Attractionarticles from 'components/LandingPage/Attraction_articles';
import Landingcards from 'components/LandingPage/Landing/Landing_cards';
import ExploreNearby from 'components/LandingPage/Explore_nearby';
import Collectionreview from 'components/LandingPage/Collection/Collection_review';
import Travelogue from 'components/LandingPage/Collection/Attraction_guidecrousal';
import Destination from 'components/LandingPage/Collection/Attraction_popularrated';
import Traveltrip from 'components/LandingPage/Travel_trip';
import AttractionFaqs from 'components/LandingPage/Attraction_faqs';
import Attractionlists from 'components/LandingPage/Attraction_lists';
import Attractioncrousal from 'components/LandingPage/Attraction_crousal';
import { getHomePage } from 'redux/actions/homePage';
import { useDispatch } from 'react-redux';

function Landing() {

    const dispatch = useDispatch();
    
    useEffect(()=>{
      dispatch(getHomePage())
    },[])

    return (
        <React.Fragment>
            <div className="wrapper fs-14">
                {/* <GeneraltransparentNavbar /> */}
                <Headerpic alt="" />
            </div>
            <br />
            <br />
            <div className="container">
                <Tagpage />
                <Getintouch />
                <Attractioncrousal />

                <About />
                <h3 className="section-title">Adventure Activities in Shimla</h3>
                <Landingcrousal />
                <br />
                <h3 className="section-title">Camping In Shimla</h3>
                <Landingcrousal />
                <div className="page-divide">
                    <div className="row">
                        <Landingcards />
                        <Attractionarticles />
                    </div>
                </div>
                <ExploreNearby />
                <Collectionreview />
                <Travelogue />
                <Destination />
                <Traveltrip />
            </div>
            <AttractionFaqs />
            <button className="btn btn-outline-secondary btn-radius" type="button" style={{ borderRadius: "20px", marginLeft: "170px" }}>More FAQ'S</button>
            <br />
            <div className="container">
                <div className="tour-exploring">
                    <br />
                    <h3 className="section-title">Keep exploring in Kedarkantha Trek</h3>
                    <Attractionlists />
                </div>
                <div className="tour-exploring single-tour-area">
                    <h3 className="section-title">You may also like in Shimla</h3>
                    <Attractionlists />
                </div>
                <div className="tour-exploring single-tour-area">
                    <h3 className="section-title">Listing in Shimla</h3>
                    <Attractionlists />
                </div>
            </div>
        </React.Fragment>
    )
};

export default Landing;
