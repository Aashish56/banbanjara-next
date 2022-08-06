import dbConnect from "../../../database/lib/dbConnect";
import parentTags from "../../../database/schema/parentTags";
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

const updateParentTagSchema = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    category: Joi.object().required(),
    displayOrder: Joi.string(),
  });

async function update(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not Allowed" });
        }
        try {
            // console.log(req.sessionID)
            // validate data using joi
            let validateData = updateParentTagSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }

            // pick data from req.body
            let ParentTagData = _.pick(req.body, [
                "_id",
                "displayOrder",
                "name",
                "categoryId",
            ]);

            setData = {
                name: ParentTagData.name,
                displayOrder: ParentTagData.displayOrder,
                categoryId: ParentTagData.categoryId,
            };
            let updateModule = await parentTags.findOneAndUpdate(
                { _id: ParentTagData._id },
                { $set: setData }
            );
            console.log("updateModule is", updateModule);
            res.send({
                status: true,
                message: "ParentTag updated successfully.",
            });
        } catch (e) {
            console.log("updateParentTag err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error updating category. Please try again!",
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(update);