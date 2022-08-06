const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')
import menuModule from "../../../database/schema/menuModule";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};

const menuModuleSchema = Joi.object({
    _id: Joi.objectId().required()
});

async function getMenuData(req, res) {
    try {
        let validateData = menuModuleSchema.validate(req.body);
        if (validateData.error) {
            throw { status: false, error: validateData, message: CONSTANTSMESSAGE.INVALID_DATA };
        }

        let findData = await menuModule.findOne({ _id: req.body._id });
        res.send({ status: true, message: "Side Menu Data", data: findData });
    }
    catch (e) {
        console.log('Getting menu list err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in Getting Menu Data" });
    }
}


export default handler(getMenuData);