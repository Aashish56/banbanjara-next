import dbConnect from "../../../database/lib/dbConnect";
import tourCard from "../../../database/schema/destination";
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


async function updateDestination(req, res) {

  await dbConnect();
  if (req.method != 'POST') {
    return res.json({ status: false, error: true, message: "HTTP method not allowed" });
  }
  try {
    try {
      const destinationRecord = await tourCard.findOne({ _id: req.query.id });
      if (req.files?.cover?.length > 0) req.body['cover'] = req.files.cover[0].path;
      if (req.body?.tourCards1) {
        const tourCard = req.body.tourCards1.split(',');
        req.body.tourCards1 = tourCard;
      }

      if (req.body?.tourCards2) {
        const tourCard = req.body.tourCards2.split(',');
        req.body.tourCards2 = tourCard;
      }

      if (req.body?.featuredTag) {
        const featured = req.body.featuredTag.toString();
        req.body.featuredTag = featured;
      }
      if (req.body?.key === 'pormotionalSidebar') {
        let listingCard = {
          ...req.body
        }
        if (req.files?.image?.length > 0) listingCard['image'] = req.files.image[0].path;
        let listingprops;
        if (req.body.type === 'add') {
          listingprops = {
            pormotionalSidebar: [listingCard, ...destinationRecord.pormotionalSidebar]
          };

        }
        else {
          let listingcopy = destinationRecord.pormotionalSidebar;
          let index = listingcopy.findIndex(item => item._id == req.body.id);
          listingcopy[index] = listingCard;
          listingprops = {
            pormotionalSidebar: listingcopy
          };
        }
        const landRecords = await tourCard.findOneAndUpdate({ _id: req.query?.id }, { $set: listingprops }, { new: true });
        res.send({ status: true, error: false, message: "Destination Page Updated", data: landRecords });
      }

      if (req.body?.key === 'exploreNearby') {
        let listingCard = {
          ...req.body
        }
        if (req.files?.image?.length > 0) listingCard['image'] = req.files.image[0].path;
        let listingprops;
        if (req.body.type === 'add') {
          listingprops = {
            exploreNearby: [listingCard, ...destinationRecord.exploreNearby]
          };

        }
        else {
          let listingcopy = destinationRecord.exploreNearby;
          let index = listingcopy.findIndex(item => item._id == req.body.id);
          listingcopy[index] = listingCard;
          listingprops = {
            exploreNearby: listingcopy
          };
        }
        const landRecords = await tourCard.findOneAndUpdate({ _id: req.query?.id }, { $set: listingprops }, { new: true });
        res.send({ status: true, error: false, message: "Destination Page Updated", data: landRecords });
      }

      if (req.body?.key === 'tourCards1') {
        let listingCard = {
          ...req.body
        }
        if (req.files?.image?.length > 0) listingCard['image'] = req.files.image[0].path;
        let listingprops;
        if (req.body.type === 'add') {
          listingprops = {
            tourCards1: [listingCard, ...destinationRecord.tourCards1]
          };

        }
        else {
          let listingcopy = destinationRecord.tourCards1;
          let index = listingcopy.findIndex(item => item._id == req.body.id);
          listingcopy[index] = listingCard;
          listingprops = {
            tourCards1: listingcopy
          };
        }
        const landRecords = await tourCard.findOneAndUpdate({ _id: req.query?.id }, { $set: listingprops }, { new: true });
        res.send({ status: true, error: false, message: "Destination Page Updated", data: landRecords });
      }

      if (req.body?.key === 'tourCards2') {
        let listingCard = {
          ...req.body
        }
        if (req.files?.image?.length > 0) listingCard['image'] = req.files.image[0].path;
        let listingprops;
        if (req.body.type === 'add') {
          listingprops = {
            tourCards2: [listingCard, ...destinationRecord.tourCards2]
          };

        }
        else {
          let listingcopy = destinationRecord.tourCards2;
          let index = listingcopy.findIndex(item => item._id == req.body.id);
          listingcopy[index] = listingCard;
          listingprops = {
            tourCards2: listingcopy
          };
        }
        const landRecords = await tourCard.findOneAndUpdate({ _id: req.query?.id }, { $set: listingprops }, { new: true });
        res.send({ status: true, error: false, message: "Destination Page Updated", data: landRecords });
      }

      if (!req.body.key) {
        const landRecords = await tourCard.findOneAndUpdate({ _id: req.query?.id }, { $set: req.body }, { new: true });
        res.send({ status: true, error: false, message: "Destination Page Updated", data: landRecords });

      }
      res.send({ status: true, error: false, message: "Destination Page Updated" });
    } catch (error) {
      console.log(error);
      await errorResponseHelper({
        res,
        error,
        defaultMessage: "Destination page not updated",
      });
    }
  }
  catch (e) {
    console.log('createBlogHelper err', e);
    await errorResponseHelper({ res, error: e, defaultMessage: "Error in SignUp" });
  }

};

const pageMedia = [{
  name: 'image',
  maxCount: 1
},
{
  name: 'icon',
  maxCount: 1
},
{
  name: 'cover',
  maxCount: 1
}
];

export default handler(multiUpload(updateDestination, 'Destination',pageMedia));



