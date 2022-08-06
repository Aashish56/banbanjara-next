const _ = require('lodash');
import tours from "../../../database/schema/tours";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const schema = Joi.object({
    tourId: Joi.string().required,
});



async function getAllRelatedTours(req, res) {
    try {
        // let findData = await Models.ToursDB.findOne({_id:req.body.tourId}).select('relatedTours');
        let tourData = await tours.findOne({
            _id: req.body.tourId,
        }).select('relatedTours')

        // console.log(relatedTours,'relatedTours',req.body )
        // console.log(findData['relatedTours'], 'new')
        // const relatedTours = []
        // findData.map(async (tour) => {
        // 	const tourData = await Models.ToursDB.findOne({_id:tour._id}).select('title theme');
        // 	relatedTours.push(tourData)
        // })
        const { relatedTours } = tourData

        let obj = {
            total: relatedTours.length,
            list: relatedTours,
        };
        res.send({ status: true, message: '', data: obj });
    } catch (e) {
        console.log('Getting list err', e);
        await errorResponseHelper({
            res,
            error: e,
            defaultMessage: 'Error in Getting list',
        });
    }
}


export default handler(getAllRelatedTours);
