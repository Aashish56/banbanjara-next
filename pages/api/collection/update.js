import dbConnect from "../../../database/lib/dbConnect";
import collection from "../../../database/schema/collection";
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


async function update(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {
            // console.log(req.sessionID)
            // validate data using joi
            // let validateData = updateCollectionSchema.validate(req.body);
            // if (validateData.error) {
            //     throw { status: false, error: validateData, message: "Invalid data" };
            // }

            // pick data from req.body
            // let CollectionData = _.pick(req.body, [
            //     "_id",
            //     "country",
            //     "state",
            //     "city",
            //     "title",
            //     "selectCard",
            //     "relatedArticleTitle",
            //     "distanceFromDestination",
            //     "description",
            //     "relatedArticleimage",
            //     "coverImage",
            // ]);

            setData = {
                ...req.body,
            };
            console.log('this is the final set data ------------------->', setData)
            let updateModule = await collection.findOneAndUpdate({ _id: req.body._id }, { $set: setData });
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


};

const pageMedia = [{
    name: 'image', maxCount: 1
}, {
    name: 'cardImage', maxCount: 1
}];

export default handler(multiUpload(update,'collection',pageMedia));