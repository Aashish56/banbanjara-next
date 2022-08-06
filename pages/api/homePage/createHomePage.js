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


async function create(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {
            console.log("request body ------------------>", req.body);
            let bodyData = _.pick(req.body, [
              `jamstacks`,
              "eleventhpage",
              "hottours",
              "customerReview",
              "Destinations",
              "nearYou",
              "travelTrends",
              "basicPage",
              "tourCards",
              "findThePerfectExperience1",
              "findThePerfectExperience2",
              "tripsThatMatchInterests",
              "pressRelease",
              "partners",
              "customLinks",
              "promotionBar",
              "footer",
              "header",
              "manaliToLehLadakhBikeTrip",
            ]);
      
            console.log(req.body.Destinations);
      
            let saveModule = await new homePage(bodyData).save();
      
            res.send({
              status: true,
              message: CONSTANTSMESSAGE.CREATE_SUCCESS_MESSAGE,
            });
          } catch (e) {
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

export default handler(upload(create,'homePage','image'));