// index.js
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import 'dotenv/config';

// ✅ AWS S3 Client Configuration
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// ✅ Generate Presigned URL for GET (Download)
async function generatePresignedGetUrl() {
  try {
    const command = new GetObjectCommand({
      Bucket: 'bucket.vinayc.dev',
      Key: 'vidoe1', // Object to download
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 }); // 1 hour
    console.log('✅ Presigned GET URL:', signedUrl);
  } catch (error) {
    console.error('❌ Error generating GET URL:', error);
  }
}

// ✅ Generate Presigned URL for PUT (Upload)
async function generatePresignedPutUrl() {
  try {
    const command = new PutObjectCommand({
      Bucket: 'bucket.vinayc.dev',
      Key: 'vidoe1', // Object to upload
      ContentType: 'video/mp4', // Optional: specify content type
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300 }); // 5 minutes
    console.log('✅ Presigned PUT URL:', signedUrl);
  } catch (error) {
    console.error('❌ Error generating PUT URL:', error);
  }
}

// ✅ Run Both
generatePresignedGetUrl();
//generatePresignedPutUrl();
