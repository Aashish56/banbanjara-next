import dbConnect from "../../../database/lib/dbConnect";
import landingPage from "../../../database/schema/landing";
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

const createItinerarySchema = Joi.object({
    tourId: Joi.string(),
    title: Joi.string(),
    displayOrder: Joi.string(),
    description: Joi.string()

})



async function getLandingByLocation(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }

        try {
            if (req.body.city) {
                const data = await landingPage.find({ 'city.name': req.body.city.name });
                res.send({
                    status: true,
                    message: 'Landing Page for City fetched Sucessfully',
                    data: data
                });
                return
            }
            if (req.body.state) {
                const data = await landingPage.find({ 'state.name': req.body.state.name });
                res.send({
                    status: true,
                    message: 'Landing Page for State fetched Sucessfully',
                    data: data
                });
                return
            }
            if (req.body.country) {
                const data = await landingPage.find({ 'country.name': req.body.country.name });
                res.send({
                    status: true,
                    message: 'Landing Page for Country fetched Sucessfully',
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

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(getLandingByLocation);