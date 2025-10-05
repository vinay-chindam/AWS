// index.js
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import 'dotenv/config';

// ✅ Configure AWS credentials (make sure these are set securely in your environment)
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function generatePresignedUrl() {
  try {
    const command = new GetObjectCommand({
      Bucket: 'bucket.vinayc.dev', // ✅ No trailing space
      Key: 'img3', // Object key inside the bucket
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60}); // 1 hour
    console.log('✅ Presigned URL:', signedUrl);
  } catch (error) {
    console.error('❌ Error generating presigned URL:', error);
  }
}

generatePresignedUrl();
