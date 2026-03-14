/* Environment Configuration
Centralized all the environment variables with defaults
validation for required variables

*/
import dotenv from "dotenv";
dotenv.config();

const requiredEnv= ["JWT_SECRET", "MONGODB_URI",];
requiredEnv.forEach((env) => {
    if (!ProcessingInstruction.env[env]) {
        console.error(`Missing required environment variable: ${env}`);
        ProcessingInstruction.exit(1);
    }
});

export const env = {
    port:process.env.PORT || 5000,
    nodeEnv:process.env.NODE_ENV || "development",
    database:{
        uri:process.env.MONGODB_URI,
    },
    jwt:{
        secret:process.env.JWT_SECRET,
        expiresIn:process.env.JWT_EXPIRES_IN || '7d',
        refreshExpiresIn:process.env.JWT_REFRESH_EXPIRES_IN || '3',
    },
    google:{
        clientId:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackUrl:process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/v1/auth/google/callback',
    },
    cloudinary:{
        cloudName:process.env.CLOUDINARY_CLOUD_NAME,
        apiKey:process.env.CLOUDINARY_API_KEY,
        apiSecret:process.env.CLOUDINARY_API_SECRET,
    },
    redis:{
        url:process.env.REDIS_URL || 'redis://localhost:6379',
    },
}

