require('dotenv').config();
const express = require('express');
const sequelize = require('./Config/DataBase/Config');

// Init Routes
const verification = require('./Routes/Verification');
const authRoutes = require('./Routes/Auth');
const profileRoutes = require('./Routes/Profile');
const companyRoutes = require('./Routes/Company');

// Init App
const app = express()
const port = process.env.PORT || 5001

// Use default helpers for app
app.use(require('cors')());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Use Routes
app.use('/api', verification);
app.use('/api', authRoutes);
app.use('/api', profileRoutes);
app.use('/api', companyRoutes);

app.use((error, req, res, next) => {
    console.log('Error status:', error.status);
    console.log('Message:', error.message);

    res.status(error.status).send({
        status: error.status,
        message: error.message,
        stack: error.stack
    })
})

// Check database and start server
const checkDatabase = async () => {
    await sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch((error) => {
            console.error('Unable to connect to the database:', error);
        })
}

app.listen(port, async () => {
    checkDatabase().then(() => {
        console.log(`Server is running on port ${port}`);
    })
})


