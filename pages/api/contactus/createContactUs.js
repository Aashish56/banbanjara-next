import dbConnect from "../../../database/lib/dbConnect";
import contactus from "../../../database/schema/contactus";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
// import upload from "../../../middlewares/upload";
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const sendMessageToClient = async (Models, bodyData) => {
    let mobile = await siteMobile(Models);
    let clientMessage = 'Hello ' + bodyData.name + ', \n';
    let clientMobile = bodyData.mobile;
    clientMessage += 'Your Message submitted on Vishal Construction Company. We will get back to you at the earliest. For any query Call ' + mobile + '. Regards, Vishal Construction Company VISHCC \n';
    console.log('clientMessage is', clientMessage);
    await SendMessage({
        senderID: 'VCCFLT',
        templateID: '1207163549241970196',
        mobile: clientMobile,
        message: clientMessage,
    });
};
const sendMessageToAdmin = async (Models, bodyData) => {
    let mobile = await siteMobile(Models);
    let message = 'Hello Vishal Properties, \n';
    message += 'A VCC User ' + bodyData.name + ', want to contact. Subject: ' + bodyData.subject + ' Name : ' + bodyData.name + ' Mobile : ' + bodyData.mobile + ' Email : ' + bodyData.email + ' Message: ' + bodyData.message + ' Thanks VISHCC';
    console.log('message is', message);
    await SendMessage({
        senderID: 'VCCFLT',
        templateID: '1207163549238877518',
        mobile,
        message
    });
};

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

            let validateData = moduleSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: CONSTANTSMESSAGE.INVALID_DATA };
            }

            // pick data from req.body
            let bodyData = _.pick(req.body, ["name", "email", "mobile", "subject", "message"]);
            let findData = await contactus.findOne({ mobile: bodyData.mobile });

            // if (findData) {
            //     // if data found check 
            //     throw { status: false, error: true, message: CONSTANTSMESSAGE.ALREADY_EXIST, duplicateModule: true, statusCode: 401 };
            // }

            let saveModule = await new Models.ContactUsDB(bodyData).save();
            if (saveModule) {
                await sendMessageToAdmin(Models, bodyData);
                await sendMessageToClient(Models, bodyData);
            }
            console.log('saveModule is', saveModule)
            res.send({ status: true, message: CONSTANTSMESSAGE.CREATE_SUCCESS_MESSAGE });
        }
        catch (e) {
            console.log('saveModule err', e);
            await errorResponseHelper({ res, error: e, defaultMessage: "Error in saveModule" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(create);