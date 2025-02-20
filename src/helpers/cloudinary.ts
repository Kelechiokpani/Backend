import cloudinary from 'cloudinary';
import multer from 'multer';

cloudinary.v2.config({
    cloud_name: 'dkvs0j2iy',
    api_key: '177457656671433',
    api_secret: 'eKIs5bA8Mut1ZfYrX2LXdCLp9vM',
});

const storage = multer.memoryStorage();

async function imageUploadUtil(file: Express.Multer.File | any): Promise<cloudinary.UploadApiResponse> {
    const result = await cloudinary.v2.uploader.upload(file.buffer, {
        resource_type: 'auto',
    });

    return result;
}

const upload = multer({ storage });

export { upload, imageUploadUtil };
