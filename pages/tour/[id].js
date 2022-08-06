import { API_STATUS_CODE, API_URL } from "constants/url.constants";
import React, { useState } from "react";
import { useRouter } from "next/router";

import { postMethod } from "utils/api";
import TourComp from "../../frontComponents/Tour";

const Tour = () => {
  const { query } = useRouter();
  const [tourData, setTourData] = useState([]);
  const [allData, setAllData] = useState([])
  const [gallery, setGallery] = useState([]);
  const fetchData = async () => {
    const response = await postMethod(API_URL.GET_ALL_TOURS, {}, false, false);
    if (response?.status === API_STATUS_CODE.SUCCESS) {
      if (response?.data?.data?.list) {
        let filterData = response?.data?.data?.list?.filter(
          (f) => f._id === query?.id
        );
        if (filterData) {
          let cardImage = [
            {
              img: "/uploads/tour/" + filterData[0]?.cardImage,
              caption: filterData[0]?.cardCapsion,
              index: 0,
            },
          ];
          let galleryImage =
            filterData[0]?.galleryImages &&
              filterData[0].galleryImages?.length > 0
              ? filterData[0].galleryImages?.map((x, i) => ({
                img: "/uploads/tour/" + x,
                caption: "Gallery Image",
                index: i + 1,
              }))
              : [];
          await setTourData(filterData);
          await setGallery([...cardImage, ...galleryImage]);
        }
        await setAllData(response?.data?.data?.list)
      }
    }
  };

  React.useEffect(() => {
    if (query?.id) {
      fetchData();
    }
  }, [query]);

  return (
    <>
      {allData.length > 0 && tourData.length > 0 &&
        <TourComp
          allData={allData}
          data={tourData[0]}
          gallery={gallery}
        />
      }
    </>
  );
};

// export const getServerSideProps = async ({ params }) => {
//   try {
//     let data = [];
//     const response = await postMethod(API_URL.GET_ALL_TOURS, {}, false, false);
//     if (response?.status === API_STATUS_CODE.SUCCESS) {
//       if (response?.data?.data?.list) {
//         let filterData = response?.data?.data?.list?.filter(
//           (f) => f._id === params?.id
//         );
//         data = filterData;
//       }
//     }

//     return {
//       props: {
//         data: data,
//       },
//     };
//   } catch (error) {
//     console.log(error);
//   }
// };

export default Tour;
