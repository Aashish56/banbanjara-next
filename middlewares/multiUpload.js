const aws = require('aws-sdk')
const s3 = new aws.S3();
const multer = require("multer");
const multerS3 = require('multer-s3');

const multiUpload = (handler, paths, imageArray) => {
    return async (req, res) => {
        console.log('req-------------------------------->');
       

        return handler(req, res);
    };
};

export default multiUpload;
