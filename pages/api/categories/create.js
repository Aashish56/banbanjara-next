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

const createCategorySchema = Joi.object({
    name: Joi.string().required(),
    displayOrder: Joi.string(),
  });
  


async function create(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {
            let validateData = createCategorySchema.validate(req.body);
            if (validateData.error) {
                throw {
                    status: false,
                    error: validateData,
                    message: CONSTANTSMESSAGE.INVALID_DATA,
                };
            }
            let bodyData = req.body;

            console.log('bodyData-', bodyData);

            await new categories(bodyData).save();

            res.send({
                status: true,
                message: CONSTANTSMESSAGE.CREATE_SUCCESS_MESSAGE,
            });
        } catch (e) {
            console.log("Category Helper err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in creating categories",
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(create);