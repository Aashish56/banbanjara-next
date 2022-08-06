import React, { useEffect } from 'react'
import styles from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getHomePage } from 'redux/actions/homePage';
import { useRouter } from 'next/router';
import { getAllTours } from 'redux/actions';
import { useState } from 'react';

const Listing = () => {
    const dispatch = useDispatch();
    const { tours } = useSelector(state => state);
    const [filtredTour , setFiltredTour] = useState([]);
    const router = useRouter();
    const {query} = router.query
    useEffect(() => {
        dispatch(getHomePage())
        // dispatch(getAllTours());
    }, []);

    useEffect(()=>{
        if(query){
            const normalQuery = query?.split('-').join(' ');
            fetchTours(normalQuery);
        }
     
    },[query]);

    console.log('this is  my filtred Tours ---------------->' , filtredTour)


    const fetchTours = async(slug)=>{
        const data = await fetch('/api/tours/searchTours' , {
            method:'POST' ,
            headers:{
                'content-type' :'application/json'
            },
            body:JSON.stringify({slug})
        });
        const resp = await data.json();
        setFiltredTour(resp.data);
          
    }

    console.log('this is the tours ------------> ' , tours);

    return (
        <div className={styles.listingContainer}>
            <div className='container my-5'>
                <div className={styles.sectionTitle}>
                    <h2>Search Result For {query} </h2>
                </div>
                {filtredTour?.length ?  (<div className='row'>
                    {filtredTour?.map((tour) => (
                        <div
                            className={` ${styles.tourItem} col-lg-3 col-sm-6 col-12 wow animate__animated animate__zoomIn`}
                            data-wow-delay="0.2s"
                        >
                            <div className={styles.cardWrap}>
                                <div className={styles.cardImage}>
                                    <a href="#">
                                        <img
                                            src={`${window?.location?.origin}/uploads/tour/${tour?.cardImage}`}
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
                                        {tour?.averageRating || "0.0"}
                                    </div>
                                    <div className={styles.cardName}>
                                        {tour?.title}
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className={styles.cardPrice}>
                                            ₹ {tour?.basicPrice}
                                        </div>
                                        <button
                                            className={` ${styles.cardBtn} py-2 px-3 ms-4 border-2 ${styles.btnOutlineSecondary}`}
                                        >
                                            book now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))}

                </div>) : <h1 className='my-5 text-center'>No Data Found For Your Searched Query </h1>}

            </div>
        </div>
    )
}

export default Listing