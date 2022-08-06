import { handler } from '../../../middlewares/parser';

const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
team
 
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage');
const team = '../../../database/schema/team';
const schema = Joi.object({
    _id: Joi.string().required(),
});

async function getTeam(req, res) {
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        let validateData = schema.validate(req.body);
        if (validateData.error) {
            throw { status: false, error: validateData, message: "Invalid data" };
        }
        // Getting Team from Database
        let TeamData = await team.findOne({ _id: req.body._id });
        console.log('TeamData is', TeamData)
        if (TeamData) {
            // if data found check verified or not
            res.send({ status: true, message: "Team Member Details", data: TeamData });
        } else {
            res.send({ status: true, message: "Team Member not found" });
        }
    }
    catch (e) {
        console.log('TeamData err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in TeamData" });
    }
}
export default handler(getTeam);