require("dotenv").config();


const ENV = process.env.NODE_ENV || "development";

const CONFIG = {
  development: {
    app: {
      PORT: process.env.PORT || 4001,
    },
    db: {
      uri: process.env.MONGODB_URL,
    },
    cloudinary: {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    }
  },
  production: {
    app: {
      PORT: process.env.PORT || 4001,
    },
    db: {
      uri: process.env.MONGODB_URL,
    },
    cloudinary: {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    }
    
  },
};

module.exports = CONFIG[ENV];