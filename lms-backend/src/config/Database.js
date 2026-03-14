// Database configuration
import mongoose from 'mongoose'
export const connectDatabase = async () => {
    try {
        const mongoURI = 'mongodb://localhost:27017/'
        console.log('Connecting to MongoDB....');
        await mongoose.connect(mongoURI, {

        });
        console.log('MongoDB connected successfully');
        console.log('Database: ${mongoose.connection.name}');
    }
    catch(error){
        console.error('MongoDB connection failed:', error.message);
    }
};

// Disconnect from MongoDB

export const disconnectDatabase = async() => {
    try {
        await mongoose.disconnect();
        console.log('MongoDB disconnected');
    }
    catch(error){
        console.error('Error disconnecting:', error.message);
    }
};

// Handle shutdown
process.on('SIGINT', async () => {
    await disconnectDatabase();
    process.exit(0);
});
    