const mongoose = require("mongoose");

const connectDB= async () => {
    try{
        const connect = await  mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://fiveaces2001:yb37ZYlJKb2dAeeq@thambawitacluster.nlb9e.mongodb.net/?retryWrites=true&w=majority&appName=thambawitacluster');
        console.log('MongoDB Connected');
    }catch (error) {
console.log(error)
process.exit(1)
    }
};


module.exports = connectDB


//use this function in sever.js to connect to mongoDB and start the server

// Start the server with MongoDB connection
// const startServer = async () => {
//     try {
//         await connectDB();
//         app.listen(PORT, () => {
//             console.log(`Server running on port ${PORT}`);
//         });
//     } catch (error) {
//         console.log(error);
//     }
// };

// startServer();