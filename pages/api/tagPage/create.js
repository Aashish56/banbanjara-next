import dbConnect from "../../../database/lib/dbConnect";
import tagPage from "../../../database/schema/tagPage";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
import upload from "../../../middlewares/upload";
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

async function create(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }

        try {
            let bodyData = _.pick(req.body, [
                "title",
                "country",
                "state",
                "city",
                "category",
                'tours',
                'image',
                'cardImage',
                "description",
                "metaDescription",
                "metaKeyword",
                "metaTitle",
                "promotionalBar"
            ]);
            // const bodyData = req.files;
            console.log("create  tag files ", req.files);
            console.log("create  tag data ", bodyData);
            //   let validateData = createTagPageSchema.validate(req.body);
            //   if (validateData.error) {
            //     throw {
            //       status: false,
            //       error: validateData,
            //       message: CONSTANTSMESSAGE.INVALID_DATA,
            //     };
            //   }

            //   console.log("this is the Body Data That i want to Save ", bodyData);

            //   console.log("bodyData-", bodyData);

            const saveData = await new tagPage(bodyData).save();

            res.send({
                status: true,
                message: CONSTANTSMESSAGE.CREATE_SUCCESS_MESSAGE,
                data: saveData
            });
        } catch (e) {
            console.log("Tag Page Helper err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in creating tag page",
            });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(upload(create, 'tagPage', 'image'));