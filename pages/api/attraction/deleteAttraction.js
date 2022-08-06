import dbConnect from "../../../database/lib/dbConnect";
import attraction from "../../../database/schema/attractionPage";// import upload from "../../../middlewares/upload";
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

async function deleteFunc(req, res) {
    try {
        await dbConnect();
        try {
            console.log("this is delete req boidy ------------>", req.body);
            await attraction.deleteOne({ _id: req.body._id });
            res.send({ status: true, message: "Attraction Deleted Successfully" });
        } catch (e) {
            console.log("Delete Attraction err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in deleting Attraction",
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }

}

export default handler(deleteFunc)