const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRouter = require('./routes/UserRoutes')

dotenv.config();

const app = express();

app.use(express.json());

const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.FRONTEND_LOCAL_URL
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,  // If you need to allow cookies or other credentials
    preflightContinue: false,
    optionsSuccessStatus: 204
  };

app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error", err));

// app.post('/api/user', (req, res) => {
//   res.send('Login successful');
// });

app.use('/api/user', userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));