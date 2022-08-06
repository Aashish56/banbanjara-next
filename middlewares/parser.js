import formidable from "formidable";
const aws = require('aws-sdk')
const s3 = new aws.S3();
const multer = require("multer");
const multerS3 = require('multer-s3');
export function handler(cb, paths, imageArray) {
    aws.config.update({
        accessKeyId: "AKIAXOJQYDUFL7RB33GY",
        secretAccessKey: "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",
    });
    let upload = multer({
        storage: multerS3({
            s3: s3,
            ContentType: multerS3.AUTO_CONTENT_TYPE,
            bucket: 'banbanjara/upload/' + paths + '',
            key: function (req, file, cb) {
                console.log(file, "files");
                cb(null, Date.now() + file.originalname);
            }
        })
    }).fields(imageArray);
    return async function (req, res) {
        const form = new formidable.IncomingForm();
        const prom = new Promise((resolve, reject) => {
            form.parse(req, async function (err, fields, files) {
                if (err) reject(err);
                req.files = files;
                if (req.files) {
                    const imageProm = new Promise((resolve, reject) => {
                        console.log('request', req.files);
                        upload(req, res, async function (err) {
                            if (err) reject(console.log(err));
                            resolve(req, res);
                        });
                    })
                    await imageProm;
                    console.log('request', req.files);
                }
                req.body = fields;
                resolve(cb(req, res));
            });
        });
        console.log('test');
        await prom
        return cb(req, res);
    };
}