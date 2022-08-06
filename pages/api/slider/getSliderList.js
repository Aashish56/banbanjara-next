const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')
import slider from '../../../database/schema/slider';
import { handler } from '../../../middlewares/parser';
 

async function getSliderList(req, res) {
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        let findData = await slider.find({}).sort({ _id: -1 });
        let obj = {
            total: findData.length,
            list: findData
        }
        res.send({ status: true, message: "", data: obj });
    }
    catch (e) {
        console.log('Getting list err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in Getting list" });
    }
}


export default handler(getSliderList);
