import dbConnect from "../../../database/lib/dbConnect";
import itineraries from "../../../database/schema/itinerary";
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

const updateItinerarySchema = Joi.object({
    _id: Joi.string().required(),
    tourId: Joi.string(),
    title: Joi.string(),
    displayOrder: Joi.string(),
    description: Joi.string()
})




async function updateItineraries(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {

            console.log('no')
            // console.log(req.files)

            // let itineraryData = JSON.parse(req.body.data);
            let itineraryData = req.body.itineraries;
            console.log(itineraryData, 'itineraryData')
            const tourId = req.body.tourId;
            const removedIds = req.body.removedIds
            console.log(tourId, '186')

            if (removedIds.length > 0)
                await itineraries.deleteMany({ _id: { $in: removedIds } })


            itineraryData?.map(async (itinerary, index) => {
                console.log('called')
                if (itinerary._id) {
                    let result = await itineraries.findOneAndUpdate({ _id: itinerary._id }, { ...itinerary }, {
                        new: true,
                        runValidators: true,
                    })
                    console.log('result')
                }
                else {
                    // await itineraries.({tourId:itineraryData.tourId})
                    await new itineraries({ ...itinerary, tourId }).save()
                    console.log('tru dat')
                }


            })

            res.send({
                status: true,
                message: 'Itineraries Updated Successfully.',
            });
        } catch (e) {
            console.log('updateItineraries err', e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: 'Error in Itinerary Update',
            });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(updateItineraries);