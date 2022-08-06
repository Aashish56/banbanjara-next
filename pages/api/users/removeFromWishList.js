import dbConnect from "../../../database/lib/dbConnect";
import wishList from "../../../database/schema/wishList";
import pImage from "../../../database/schema/pImage";
import pFeatures from "../../../database/schema/pFeatures";
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

const removeWishListPropertySchema = Joi.object({
    userId: Joi.string().trim().required(),
    propertyId: Joi.string().trim().required()
});

async function removeFromWishList(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not createowed" });
        }


        try {
            let validateData = removeWishListPropertySchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }

            let query = {
                $and: [
                    { 'propertyId': req.body.propertyId },
                    { 'userId': req.body.userId }
                ]
            }
            let Data = await wishList.remove(query);
            console.log('Data is', Data)
            if (Data) {
                // if data found check verified or not
                res.send({ status: true, message: "Property Removed From User WishList", data: Data });
            } else {
                res.send({ status: true, message: "Error While Property Removing From User WishList" });
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

export default handler(removeFromWishList);