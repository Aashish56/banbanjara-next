
const _ = require('lodash');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
 
import user from '../../../database/schema/user';
import { handler } from '../../../middlewares/parser';
const setNewPasswordSchema = Joi.object({
    newPassword: Joi.string().required(),
    token: Joi.string().required()
});

async function setNewPassword(req, res) {
    try {
        // console.log(req.sessionID)
        let payload = req.body;
        // validate data using joi
        let validateData = setNewPasswordSchema.validate(payload);
        if (validateData.error) {
            throw { status: false, error: validateData, message: "Invalid data", validationError: true };
        }

        let userData = await user.findOne({ forgetPasswordToken: payload.token }).lean();

        if (!userData) {
            throw { status: false, error: true, message: "Not authorised", statusCode: 401 };
        }

        let hash = await bcrypt.hash(payload.newPassword, 10);

        let setData = {
            password: hash
        }
        if (!userData.verified) {
            setData.verified = true;
            setData.verificationDate = new Date();
        }

        let updateUserData = await user.findOneAndUpdate({ _id: userData._id }, { $set: setData }, { new: true }).lean();

        if (!updateUserData) {
            throw { status: false, error: true, message: "Errow while updating new password", statusCode: 500 };
        }

        res.send({ status: true, message: "Password has been successfully updated" });
    }
    catch (e) {
        console.log('login err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in set new password" });
    }
}

export default handler(setNewPassword);