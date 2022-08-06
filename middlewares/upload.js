const aws = require('aws-sdk')
const s3 = new aws.S3();
const multer = require("multer");
const multerS3 = require('multer-s3');

const fileUpload = (handler, paths, imageArray) => {
    return async (req, res) => {
        console.log('req', imageArray);
        aws.config.update({
            accessKeyId: "AKIAXOJQYDUFL7RB33GY",
            secretAccessKey: "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",
        });
        var upload = multer({
            storage: multerS3({
                s3: s3,
                // acl: 'public-read',
                ContentType: multerS3.DEFAULT_CONTENT_TYPE,
                bucket: 'banbanjara/upload/' + paths + '',
                key: function (req, file, cb) {
                    console.log(file, "files");
                    cb(null, Date.now() + file.originalname); //use Date.now() for unique file keys
                }
            })
        });

        upload.array(imageArray);

        return handler(req, res);
    };
};

export default fileUpload;
