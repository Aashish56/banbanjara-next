import dbConnect from "../../../database/lib/dbConnect";
import reviewManagement from "../../../../database/schema/reviewManagement";
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

const createReviewSchema = Joi.object({
    user: Joi.string().required(),
    description: Joi.string().required(),
    tour: Joi.string().required(),
    image: Joi.string().required(),
    order: Joi.string().required(),
    stars: Joi.string().required(),
});

async function create(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not Allowed" });
        }
        try {
            let validateData = createReviewSchema.validate(req.body);
            if (validateData.error) {
                console.log(validateData.error);
                throw { status: false, error: validateData, message: 'Invalid data' };
            }

            console.log("request body ------------------>", req.body);
            let bodyData = _.pick(req.body, [
                'user',
                'description',
                'tour',
                'image',
                'order',
                'stars'
            ]);
            bodyData.tour = mongoose.Types.ObjectId(bodyData.tour)

            let saveModule = await new reviewManagement(bodyData).save();
            res.send({
                status: true,
                message: CONSTANTSMESSAGE.CREATE_SUCCESS_MESSAGE,
                data: saveModule
            });
        } catch (e) {
            console.log('review management errror ------------- >', e);
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

export default handler(create);