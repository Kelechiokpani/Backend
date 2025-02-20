import cloudinary from 'cloudinary';
import multer from 'multer';
cloudinary.v2.config({
    cloud_name: 'dkvs0j2iy',
    api_key: '177457656671433',
    api_secret: 'eKIs5bA8Mut1ZfYrX2LXdCLp9vM',
});
const storage = multer.memoryStorage();
// async function imageUploadUtil(file: Express.Multer.File): Promise<cloudinary.UploadApiResponse> {
//     const result = await cloudinary.v2.uploader.upload(file.buffer, {
//         resource_type: 'auto',
//     });
//
//     return result;
// }
// const upload = multer({ storage });
// export { upload, imageUploadUtil };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWRpbmFyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oZWxwZXJzL2Nsb3VkaW5hcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxVQUFVLE1BQU0sWUFBWSxDQUFDO0FBQ3BDLE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUU1QixVQUFVLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUNqQixVQUFVLEVBQUUsV0FBVztJQUN2QixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFVBQVUsRUFBRSw2QkFBNkI7Q0FDNUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO0FBRXZDLHFHQUFxRztBQUNyRyx3RUFBd0U7QUFDeEUsaUNBQWlDO0FBQ2pDLFVBQVU7QUFDVixFQUFFO0FBQ0YscUJBQXFCO0FBQ3JCLElBQUk7QUFFSixzQ0FBc0M7QUFFdEMsc0NBQXNDIn0=