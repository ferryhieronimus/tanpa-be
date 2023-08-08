import { S3 } from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3({
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  endpoint: process.env.DO_SPACES_ENDPOINT,
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY!,
    secretAccessKey: process.env.DO_SPACES_SECRET!,
  },
});

async function generateGetUrl(Key: string) {
  const bucketParams = {
    Bucket: process.env.DO_SPACES_NAME,
    Key,
  };

  try {
    const url = await getSignedUrl(
      s3Client,
      new GetObjectCommand(bucketParams),
      { expiresIn: 15 * 60 }
    );
    console.log("URL:", url);
    return url;
  } catch (err) {
    console.log("Error", err);
    throw new Error();
  }
}

async function generatePutUrl(FileName: string, ContentType: string) {
  const id: string = uuid();

  const bucketParams = {
    Bucket: process.env.DO_SPACES_NAME,
    Key: id + "/" + FileName,
    ContentType: ContentType,
  };

  try {
    const url = await getSignedUrl(
      s3Client,
      new PutObjectCommand(bucketParams),
      { expiresIn: 15 * 60 }
    );
    return { url, key: id + "/" + FileName };
  } catch (err) {
    console.log("Error", err);
    throw new Error();
  }
}

const services = {
  generateGetUrl,
  generatePutUrl,
};

export default services;
