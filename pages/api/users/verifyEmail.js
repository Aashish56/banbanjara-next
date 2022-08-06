import customer from '../../../database/schema/customer';
import { handler } from '../../../middlewares/parser';

const _ = require('lodash');
const Joi = require('joi');
 

const verificationSchema = Joi.object({
    token: Joi.string().required()
});

async function verification(req, res) {
    try {
        let validateData = getCustomerSchema.validate(req.body);
        if (validateData.error) {
          throw { status: false, error: validateData, message: 'Invalid data' };
        }
  
        let bodyData = _.pick(req.body, ['_id']);
        let setData = {
          isEmailVerified: true,
        };
        let updateModule = await customer.findOneAndUpdate(
          { _id: bodyData._id },
          { $set: setData }
        );
        console.log('updateModule is', updateModule);
        res.send({
          status: true,
          message: CONSTANTSMESSAGE.STATUS_UPDATE_SUCCESS,
        });
      } catch (e) {
        console.log('createCustomerHelper err', e);
        await errorResponseHelper({
          res,
          error: e,
          defaultMessage: 'Error in SignUp',
        });
      }
}

export default handler(verification);