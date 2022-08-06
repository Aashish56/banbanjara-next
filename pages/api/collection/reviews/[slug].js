import dbConnect from "../../../database/lib/dbConnect";
import collection from "../../../../database/schema/collection";
import reviewManagement from "../../../../database/schema/reviewManagement";
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


async function review(req, res) {

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
            let toursData = await Models.ToursDB.find({ $or: [{ 'country.name': countryName }, { 'city.name': cityName }, { 'state.name': stateName }] })
            if (toursData) {
                let toursID = [];
                toursData.forEach(function (val, i) {
                    toursID.push(val._id);
                })
                let reviews = await reviewManagement.find({ tour: { $in: toursID } })
                if (reviews) {
                    res.send({ status: true, message: "Reviews Data", data: reviews });
                } else {
                    res.send({ status: true, message: "reviews Data not found" });

                }
            } else {
                res.send({ status: true, message: "Collection Data not found" });
            }
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

export default handler(review);