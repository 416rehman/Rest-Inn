const aws = require('aws-sdk');
const multerMiddleware = require('multer')
const multerS3 = require('multer-s3');

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY
})

const deleteFromS3 = (key) => {
    s3.deleteObject({Bucket: 'restinn', Key: key}, (err, data) => {
        console.error(err);
    });
}

const upload = multerMiddleware({
    storage: multerS3({
        s3: s3,
        bucket: 'restinn',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname)
        },
        fileFilter: function (req, file, cb) {
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
                cb(null, true);
            } else {
                cb(null, false);
            }
        }
    })
})

module.exports = upload;
module.exports.deleteFromS3 = deleteFromS3;