import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  

const _ = require("lodash");
const Joi = require("joi");
const mongoose = require("mongoose");
Joi.objectId = require("joi-objectid")(Joi);

const errorResponseHelper = require("../../../Helper/errorResponse");
const CONSTANTSMESSAGE = require("../../../Helper/constantsMessage");

async function updateTourVariants(req, res) {
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

        req.body.variants.forEach((element, index) => {
            // element.image = req.files[index] ? req.files[index] : element.imageUrl;
            if (element.inclusions) {
                element.inclusions?.forEach((inclusion) => {
                    console.log("inclusion II", inclusion);
                    inclusion = mongoose.Types.ObjectId(inclusion);
                });
            }
            // delete element.imageUrl;
        });
        // let setData = {
        //   // tab-1
        //   variants: req.body,
        // };
        console.log("req.body", req.body);
        let updateModule = await Models.ToursDB.findByIdAndUpdate(req.body.id, {
            variants: req.body.variants,
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

export default handler(updateTourVariants);
