import team from '../../../database/schema/team';
import { handler } from '../../../middlewares/parser';

const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')

 

async function getTeamList(req, res) {
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        let findData = await team.find({ isDirector: Director }).sort({ _id: -1 });
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


export default handler(getTeamList);