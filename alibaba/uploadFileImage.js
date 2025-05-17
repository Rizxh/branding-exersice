import OSS from "ali-oss";

// Initialize OSS client
const client = new OSS({
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
  accessKeySecret: process.env.NEXT_PUBLIC_ACCESS_KEY_SECRET,
  region: "oss-ap-southeast-5", // e.g., 'oss-cn-hangzhou'
  bucket: "xion1",
});

// Function to upload file
async function uploadFile(file, originalFilename) {
  try {
    const result = await client.put("/media/photo/" + `${originalFilename}`, file);
    console.log("Upload successful:", result);
    return result;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
}

export default uploadFile;
