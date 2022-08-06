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

async function update(req, res) {
    await dbConnect();
    if (req.method != 'POST') {
        return res.json({ status: false, error: true, message: "HTTP method not allowed" });
    }
    try {
        if (req.files?.icon?.length > 0) req.body.icon = req.files.icon[0].path;
        const landRecords = await featuredTag.findOneAndUpdate({ _id: req.query?.id }, { $set: req.body }, { new: true });
        res.send({ status: true, error: false, message: "Featured Tag Page Updated", data: landRecords });
    } catch (error) {
        await errorResponseHelper({
            res,
            error,
            defaultMessage: "Featured Tag not updated",
        });
    }
}
export default handler(upload(update, 'FeaturedTag', 'icon'));