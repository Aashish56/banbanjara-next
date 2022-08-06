import authT from '../database/schema/authToken';

const moment = require('moment');
var jwt = require('jsonwebtoken');


const authMiddleware = (handler) => {
    return async (req, res) => {

        try {
            let authToken = req.headers.authorization;

            if (!authToken) {
                throw { status: false, error: true, auth: false, message: "Token is required" };
            }
            let tokenArr = authToken.split(' ');
            let token = tokenArr[1];
            let decoded;
            console.log('token is', token)
            console.log('process.env.REQUEST_TOKEN is', process.env.REQUEST_TOKEN)

            if (token == process.env.REQUEST_TOKEN) {
                decoded = jwt.verify(token, process.env.SESSION_SECRET);
            }
            if (decoded == process.env.SECRET) {
                next();
            } else {
                let userToken = await authT.findOne({ token }).populate('userId').lean();
                if (!userToken) {
                    throw { status: false, error: true, auth: false, message: "Invalid token" };
                }

                if (userToken.created_at && new Date(userToken.created_at) < new Date(moment.utc().startOf('day'))) {
                    // token is old delete it
                    let deleteToken = await authT.deleteOne({ token });
                    throw { status: false, error: true, auth: false, message: "Token exipred", exipred: true };
                }

                req.locals = {
                    user: userToken
                };
                console.log('locals', req.locals);
                next();
                // console.log('token is ', token);
                // throw {status: false, error: true, auth: false, message: "Invalid token"};
            }
        } catch (error) {
            console.log('Error is', error);
            res.send({ status: false, error: true, auth: false, message: error.message });
        }
        return handler(req, res);
    };
};

export default authMiddleware;
