const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("../secrets.json"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_SES_KEY,
    secretAccessKey: secrets.AWS_SES_SECRET,
    region: "eu-central-1",
});

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

exports.sendEmail = (to, text, subj) => {
    return ses
        .sendEmail({
            Source: "Rollercoaster Dev <dev@rollercoaster.dev>",
            Destination: {
                ToAddresses: [to],
            },
            Message: {
                Body: {
                    Text: {
                        Data: text,
                    },
                },
                Subject: {
                    Data: subj,
                },
            },
        })
        .promise();
};

exports.upload = function (req, res, next) {
    if (!req.file) {
        console.log("Multer failed");
        return res.sendStatus(500);
    }
    const { filename, mimetype, size, path } = req.file;

    s3.putObject({
        Bucket: "eddiegram",
        ACL: "public-read",
        Key: filename,
        Body: fs.createReadStream(path),
        ContentType: mimetype,
        ContentLength: size,
    })
        .promise()
        .then(() => {
            next();
            fs.unlink(path, () => {});
        })
        .catch((err) => {
            console.log("Error in s3", err);
        });
};
exports.delete = function (url) {
    if (!url) {
        console.log("no url to delete");
        return res.sendStatus(500);
    }

    const params = {
        Bucket: "eddiegram",
        Key: url,
    };

    return s3.deleteObject(params).promise();
};
exports.getObject = function (url) {
    if (!url) {
        console.log("no url to delete");
        return res.sendStatus(500);
    }
    const params = {
        Bucket: "eddiegram",
        Key: url,
    };
    return s3.getObject(params).promise();
};
