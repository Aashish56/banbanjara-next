import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { ImArrowLeft, ImArrowRight } from "react-icons/im";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import styles from "./style.module.css";
import { getHomePage } from "redux/actions/homePage";
import { Dropdown } from "react-bootstrap";
import { getReviewPage } from "redux/actions/review";
import { useState } from "react";
import { getAllReviews, getFiltredReviewData } from "redux/actions/reviewManagement";
import { getAllDestination, getAllFeaturedTag } from "redux/actions";
const AllDestination = () => {
  const dispatch = useDispatch();

  const {reviewPage,reviewManagement , featureTagReducer , destination} = useSelector(state=>state);
   console.log( 'destination -------------------> ' , destination);

    const [imagePrefix , setImagePrifix] = useState('');
    const [reviewPageData , setReviewPageData] = useState('');
     const [reviewCount , setReviewCount] = useState(2);
    const [reviewManagementData , setReviewManagementData] = useState([]);
    const [filters ,setFilters] = useState({
        destination : null , 
        tourType : null ,   
     })

    useEffect(()=>{
      setReviewManagementData(reviewManagement?.reviewsList.slice(0,reviewCount));
    },[reviewManagement]);



    useEffect(()=>{
      const slicedData = reviewManagement?.reviewsList?.slice(0 , reviewCount);
      setReviewManagementData(slicedData)

    },[reviewCount])

  useEffect(() => {
    dispatch(getHomePage());
    dispatch(getReviewPage());
    dispatch(getAllReviews());
    dispatch(getAllDestination());
    setImagePrifix(window?.location?.origin);
  }, []);

  console.log('this is the Review Data  Filtred --------------> ' , reviewManagement)
  useEffect(()=>{
    setReviewPageData(reviewPage[0]);
  },[reviewPage]);

  useEffect(()=>{
    if(reviewManagement.filtredReviewData){
      setReviewManagementData(reviewManagement.filtredReviewData)
    }
    else{
      setReviewManagementData(reviewManagement.reviewsList)
    }
   
  },[reviewManagement.filtredReviewData])


  useEffect(()=>{
    console.log('filters Changes ' , filters)
    if(filters.destination){
      const location = {
        city : filters.destination.city,
        state : filters.destination.state,
        country : filters.destination.country,
      }
       dispatch(getFiltredReviewData(location))  
    }
    else{
      setReviewManagementData(reviewManagement?.reviewsList.slice(0,reviewCount));   
    }
  },[filters])
  const isEven = (value)=>{
        if(value%2===0){
          return true 
        }
        return false
  }

  return (
    <div className="container my-5 fs-14">
      {/* --------------------  Top Banenr Section ------------------- */}
      <div className={styles.bannerSection}>
        <h3 style={{ textAlign: "center" }}>
          Travelers rated us 4.8 from 10,000+ Reviews
        </h3>
        <div className="d-flex justify-content-start">
        {reviewPageData?.type === 'image'?  (<img className="mt-5" src={`${imagePrefix}/${reviewPageData?.file}`} alt="" />) : null}
        </div>
      </div>

      {/* ==================   Working Towords Section ======================= */}

      <center className="mt-5">
        <div className={styles.sectionTitle}>{reviewPageData?.title}</div>
        <br />
        <div style={{ listStyleType: "inherit" }}>
          <p>
            {reviewPageData?.description}
          </p>
        </div>
        <div className="row mt-5">
          {reviewPageData?.cards?.map((el) => (
            <div className="col-md-3 px-3" key={el?._id}>
              <div className={`${styles.card} p-4`}>
                <div className="overflow mx-4">
                  <br />
                  <img
                    className={`${styles.cardImg} d-block mx-auto`}
                    src={`${imagePrefix}/${el?.icon}`}
                    alt="Improved Icon"
                  />
                </div>
                <div className="card-body text-dark">
                  <h4 className="card-title">
                  {el?.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </center>

      {/* =========================  Filters Section ======================= */}

      <div className={styles.bar}>
        <center>
          <div className="btn-group">


          <Dropdown onSelect={(key)=>{
             setFilters((prev)=>({
                 ...prev,
                 tourType : key
             }))
          }}>
    <Dropdown.Toggle varient='transparent' className='text-black px-4 py-3'  style={{
                  marginLeft: "10px",
                  border: "solid 1px",
                  borderRadius: "25px",
                  backgroundColor: "white",
                  width: "200px",
                }}>
   <i className="fas fa-plane mr-4"></i> { filters?.tourType || "Tour Type" } &nbsp;&nbsp;&nbsp;
    </Dropdown.Toggle>
    <Dropdown.Menu >
      <Dropdown.Item eventKey="All" >All</Dropdown.Item>
      <Dropdown.Item eventKey="Tour">Tour</Dropdown.Item>
      <Dropdown.Item eventKey="Treks" >
        Treks
      </Dropdown.Item>
      <Dropdown.Item eventKey="Activities">Activities</Dropdown.Item>
      <Dropdown.Item eventKey="Stays">Stays</Dropdown.Item>
    </Dropdown.Menu>
    
  </Dropdown>
          </div>

          <div className="btn-group">
          <Dropdown onSelect={key=>{
              const findedData = destination?.allDestination.find(el=> el?._id === key);
              setFilters((prev)=>({
                ...prev , 
                 destination : findedData
              }))
          }}>
    <Dropdown.Toggle varient='transparent' className='text-black px-4 py-3'  style={{
                  marginLeft: "10px",
                  border: "solid 1px",
                  borderRadius: "25px",
                  backgroundColor: "white",
                  width: "200px",
                }}>
  <i className="fal fa-globe mr-4"></i>{ filters.destination?.title || 'All destination'} &nbsp;&nbsp;&nbsp;
    </Dropdown.Toggle>
    <Dropdown.Menu  >
      {
         destination?.allDestination?.map((el)=>{
          return (
            <Dropdown.Item key={el?._id} eventKey={el._id}>{el?.title}</Dropdown.Item>
          )
         })
      }
   

    </Dropdown.Menu>
  </Dropdown>

          </div>
          <div className="btn-group">
          <Dropdown>
    <Dropdown.Toggle varient='transparent' className='text-black px-4 py-3'  style={{
                  marginLeft: "10px",
                  border: "solid 1px",
                  borderRadius: "25px",
                  backgroundColor: "white",
                  width: "200px",
                }}>
  Most Recent First
    </Dropdown.Toggle>
    <Dropdown.Menu >
      <Dropdown.Item eventKey="Show Recent Fast">Show Recent Fast</Dropdown.Item>
      <Dropdown.Item eventKey="Show Recent Last">Show Recent Last</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>

          </div>
          <div className="btn-group">
              <button
              onClick={()=> setFilters({
                tourType : null ,
                destination : null,
              })}
                className="btn py-3 cursor-pointer "
                type="button"
                id="dropdownMenuButton1"
                aria-expanded="false"
                variant="light"
                style={{
                  marginLeft: "10px",
                  border: "solid 1px",
                  borderRadius: "25px",
                  backgroundColor: "white",
                  width: "200px",
                }}
              >
                <i className="fab fa-rev mr-3"></i>Reset All
                <i className="fal fa-times-circle ml-3"></i>
              </button>
          </div>
        </center>
      </div>


{/* ------------------- Main Review Section ------------------ */}
<div className="mt-5">
  {reviewManagementData.length && (<div>
  {reviewManagementData?.map((el ,i )=>(
  <>
       <div className="row featurette mt-5 " style={{marginLeft:"20px"}}>
       <div className={`col-md-7 ${isEven(i) && 'order-md-2'}`} style={{ paddingLeft: isEven(i) && "50px"}} key={el?._id}>
         <h2 className="featurette-heading">{el?.user}&nbsp;
         <span className={`fa fa-star ${styles.checked}`}></span>
         <span className={`fa fa-star ${styles.checked}`}></span>
         <span className={`fa fa-star ${styles.checked}`}></span>
         <span className={`fa fa-star ${styles.checked}`}></span>
         <span className="fa fa-star"></span>
         </h2>
         <h4 className="my-3">{el?.tour.title}</h4>
         <p className={styles.lead}>{el?.description}</p><br/>
         <p ><i className="fas fa-eye"></i><a href="#">&nbsp;&nbsp;<u style={{color:"black"}}>View Review </u></a> &nbsp;&nbsp;&nbsp; <i className="fad fa-copy"></i><a href="#">&nbsp;&nbsp;<u style={{color:"black"}}>View Itinenary</u></a></p>
       </div>
       <div className="col-md-5 order-md-1" key={el}>
         <img style={{width:'400px' , height:'320px' , objectFit:'cover'}} className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" src={window.location.origin+el?.image} role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"/>
       </div>
     </div>
      <br/>
      <br/>
      </>
))}
  </div>)}

  {!reviewManagementData?.length && (filters?.destination || filters?.type) && (
    <h1>No Review Data Found For These Filters </h1>
  ) }
</div>
      <center>
        { (!filters.destination && !filters.type) && (<div>
        {(reviewCount !== reviewManagement?.reviewsList.length) && <button onClick={()=>setReviewCount(prev=> prev+2)} className="btn mt-4 py-3 " type="button" id="dropdownMenuButton1" aria-expanded="false" variant="light" style={{marginLeft:"10px",border:"solid 1px", fontSize:'16px' ,  borderRadius:"25px", backgroundColor:"white" , width:"200px"}}>
      <b>See More Review</b>
      </button>}
        </div>)}
     
      </center>




    </div>
  );
};
export default AllDestination;
