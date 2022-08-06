import dbConnect from "../../../database/lib/dbConnect";
import attraction from "../../../database/schema/attractionPage";
import multiUpload from "../../../middlewares/multiUpload";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
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
            // let validateData = updateVendorSchema.validate(req.body);
            // if (validateData.error) {
            //     throw { status: false, error: validateData, message: "Invalid data" };
            // }
            let setData = {
                ...req.body,
            };
            let updateModule = await attraction.findOneAndUpdate(
                { _id: req.body._id },
                { $set: setData }
            );
            console.log("updateModule is", updateModule);
            res.send({
                status: true,
                message: "Attraction Updated Successfully.",
            });
        } catch (e) {
            console.log("updateVendor err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in Attraction Update",
            });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }

}

const pageMedia = [{
    name: 'coverImage',
}, {
    name: 'promotionSideBarImage',
}, {
    name: 'promotionaSideBar',
}, {
    name: 'attractionCard'
}];

export default handler(multiUpload(update,'attractionPage', pageMedia));