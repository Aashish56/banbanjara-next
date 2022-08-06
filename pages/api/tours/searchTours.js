const _ = require("lodash");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
// const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')
import tours from "../../../database/schema/tours";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
const errorResponseHelper = require("../../../Helper/errorResponse");

async function searchTours(req, res) {
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not Allowed" });
        }
        // const space = new RegExp("-", "g");
        // const slug = req.body.slug.replace(space, "\\s*");
        // const re = new RegExp(slug);
        // console.log('this is the Slug re --------> ', re);
        const filtredData = [];
        const allTours = await tours.find();
        console.log("this is All toours ----------> ", allTours);
        allTours.forEach(
            (tour) =>
                tour.title.toLowerCase().includes(req.body.slug) &&
                filtredData.push(tour)
        );
        // var findData = await tours.find({ 'title': { $regex: '^' + req.body.slug, $options: 'i' } }).exec();
        res.send({ status: true, message: "", data: filtredData });
    } catch (e) {
        console.log("Getting list err", e);
        await errorResponseHelper({
            res,
            error: e,
            defaultMessage: "Error in Getting list",
        });
    }
}

export default handler(searchTours);
