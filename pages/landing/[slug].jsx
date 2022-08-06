import React, { useEffect, useState } from 'react';
import GeneraltransparentNavbar from 'components/LandingPage/Navbar/General_transparentNavbar';
import Headerpic from 'components/LandingPage/Header_pic';
// import Landingbanner from 'assets/Images/banner.jpg';
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
import { useDispatch, useSelector } from 'react-redux';
import { getAllLandingPages } from 'redux/actions';
import { useRouter } from 'next/router';

function Landing() {
    const [landingDetail, setLandingDetail] = useState({});
    const [travelogs, setTravelLogs] = useState([]);
    const [recentBrowse, setRecentBrowse] = useState([]);
    const landingDetails = useSelector((state) => state.landing);
    const dispatch = useDispatch();
    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        dispatch(getAllLandingPages());
    }, []);

    useEffect(() => {
        if (landingDetails?.length > 0) {
            const currentLanding = landingDetails.filter(item => item.title?.toLowerCase().split(' ').join('-') === slug && !item.isDisable);
            if (currentLanding?.length > 0) {
                setLandingDetail(currentLanding[0]);
                setTravelLogs(landingDetails.filter(item => item.state === currentLanding[0]?.state && item._id != currentLanding[0]._id));
                const travelObj = {
                    cover: currentLanding[0]?.cover,
                    title: currentLanding[0]?.title,
                    price: currentLanding[0]?.price
                };
                const recent = JSON.parse(localStorage.getItem('recent')) || [];
                const index = recent.findIndex(item => item.title?.toLowerCase().split(' ').join('-') === slug);
                if (index === -1) recent.splice(0, 0, travelObj);
                console.log(recent)
                localStorage.setItem('recent', JSON.stringify(recent));
                setRecentBrowse(recent.filter(item => item.title?.toLowerCase().split(' ').join('-') != slug));
            }
        };
    }, [landingDetails]);

    return (
        <React.Fragment>
            <div className="wrapper">
                <GeneraltransparentNavbar />
                <Headerpic overview={landingDetail?.overview} img={landingDetail?.cover} alt="" />

            </div>
            <br />
            <br />
            <div className="container">
                <Tagpage tag={landingDetail?.featuredTag} />
                <Getintouch />
                <Attractioncrousal recentBrowse={recentBrowse} />

                <About state={landingDetail?.state} about={landingDetail?.howToGo} />
                <h3 className="section-title">{landingDetail?.tourCards1Title}</h3>
                <Landingcrousal tour={landingDetail?.tourCards1} />
                <br />
                <h3 className="section-title">{landingDetail?.tourCards2Title}</h3>
                <Landingcrousal tour={landingDetail?.tourCards2} />
                <div className="page-divide">
                    <div className="row">
                        <Landingcards listingCard1={landingDetail?.listingCard1} listingCard2={landingDetail?.listingCard2} listingCard3={landingDetail?.listingCard3} />
                        <Attractionarticles article_data={landingDetail?.relatedArticles} />
                    </div>
                </div>
                <ExploreNearby nearby={landingDetail?.exploreNearby} articles={landingDetail?.pormotionalSidebar} />
                <Collectionreview />
                <Travelogue travelogs={travelogs} />
                <Destination />
                <Traveltrip overview={landingDetail?.howToGo} weather={landingDetail?.localWeather} generalInfo={landingDetail?.generalInfo} />
                <AttractionFaqs faq={landingDetail?.faq} />
            </div>
            {/* <button className="btn btn-outline-secondary btn-radius" type="button" style={{ borderRadius: "20px", marginLeft: "170px" }}>More FAQ'S</button> */}
            {/* <br /> */}
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
