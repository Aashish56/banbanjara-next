import dbConnect from "../../../database/lib/dbConnect";
import offerPage from "../../../database/schema/offerPage";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
import upload from "../../../middlewares/upload";
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


const getOfferPageSchema = Joi.object({
    _id: Joi.string().trim().required(),
});


async function update(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }

        try {
            // validate data using joi
            let validateData = updateOfferPageSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }

            // pick data from req.body
            let OfferPageData = _.pick(req.body, [
                "_id",
                "logo1",
                "heading",
                // "tabHeadings",
                "offers",
                "directionalBar1",
                "directionalBar2",
                "directionalBarLink1",
                "directionalBarLink2",
                "bannerSmallText",
                "logo2",
            ]);

            setData = {
                headerImage: OfferPageData.logo1,
                heading: OfferPageData.heading,
                // headingTabs: OfferPageData.tabHeadings,
                offers: OfferPageData.offers,
                directionalBar1: OfferPageData.directionalBar1,
                directionalBar2: OfferPageData.directionalBar2,
                directionalBarLink1: OfferPageData.directionalBarLink1,
                directionalBarLink2: OfferPageData.directionalBarLink2,
                offersSection: OfferPageData.bannerSmallText,
                testimonials: OfferPageData.logo2,
            };
            let updateModule = await offerPage.findOneAndUpdate({ _id: OfferPageData._id }, { $set: setData });
            console.log("updateModule is", updateModule);
            res.send({
                status: true,
                message: "OfferPage Updated Successfully.",
            });
        } catch (e) {
            console.log("updateOfferPage err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in Offer Update",
            });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};
export default handler(upload(update,'offers','image'));