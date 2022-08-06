import menuModule from "../../../database/schema/menuModule";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')

const menuModuleSchema = Joi.object({
    userRole: Joi.array().required()
});


async function getAllMenuList(req, res) {
    try {

        let findData = await menuModule.find();
        res.send({ status: true, message: "All Menu List is", data: findData });
    }
    catch (e) {
        console.log('Getting menu list err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in Getting Menu list" });
    }
}

export default handler(getAllMenuList);