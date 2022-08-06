import dbConnect from "../../../database/lib/dbConnect";
import newsLetterSubscribers from "../../../database/schema/newsLetterSubscribers";
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

const updateNewsLetterStatusSchema = Joi.object({
    _id: Joi.string().trim().required(),
    active: Joi.boolean().required(),
});


async function getAll(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {
            let validateData = updateNewsLetterStatusSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }


            let bodyData = _.pick(req.body, ["active", "_id"]);
            let setData = {
                active: bodyData.active,
            }
            let updateModule = await newsLetterSubscribers.findOneAndUpdate({ _id: bodyData._id }, { $set: setData });
            console.log('updateModule is', updateModule)
            res.send({ status: true, message: CONSTANTSMESSAGE.STATUS_UPDATE_SUCCESS });


        }
        catch (e) {
            console.log('createNewsLetterHelper err', e);
            await errorResponseHelper({ res, error: e, defaultMessage: "Error in SignUp" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(getAll);