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


const createOfferPageSchema = Joi.object({
    logo1: Joi.string(),
    heading: Joi.string(),
    // tabHeadings: Joi.string(),
    offers: Joi.array().items(Joi.object()),
    directionalBar1: Joi.string(),
    directionalBarLink1: Joi.string(),
    directionalBar2: Joi.string(),
    directionalBarLink2: Joi.string(),
    bannerSmallText: Joi.array().items(Joi.object()),
    logo2: Joi.string().allow(null, ''),
});

async function create(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not createowed" });
        }
        try {
            let validateData = createOfferPageSchema.validate(req.body);
            if (validateData.error) {
                throw {
                    status: false,
                    error: validateData,
                    message: CONSTANTSMESSAGE.INVALID_DATA,
                };
            }

            let OfferPageData = _.pick(req.body, [
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

            bodyData = {
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

            await new offerPage(bodyData).save();

            res.send({
                status: true,
                message: CONSTANTSMESSAGE.CREATE_SUCCESS_MESSAGE,
            });
        } catch (e) {
            console.log("Offer Page Helper err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in creating Offer page",
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(upload(create,'offers','image'));