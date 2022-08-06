import dbConnect from "../../../database/lib/dbConnect";
import attraction from "../../database/schema/attractionPage";
import errorResponseHelper from "../../Helper/errorResponse";
import { handler } from "../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
// import upload from "../../../middlewares/upload";
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


async function getArticle(req, res) {

    await dbConnect();
    if (req.method != 'POST') {
        return res.json({ status: false, error: true, message: "HTTP method not allowed" });
    }
    try {        
        const { country, city, state } = req.body;
        try {
            // Getting all Vendors from Database
            if (city) {
                let findData = await attraction.find({ city: city });
                res.send({ status: true, message: "Related Articles for City", data: findData });
                return
            }
            if (state) {
                let findData = await attraction.find({ state: state });
                res.send({ status: true, message: "Related Articles for State", data: findData });
                return
            }
            if (country) {
                console.log('in the Country Part ')
                let findData = await attraction.find({ country: country });
                console.log('finded Datat -------------> ', findData);
                res.send({ status: true, message: "Related Articles for country", data: findData });
                return
            } else {
                res.send({ status: true, message: "No Data found for Related Articles", data: null });
            }
        } catch (e) {
            console.log("getAllPopular end Point err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in getting Popular Destination List",
            });
        }
    }
    catch (e) {
        console.log('getArticleBlogHelper err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in SignUp" });
    }


};

export default handler(getArticle);



