import authT from '../../../database/schema/authToken';
import { handler } from '../../../middlewares/parser';

const _ = require('lodash');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { prepareTemplateSendMail } = require('./signup');
 
authT
async function logIn(req, res) {
    try {

        if (!req.session || !req.session.user || !req.session.user) {
            return res.send({ status: true, message: "Successfully logout", tokenNotFound: true });
        }
        let token = req.session.user.token;
        delete req.session.user;
        let deleteToken = await authT.deleteOne({ token });
        console.log('deleteToken', deleteToken);

        res.send({ status: true, message: "Successfully logout" });
    }
    catch (e) {
        console.log('login err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in Login" });
    }
}

export default handler(logIn);