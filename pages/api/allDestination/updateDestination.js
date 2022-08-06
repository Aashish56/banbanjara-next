import dbConnect from "../../../database/lib/dbConnect";
import allDestination from "../../../database/schema/allDestinationPage";
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


async function update(req, res) {


    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        // let validateData = allDestination.validate(req.body);
        // if (validateData.error) {
        //     return res.json({ status: false, error: validateData, message: "Invalid data" });
        // }

        try {
            // console.log(req.sessionID)
            // validate data using joi
            // let validateData = updateCollectionSchema.validate(req.body);
            // if (validateData.error) {
            //     throw { status: false, error: validateData, message: "Invalid data" };
            // }

            // pick data from req.body
            let CollectionData = _.pick(req.body, [
                "_id",
                "country",
                "state",
                "city",
                "title",
                "selectCard",
                "relatedArticleTitle",
                "distanceFromDestination",
                "description",
                "relatedArticleimage",
                "coverImage",
            ]);

           var setData = {
                country: CollectionData.country,
                state: CollectionData.state,
                city: CollectionData.city,
                title: CollectionData.title,
                selectCard: CollectionData.selectCard,
                relatedArticleTitle: CollectionData.relatedArticleTitle,
                distanceFromDestination: CollectionData.distanceFromDestination,
                description: CollectionData.description,
                relatedArticleimage: CollectionData.relatedArticleimage,
                coverImage: CollectionData.coverImage,
            };
            let updateModule = await allDestination.findOneAndUpdate(
                { _id: CollectionData._id },
                { $set: setData }
            );
            console.log("updateModule is", updateModule);
            res.send({
                status: true,
                message: "Collection Updated Successfully.",
            });
        } catch (e) {
            console.log("updateCollection err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in Collection Update",
            });
        }


    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }

}

export default handler(update);