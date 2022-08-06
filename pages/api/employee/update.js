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

async function update(req, res) {
    await dbConnect();
    if (req.method != 'POST') {
        return res.json({ status: false, error: true, message: "HTTP method not allowed" });
    }
    try {
        const employeeRecord = await employee.findOneAndUpdate({ _id: req.query?.id }, { $set: req.body }, { new: true });
        res.send({ status: true, error: false, message: "Employee Updated", data: employeeRecord });
    } catch (error) {
        console.log(error);
        await errorResponseHelper({
            res,
            error,
            defaultMessage: "Employee not updated",
        });
    }
}
export default handler(update);