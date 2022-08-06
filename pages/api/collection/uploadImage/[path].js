import errorResponseHelper from "../../../../Helper/errorResponse";
import { handler } from "../../../../middlewares/parser";
export const config = {
  api: {
      bodyParser: false,
  },
};

const _ = require("lodash");
const Joi = require("joi");

const errorResponseHelper = require("../../../Helper/errorResponse");
const CONSTANTSMESSAGE = require("../../../Helper/constantsMessage");
const moduleSchema = Joi.object({});

function UploadImage() {
    async function create(req, res) {
        try {
            if (req.files.length > 0) {
                req.body.image = req.files[0];
                res.send({
                    status: true,
                    message: CONSTANTSMESSAGE.UPLOAD_SUCCESS_MESSAGE,
                    image: req.body.image
                })
            } else {}
        } catch (e) {
            console.log("save Module err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in uploading",
            });
        }
    }
    return create;
}
export default handler(UploadImage);