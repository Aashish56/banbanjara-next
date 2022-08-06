import dbConnect from "../../../database/lib/dbConnect";
import review from "../../../database/schema/review";
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

const createReviewPageSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().required(),
    file: Joi.string().required(),
    cards: Joi.array().required(),
});

async function create(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not Allowed" });
        }
        try {
            let validateData = createReviewPageSchema.validate(req.body);
            if (validateData.error) {
                console.log(validateData.error);
                throw { status: false, error: validateData, message: 'Invalid data' };
            }

            console.log("request body ------------------>", req.body);
            let bodyData = _.pick(req.body, [
                'title',
                'description',
                'file',
                'type',
                'cards'
            ]);

            let saveModule = await new review(bodyData).save();
            console.log('savedModule --------------------> ', saveModule);
            res.send({
                status: true,
                message: CONSTANTSMESSAGE.CREATE_SUCCESS_MESSAGE,
                data: saveModule
            });
        } catch (e) {
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in saveModule",
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(upload(create,'homepage','image'));