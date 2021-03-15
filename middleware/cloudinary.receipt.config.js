const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const {
  CLOUDINARY_HOST,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_PROFILE_FOLDER,
} = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_HOST,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

//format image
cloudinary.image((req, file) => file.filename, {
  transformation: [
    { width: 600, crop: 'scale' },
    { quality: 'auto', fetch_format: 'auto' },
  ],
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: CLOUDINARY_PROFILE_FOLDER,
    format: async () => 'png',
    public_id: (req, file) => file.filename,
    transformation: [
      { width: 600, crop: 'scale' },
      { quality: 'auto', fetch_format: 'auto' },
    ],
  },
});

const parser = multer({ storage: storage });

module.exports = parser;
