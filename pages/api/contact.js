import dbConnect from "../../../database/lib/dbConnect";
import contact from "../../database/schema/contact";
import errorResponseHelper from "../../Helper/errorResponse";
import { handler } from "../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};

// import upload from "../../../middlewares/upload";
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
contact

async function create(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        // let validateData = allDestination.validate(req.body);
        // if (validateData.error) {
        //     return res.json({ status: false, error: validateData, message: "Invalid data" });
        // }

        try {
            let saveContact = await new contact(req.body).save();
            res.send({ status: true, error: false, message: "Contact Saved.", data: saveContact });
        } catch (e) {
            console.log(e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Contact not added",
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(create);