import dbConnect from "../../../database/lib/dbConnect";
import categories from "../../../database/schema/categories";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
const sendSupplierMailHelper = require('../../../Helper/sendSupplierMailHelper');
// import upload from "../../../middlewares/upload";
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const updateCategorySchema = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    displayOrder: Joi.string(),
});


async function update(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {
            // console.log(req.sessionID)
            // validate data using joi
            let validateData = updateCategorySchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }

            // pick data from req.body
            let CategoryData = _.pick(req.body, [
                "_id",
                "displayOrder",
                "name",
            ]);

            setData = {
                name: CategoryData.name,
                displayOrder: CategoryData.displayOrder,
            };
            let updateModule = await categories.findOneAndUpdate(
                { _id: CategoryData._id },
                { $set: setData }
            );
            console.log("updateModule is", updateModule);
            res.send({
                status: true,
                message: "Category updated successfully.",
            });
        } catch (e) {
            console.log("updateCategory err", e);
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