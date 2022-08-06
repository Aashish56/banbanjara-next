import dbConnect from "../../../database/lib/dbConnect";
import tagpage from "../../../../database/schema/tagPage";
import tours from "../../../../database/schema/tours";
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

// const allDestination = Joi.object({
//     title: Joi.string(),
//     coverImage: Joi.string(),
//     country: Joi.string(),
//     state: Joi.string(),
//     city: Joi.string(),
// });

async function get(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {
            const tagResponseHandler = async (data, field) => {

                const tourData = await tours.find();
                const filtredTags = [];
                data.forEach((tagValue) => {
                    let tag = tagValue;
                    let tours = [];
                    tourData.forEach(tour => {
                        // console.log( 'tour data from the for Each ' , tour )
                        tour.tags.forEach(val => {
                            // console.log('in the Main For Each -----------> ' , {tourTag: val.value , tag : tag._id });
                            if (val.value.includes(tagValue?._id)) {
                                console.log('in the Main If True Condition -------------> ', { tag: tagValue?._id, tourTag: val.value })
                                tours.push(tour)
                            }
                        })
                    })
                    filtredTags.push({
                        tag,
                        tours
                    })
                });
                console.log('this is my Filtred dAta ------------> ', filtredTags)
                res.send({
                    status: true,
                    message: `Tag Links for ${field} fetched Sucessfully`,
                    data: filtredTags,
                    // tourData,
                    // data
                });
            }
            if (req.body.city) {
                const data = await tagpage.find({
                    'city.name': req.body.city.name,
                });
                tagResponseHandler(data, 'city')
                // res.send({
                //   status: true,
                //   message: "Related Links for City fetched Sucessfully",
                //   data: data,
                // });
            }
            if (req.body.state) {
                const data = await tagpage.find({
                    'state.name': req.body.state.name,
                });
                tagResponseHandler(data, 'city')
                // res.send({
                //   status: true,
                //   message: "Related Links for State fetched Sucessfully",
                //   data: data,
                // });
                // tagsData = data;
            }
            if (req.body.country) {
                const data = await tagpage.find({
                    'country.name': req.body.country.name,
                });
                tagResponseHandler(data, 'country')
                // tagsData = data;
                // res.send({
                //   status: true,
                //   message: "Related Links for Country fetched Sucessfully",
                //   data: data,
                // });
            }

        } catch (e) {
            console.log("updateModule err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error while fetching Related Links Data",
            });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(get);
