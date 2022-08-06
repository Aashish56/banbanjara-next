
import dbConnect from "../../../database/lib/dbConnect";
import landingPage from "../../../database/schema/landing";
import multiUpload from "../../../middlewares/multiUpload";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
// import upload from "../../../middlewares/upload";
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const createItinerarySchema = Joi.object({
    tourId: Joi.string(),
    title: Joi.string(),
    displayOrder: Joi.string(),
    description: Joi.string()

})



async function update(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }

        try {
            const landingRecord = await landingPage.findOne({ _id: req.query.id });
            if (req.body?.featuredTag) {
                const featured = req.body.featuredTag.split(',');
                req.body.featuredTag = featured;
            }

            if (req.body?.tourCards1) {
                const tourCard = req.body.tourCards1.split(',');
                req.body.tourCards1 = tourCard;
            }

            if (req.body?.tourCards2) {
                const tourCard = req.body.tourCards2.split(',');
                req.body.tourCards2 = tourCard;
            }

            if (req.body?.key === 'listingCard1') {
                let listingCard = {
                    ...req.body
                }
                if (req.files?.image?.length > 0) listingCard['image'] = req.files.image[0].path;
                let listingprops;
                if (req.body.type === 'add') {
                    listingprops = {
                        listingCard1: [listingCard, ...landingRecord.listingCard1]
                    };

                }
                else {
                    let listingcopy = landingRecord.listingCard1;
                    let index = listingcopy.findIndex(item => item._id == req.body.id);
                    listingcopy[index] = listingCard;
                    listingprops = {
                        listingCard1: listingcopy
                    };
                    console.log('ss', req.body);
                }
                const landRecords = await landingPage.findOneAndUpdate({ _id: req.query?.id }, { $set: listingprops }, { new: true });
                res.send({ status: true, error: false, message: "Landing Page Updated", data: landRecords });
            }

            if (req.body?.key === 'listingCard2') {
                let listingCard = {
                    ...req.body
                }
                if (req.files?.image?.length > 0) listingCard['image'] = req.files.image[0].path;
                let listingprops;
                if (req.body.type === 'add') {
                    listingprops = {
                        listingCard2: [listingCard, ...landingRecord.listingCard2]
                    };

                }
                else {
                    let listingcopy = landingRecord.listingCard2;
                    let index = listingcopy.findIndex(item => item._id == req.body.id);
                    listingcopy[index] = listingCard;
                    listingprops = {
                        listingCard2: listingcopy
                    };
                    console.log('ss', req.body);
                }
                const landRecords = await landingPage.findOneAndUpdate({ _id: req.query?.id }, { $set: listingprops }, { new: true });
                res.send({ status: true, error: false, message: "Landing Page Updated", data: landRecords });
            }

            if (req.body?.key === 'listingCard3') {
                let listingCard = {
                    ...req.body
                }
                if (req.files?.image?.length > 0) listingCard['image'] = req.files.image[0].path;
                let listingprops;
                if (req.body.type === 'add') {
                    listingprops = {
                        listingCard3: [listingCard, ...landingRecord.listingCard3]
                    };

                }
                else {
                    let listingcopy = landingRecord.listingCard3;
                    let index = listingcopy.findIndex(item => item._id == req.body.id);
                    listingcopy[index] = listingCard;
                    listingprops = {
                        listingCard3: listingcopy
                    };
                    console.log('ss', req.body);
                }
                const landRecords = await landingPage.findOneAndUpdate({ _id: req.query?.id }, { $set: listingprops }, { new: true });
                res.send({ status: true, error: false, message: "Landing Page Updated", data: landRecords });
            }

            if (req.body?.key === 'relatedArticles') {
                let listingCard = {
                    ...req.body
                }
                if (req.files?.image?.length > 0) listingCard['image'] = req.files.image[0].path;
                let listingprops;
                if (req.body.type === 'add') {
                    listingprops = {
                        relatedArticles: [listingCard, ...landingRecord.relatedArticles]
                    };
                }
                else {
                    let listingcopy = landingRecord.relatedArticles;
                    let index = listingcopy.findIndex(item => item._id == req.body.id);
                    listingcopy[index] = listingCard;
                    listingprops = {
                        relatedArticles: listingcopy
                    };
                }
                const landRecords = await landingPage.findOneAndUpdate({ _id: req.query?.id }, { $set: listingprops }, { new: true });
                res.send({ status: true, error: false, message: "Landing Page Updated", data: landRecords });
            }

            if (req.body?.key === 'pormotionalSidebar') {
                let listingCard = {
                    ...req.body
                }
                if (req.files?.image?.length > 0) listingCard['image'] = req.files.image[0].path;
                let listingprops;
                if (req.body.type === 'add') {
                    listingprops = {
                        pormotionalSidebar: [listingCard, ...landingRecord.pormotionalSidebar]
                    };

                }
                else {
                    let listingcopy = landingRecord.pormotionalSidebar;
                    let index = listingcopy.findIndex(item => item._id == req.body.id);
                    listingcopy[index] = listingCard;
                    listingprops = {
                        pormotionalSidebar: listingcopy
                    };
                }
                const landRecords = await landingPage.findOneAndUpdate({ _id: req.query?.id }, { $set: listingprops }, { new: true });
                res.send({ status: true, error: false, message: "Landing Page Updated", data: landRecords });
            }

            if (req.body?.key === 'exploreNearby') {
                let listingCard = {
                    ...req.body
                }
                if (req.files?.image?.length > 0) listingCard['image'] = req.files.image[0].path;
                let listingprops;
                if (req.body.type === 'add') {
                    listingprops = {
                        exploreNearby: [listingCard, ...landingRecord.exploreNearby]
                    };

                }
                else {
                    let listingcopy = landingRecord.exploreNearby;
                    let index = listingcopy.findIndex(item => item._id == req.body.id);
                    listingcopy[index] = listingCard;
                    listingprops = {
                        exploreNearby: listingcopy
                    };
                }
                const landRecords = await landingPage.findOneAndUpdate({ _id: req.query?.id }, { $set: listingprops }, { new: true });
                res.send({ status: true, error: false, message: "Landing Page Updated", data: landRecords });
            }

            if (req.body?.key === 'featuredTag') {
                let listingCard = {
                    ...req.body
                }
                if (req.files?.icon?.length > 0) listingCard['icon'] = req.files.icon[0].path;
                let listingprops;
                if (req.body.type === 'add') {
                    listingprops = {
                        featuredTag: [listingCard, ...landingRecord.featuredTag]
                    };

                }
                else {
                    let listingcopy = landingRecord.featuredTag;
                    let index = listingcopy.findIndex(item => item._id == req.body.id);
                    listingcopy[index] = listingCard;
                    listingprops = {
                        featuredTag: listingcopy
                    };
                }
                const landRecords = await landingPage.findOneAndUpdate({ _id: req.query?.id }, { $set: listingprops }, { new: true });
                res.send({ status: true, error: false, message: "Landing Page Updated", data: landRecords });
            }

            // if (req.body?.key === 'tourCards1') {
            //   let listingCard = {
            //     ...req.body
            //   }
            //   if (req.files?.image?.length > 0) listingCard['image'] = req.files.image[0].path;
            //   let listingprops;
            //   if (req.body.type === 'add') {
            //     listingprops = {
            //       tourCards1: [listingCard, ...landingRecord.tourCards1]
            //     };

            //   }
            //   else {
            //     let listingcopy = landingRecord.tourCards1;
            //     let index = listingcopy.findIndex(item => item._id == req.body.id);
            //     listingcopy[index] = listingCard;
            //     listingprops = {
            //       tourCards1: listingcopy
            //     };
            //   }
            //   console.log('ss>>>', listingprops);
            //   const landRecords = await landingPage.findOneAndUpdate({ _id: req.query?.id }, { $set: listingprops }, { new: true });
            //   res.send({ status: true, error: false, message: "Landing Page Updated", data: landRecords });
            // }

            // if (req.body?.key === 'tourCards2') {
            //   let listingCard = {
            //     ...req.body
            //   }
            //   if (req.files?.image?.length > 0) listingCard['image'] = req.files.image[0].path;
            //   let listingprops;
            //   if (req.body.type === 'add') {
            //     listingprops = {
            //       tourCards2: [listingCard, ...landingRecord.tourCards2]
            //     };

            //   }
            //   else {
            //     let listingcopy = landingRecord.tourCards2;
            //     let index = listingcopy.findIndex(item => item._id == req.body.id);
            //     listingcopy[index] = listingCard;
            //     listingprops = {
            //       tourCards2: listingcopy
            //     };
            //   }
            //   const landRecords = await landingPage.findOneAndUpdate({ _id: req.query?.id }, { $set: listingprops }, { new: true });
            //   res.send({ status: true, error: false, message: "Landing Page Updated", data: landRecords });
            // }

            if (!req.body.key) {
                const landRecords = await landingPage.findOneAndUpdate({ _id: req.query?.id }, { $set: req.body }, { new: true });
                res.send({ status: true, error: false, message: "Landing Page Updated", data: landRecords });

            }
            res.send({ status: true, error: false, message: "Landing Page Updated" });
        } catch (error) {
            console.log(error);
            await errorResponseHelper({
                res,
                error,
                defaultMessage: "Landing page not updated",
            });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

const pageMedia = [{
    name: 'image',
    maxCount: 1
},
{
    name: 'icon',
    maxCount: 1
}
];

export default handler(multiUpload(update,'Landing',pageMedia));
