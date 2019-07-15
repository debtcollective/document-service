// @flow

import AWS from "aws-sdk";

const s3 = new AWS.S3();

const upload = async (file: Buffer, filename: string) => {
  const bucketName = process.env.BUCKET || "";
  const params = {
    Body: file,
    Bucket: bucketName,
    Key: filename,
  };

  return new Promise((resolve, reject) => {
    const expectedUrl = `https://${bucketName}.s3.amazonaws.com/${filename}`;
    s3.putObject(params, err => {
      if (err) {
        reject(err);
      }
      resolve(expectedUrl);
    });
  });
};

export default {
  upload,
};
