const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config();

const app = express();


app.use(express.json());                           

// const corsOptions = {
//     origin: process.env.FRONTEND_URL, 
//     methods: 'POST',
//     allowedHeaders: 'Content-Type,Authorization',
// };

// app.use(cors(corsOptions));

const allowedOrigins = [
    process.env.FRONTEND_URL,         // Deployed frontend URL
    process.env.FRONTEND_LOCAL_URL    // Local frontend URL
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'POST',
    allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));



// app.use(cors());


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error", err));


app.use('/api/tasks', require('./routes/TaskRoutes'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});