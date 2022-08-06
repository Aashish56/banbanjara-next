const _ = require("lodash");
const Joi = require("joi");
const mongoose = require("mongoose");
Joi.objectId = require("joi-objectid")(Joi);
import tours from "../../../database/schema/tours";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
const errorResponseHelper = require("../../../Helper/errorResponse");
const CONSTANTSMESSAGE = require("../../../Helper/constantsMessage");

function updateTourDynamicPricing(Models) {
    async function update(req, res) {
        delete req.body.__v;
        try {
            if (req.method != 'POST') {
                return res.json({ status: false, error: true, message: "HTTP method not Allowed" });
            }
            // validate data using joi
            // let validateData = variantSchema.validate(req.body);
            // if (validateData.error) {
            //   throw {
            //     status: false,
            //     error: validateData,
            //     message: CONSTANTSMESSAGE.INVALID_DATA,
            //   };
            // }

            // pick data from req.body
            // let bodyData = _.pick(req.body, [
            //   // tab-1
            //   "variants",
            // ]);
            // console.log("req.files", req.files);
            const individualTour = await tours.findById(req.body.id);
            req.body.dynamicPricing.forEach((element, index) => {
                // element.image = req.files[index] ? req.files[index] : element.imageUrl;
                if (element.inclusions) {
                    element.inclusions?.forEach((inclusion) => {
                        console.log("inclusion II", inclusion);
                        inclusion = mongoose.Types.ObjectId(inclusion);
                    });
                }
                // delete element.imageUrl;
            });

            individualTour.dynamicPricing[req.body.dynamicPricingIndex] =
                req.body.dynamicPricing;
            // let setData = {
            //   // tab-1
            //   variants: req.body,
            // };
            console.log("req.body", req.body);
            let updateModule = await tours.findByIdAndUpdate(req.body.id, {
                dynamicPricing: individualTour.dynamicPricing,
            });
            console.log("updateModule is", updateModule);
            res.send({ status: true, message: "Tour variants Updated Successfully" });
        } catch (e) {
            console.log("saveModule err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in update Module",
            });
        }
    }
    return update;
}
export default handler(updateTourDynamicPricing);
