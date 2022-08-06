import employee from '../../../database/schema/employee';
import { handler } from '../../../middlewares/parser';

const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)


 
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')
const moduleSchema = Joi.object({
    name: Joi.string().required(),
    city: Joi.string().required(),
    rating: Joi.number().required(),
    propertyId: Joi.string().allow('null'),
    message: Joi.string().required()
});

async function get(req, res) {
    await dbConnect();
    if (req.method != 'POST') {
        return res.json({ status: false, error: true, message: "HTTP method not allowed" });
    }
    try {
        if (req.query?.id) {
            let employeeRecord = await employee.findOne({ _id: req.query.id }).select('-password').exec();
            res.send({ status: true, error: false, message: "Employee Record Fetched.", data: employeeRecord });
        }
        let destinationRecords = await employee.find().select('-password').exec();
        res.send({ status: true, error: false, message: "Employee Record Fetched", data: destinationRecords });
    } catch (error) {
        await errorResponseHelper({
            res,
            error,
            defaultMessage: "Employee not fetched",
        });
    }
}
export default handler(get);