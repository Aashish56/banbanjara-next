import dbConnect from "../../../database/lib/dbConnect";
import homePage from "../../../database/schema/homePage";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
import upload from "../../../middlewares/upload";
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const moduleSchema = Joi.object({
  title: Joi.string().required(),
  order: Joi.number().required(),
  link: Joi.string().trim().required(),
});


async function update(req, res) {

  await dbConnect();
  try {
    if (req.method != 'POST') {
      return res.json({ status: false, error: true, message: "HTTP method not allowed" });
    }
    try {
      console.log(
        "request body from the Update Function ---------------> ",
        req.body
      );

      let bodyData = _.pick(req.body, [
        "customerReview",
        "jamstacks",
        "eleventhpage",
        "hottours",
        "Destinations",
        "nearYou",
        "manaliToLehLadakhBikeTrip",
        "footer",
        "header",
        "basicPage",
        "tourCards",
        "tripsThatMatchInterests",
        "travelTrends",
        "pressRelease",
        "partners",
        "customLinks",
        "promotionBar",
        "findThePerfectExperience1",
        "findThePerfectExperience2",
        "_id",
      ]);

      let setData = {
        nearYou: bodyData.nearYou,
        manaliToLehLadakhBikeTrip: bodyData.manaliToLehLadakhBikeTrip,
        footer: bodyData.footer,
        header: bodyData.header,
        basicPage: bodyData.basicPage,
        findThePerfectExperience1: bodyData.findThePerfectExperience1,
        findThePerfectExperience2: bodyData.findThePerfectExperience2,
        tripsThatMatchInterests: bodyData.tripsThatMatchInterests,
        travelTrends: bodyData.travelTrends,
        pressRelease: bodyData.pressRelease,
        partners: bodyData.partners,
        customLinks: bodyData.customLinks,
        promotionBar: bodyData.promotionBar,
        jamstacks: bodyData.jamstacks,
        tourCards: bodyData.tourCards,
        eleventhpage: bodyData.eleventhpage,
        hottours: bodyData.hottours,
        customerReview: bodyData.customerReview,
        Destinations: bodyData.Destinations,
      };

      console.log(
        "bodyData.travelTrends",
        JSON.stringify(bodyData.travelTrends)
      );
      let updateModule = await homePage.findOneAndUpdate(
        { _id: bodyData._id },
        { $set: setData }
      );

      //   { $set: setData }
      // );
      // // console.log('updateModule is', updateModule);
      res.send({ status: true, message: "HomePage Updated Successfully." });
    } catch (e) {
      // console.log("saveModule err", e);
      await errorResponseHelper({
        res,
        error: e,
        defaultMessage: "Error in saveModule",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: true, errorMessage: error });
  }


};

export default handler(upload(update, 'homePage', 'image'));