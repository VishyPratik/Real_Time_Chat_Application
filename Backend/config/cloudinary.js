/*require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY);
console.log(
    "API Secret:",
    process.env.CLOUDINARY_API_SECRET ? "Available" : "Missing");
const uploadOnCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto"
        });

        console.log("Cloudinary Upload Success:", result.secure_url);

        return result.secure_url;
    } catch (error) {
        console.log("Cloudinary Upload Error:", error);
        return null;
    }
};

module.exports = {
    uploadOnCloudinary
};
*/

/*cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})*/