const express = require('express');
const mongoose = require('mongoose');

const config = require('./config');
const app = express();

const UserRoutes = require('./routes/UserRoutes');

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());

app.use(UserRoutes);

const run = async () => {
    try {
        await mongoose.connect(config.DB, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        app.listen(config.PORT, () => {
            console.log(`Connected on port ${config.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

run();
