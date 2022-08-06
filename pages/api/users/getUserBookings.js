import dbConnect from "../../../database/lib/dbConnect";
import booking from "../../../database/schema/booking";
import pImage from "../../../database/schema/pImage";
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

const getUserPropertySchema = Joi.object({
    userId: Joi.string().trim().required()
});

async function getUserBookings(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not createowed" });
        }

        try {
            let validateData = getUserPropertySchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }


            // Getting User from Database
            let Data = await booking.find({ userId: req.body.userId }).sort({ _id: -1 }).populate('propertyId');
            let result = [];
            for (let x = 0; x < Data.length; x++) {
                let item = Data[x].toObject()
                let propertyId = item.propertyId._id;
                let imageData = await pImage.findOne({ _id: propertyId });
                let mainImage = imageData ? imageData.mainImage : [];
                item.images = mainImage;
                result.push(item)
            }
            console.log('Data is', result)
            if (result) {
                // if data found check verified or not
                res.send({ status: true, message: "User Booking List", data: result });
            } else {
                res.send({ status: true, message: "User Booking not found" });
            }


        }
        catch (e) {
            console.log('createUserHelper err', e);
            await errorResponseHelper({ res, error: e, defaultMessage: "Error in SignUp" });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(getUserBookings);