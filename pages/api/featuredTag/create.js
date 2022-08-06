import featuredTag from '../../../database/schema/featuredTag';
import { handler } from '../../../middlewares/parser';
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
 
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')
import upload from "../../../middlewares/upload";
const createFeatureTagSchema = Joi.object({
    title: Joi.string().required(),
    icon: Joi.string().trim().optional()
});

async function create(req, res) {
    await dbConnect();
    if (req.method != 'POST') {
        return res.json({ status: false, error: true, message: "HTTP method not allowed" });
    }
    try {
        // validate data using joi
        const validateData = createFeatureTagSchema.validate(req.body);
        if (validateData.error) {
            throw { status: false, error: validateData, message: "Invalid data" };
        }
        if (req.files?.icon?.length > 0) req.body.icon = req.files.icon[0].path;
        const saveLanding = await new featuredTag(req.body).save();
        res.send({ status: true, error: false, message: "Landing page saved.", data: saveLanding });
    } catch (e) {
        await errorResponseHelper({
            res,
            error: e,
            defaultMessage: "Featured Tag not added",
        });
    }
}
export default handler(upload(create, 'FeaturedTag', 'icon'));