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

const createNewsLetterSchema = Joi.object({
    email: Joi.string().trim().required(),
    type: Joi.string().trim().required(),
});

async function create(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {

            let validateData = createNewsLetterSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }

            // pick data from req.body
            let NewsLetterFormData = _.pick(req.body, ['email', 'type']);

            let saveNewsLetter = await new newsLetterSubscribers(NewsLetterFormData).save();
            console.log('saveNewsLetter is ', saveNewsLetter)
            saveNewsLetter = saveNewsLetter.toObject();

            res.send({ status: true, message: "Subscribed to NewsLetter successfully." });
        }
        catch (e) {
            console.log('createNewsLetterHelper err', e);
            await errorResponseHelper({ res, error: e, defaultMessage: "Error in Creating NewsLetter" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(create);