import dbConnect from "../../../database/lib/dbConnect";
import tourLog from "../../../database/schema/tourLogs";
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

const getTourLogSchema = Joi.object({
    dateStart: Joi.string().required(),
    dateEnd: Joi.string().required(),
});
async function getAll(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not Allowed" });
        }
        try {
            let validateData = getTourLogSchema.validate(req.body);
            if (validateData.error) {
                throw {
                    status: false,
                    error: validateData,
                    message: CONSTANTSMESSAGE.INVALID_DATA,
                };
            }
            let bodyData = _.pick(req.body, ["dateStart", "dateEnd"]);
            let findData = await tourLog.find({
                //query today up to tonight
                createdAt: {
                    $gte: new Date(bodyData.dateStart),
                    $lt: new Date(bodyData.dateEnd),
                },
            })
                .populate("createdBy")
                .populate("tourId")
                .sort({ createdAt: -1 });
            // const result=[]
            // await findData.forEach(data=>{
            //   const user=await Models.UserDB.findById(data.createdBy)
            //   const tour=await Models.ToursDB.findById(data.tourId)
            //   result.push({user,tour})
            // })

            res.send({ status: true, message: "", data: findData });
        } catch (e) {
            console.log("Getting list err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in Getting list",
            });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(getAll);