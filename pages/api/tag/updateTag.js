import dbConnect from "../../../database/lib/dbConnect";
import tag from "../../../database/schema/tag";
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


async function updateTag(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }

        try {
            console.log(req.body);

            // const removedIds = req
            // validate data using joi
            // let validateData = moduleSchema.validate(req.body);
            // if (validateData.error) {
            //   throw {
            //     status: false,
            //     error: validateData,
            //     message: CONSTANTSMESSAGE.INVALID_DATA,
            //   };
            // }

            // pick data from req.body

            // let bodyData = _.pick(req.body, [
            // 'tagData'
            // 'parentTagTitle',
            // 'parentTagDisplayOrder',
            // 'subTags',
            // ]);
            let { tagData, removedIds } = req.body;

            if (removedIds.length > 0)
                await tag.deleteMany({ _id: { $in: removedIds } });

            // if(tag)
            tagData?.map(async (tag) => {
                // console.log('called')
                // if(itinerary._id){
                const exists = await tag.exists({ _id: tag._id });
                if (exists) {
                    let result = await tag.findOneAndUpdate(
                        { _id: tag._id },
                        tag,
                        {
                            new: true,
                            runValidators: true,
                        }
                    );
                    console.log(result, 'result');
                } else {
                    await new tag({
                        parentTagDisplayOrder: tag.parentTagDisplayOrder,
                        parentTagTitle: tag.parentTagTitle,
                        subTags: tag.subTags,
                    }).save();
                }
                // console.log('result')
                // }
                // else{
                //   // await Models.ItineraryDB.({tourId:itineraryData.tourId})
                //   await new Models.ItineraryDB({...itinerary, tourId}).save()
                //   console.log('tru dat')
                // }
            });
            // let setData = {
            // parentTagTitle: bodyData.parentTagTitle,
            // parentTagDisplayOrder:bodyData.parentTagDisplayOrder,
            // subTags: bodyData.subTags,
            // };

            // if (req.files.length > 0) {
            //   bodyData.image = req.files;
            //   setData['image'] = bodyData.image;
            // }
            // let updateModule = await tag.findOneAndUpdate(
            //   { _id: bodyData._id },
            //   { $set: setData }
            // );
            // console.log('updateModule is', updateModule);
            res.send({ status: true, message: 'Tag Updated Successfully.' });
        } catch (e) {
            console.log('saveModule err', e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: 'Error in saveModule',
            });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};
export default handler(upload(updateTag,'Tag','image'));