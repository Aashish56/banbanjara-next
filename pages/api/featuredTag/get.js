import featuredTag from '../../../database/schema/featuredTag';
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
            const landRecord = await featuredTag.findOne({ _id: req.query.id }).exec();
            res.send({ status: true, error: false, message: "Featured Tag Fetched.", data: landRecord });
        }
        const landRecords = await featuredTag.find().exec();
        res.send({ status: true, error: false, message: "Featured Tag Fetched", data: landRecords });
    } catch (error) {
        await errorResponseHelper({
            res,
            error,
            defaultMessage: "Something went wrong",
        });
    }
}
export default handler(get);