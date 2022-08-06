const _ = require("lodash");
const Joi = require("joi");
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
const schema = Joi.object({
    _id: Joi.string().required(),
    isDisable: Joi.boolean().required(),
});

async function updateToursStatus(req, res) {
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not Allowed" });
        }
        // validate data using joi
        let validateData = schema.validate(req.body);
        if (validateData.error) {
            throw {
                status: false,
                error: validateData,
                message: CONSTANTSMESSAGE.INVALID_DATA,
            };
        }

        let bodyData = _.pick(req.body, ["isDisable", "_id"]);
        let setData = {
            isDisable: bodyData.isDisable,
        };
        let updateModule = await tours.findOneAndUpdate(
            { _id: bodyData._id },
            { $set: setData }
        );
        console.log("updateModule is", updateModule);
        res.send({
            status: true,
            message: CONSTANTSMESSAGE.STATUS_UPDATE_SUCCESS,
        });
    } catch (e) {
        console.log("updateModule err", e);
        await errorResponseHelper({
            res,
            error: e,
            defaultMessage: "Error in updateModule",
        });
    }
}
export default handler(updateToursStatus);