import dbConnect from "../../../database/lib/dbConnect";
import vendor from "../../../database/schema/vendor";
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

const updateVendorOnboardStatusSchema = Joi.object({
    _id: Joi.string().trim().required(),
    onBoardActive: Joi.boolean().required(),
});

async function updateOnBoardStatus(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not Allowed" });
        }

        try {
            console.log("req.body", req);
            let validateData = updateVendorOnboardStatusSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }

            let bodyData = _.pick(req.body, ["onBoardActive", "_id"]);
            let setData = {
                onBoardActive: bodyData.onBoardActive,
            };
            let updateModule = await vendor.findOneAndUpdate(
                { _id: bodyData._id },
                { $set: setData }
            );
            console.log("updateModule is", updateModule);
            res.send({
                status: true,
                error: false,
                message: CONSTANTSMESSAGE.STATUS_UPDATE_SUCCESS,
            });
        } catch (e) {
            console.log("updateVendorOnboardStatus err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in updateVendorOnboardStatus",
            });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(updateOnBoardStatus);