import dbConnect from "../../../database/lib/dbConnect";
import tourCard from "../../../database/schema/destination";
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

const updateBlogStatusSchema = Joi.object({
    _id: Joi.string().trim().required(),
    active: Joi.boolean().required(),
});

async function popularDestinations(req, res) {

    await dbConnect();
    if (req.method != 'POST') {
        return res.json({ status: false, error: true, message: "HTTP method not allowed" });
    }
    try {
        try {
            console.log('this is the Request body --------------> ', req.body);
            if (req.body.city) {
                const data = await tourCard.find({ 'city.name': req.body.city.name });
                res.send({
                    status: true,
                    message: 'Poplular Destionation for City fetched Sucessfully',
                    data: data
                });
                return
            }
            if (req.body.state) {
                const data = await tourCard.find({ 'state.name': req.body.state.name });
                res.send({
                    status: true,
                    message: 'Poplular Destionation for State fetched Sucessfully',
                    data: data
                });
                return
            }
            if (req.body.country) {
                const data = await tourCard.find({ 'country.name': req.body.country.name });
                res.send({
                    status: true,
                    message: 'Poplular Destionation for Country fetched Sucessfully',
                    data: data
                });
                return
            }
            else {
                res.send({
                    status: false,
                    message: 'No Data Found for Poplular Destinations  ',
                    data: null
                });
            }
        } catch (e) {
            console.log("fetch Popluar Destination err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error while fething data of Popular Destionation " + e,
            });
        }
    }
    catch (e) {
        console.log('createBlogHelper err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in SignUp" });
    }


};

export default handler(popularDestinations);



