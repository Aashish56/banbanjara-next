import dbConnect from "../../../database/lib/dbConnect";
import collection from "../../../../database/schema/collection";
import attraction from "../../../../database/schema/attractionPage";
import errorResponseHelper from "../../../../Helper/errorResponse";
import { handler } from "../../../../middlewares/parser";
export const config = {
  api: {
      bodyParser: false,
  },
};
// import upload from "../../../middlewares/upload";
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


async function all(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {
            const space = new RegExp("-", "g");
            const slug = req.params.slug.replace(space, "\\s*");
            const re = new RegExp(slug);
            let collectionData = await collection.findOne({
                title: { $regex: re, $options: "i" },
            });;
            let countryName = collectionData.country.name
            let cityName = collectionData.city.name
            let stateName = collectionData.state.name
            if (cityName) {
                let attractionData = await attraction.find({ 'city.name': cityName });
                if (attractionData) {
                    // if data found check verified or not
                    res.send({ status: true, message: "Collection Data For Cities ", data: attractionData });
                } else {
                    res.send({ status: true, message: "Collection Data not found" });
                }
            }
            if (stateName) {
                let attractionData = await attraction.find({ 'state.name': stateName });
                if (attractionData) {
                    // if data found check verified or not
                    res.send({ status: true, message: "Collection Data For States ", data: attractionData });
                } else {
                    res.send({ status: true, message: "Collection Data not found" });
                }
            }
            if (countryName) {
                let attractionData = await attraction.find({ 'country.name': countryName });
                if (attractionData) {
                    // if data found check verified or not
                    res.send({ status: true, message: "Collection Data For Country ", data: attractionData });
                } else {
                    res.send({ status: true, message: "Collection Data not found" });
                }
            }

            // let attractionData = await attraction.find({ $or: [{ 'country.name': countryName }, { 'city.name': cityName }, { 'state.name': stateName }] })

        } catch (e) {
            console.log(" err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in getting Collection Page",
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(all);