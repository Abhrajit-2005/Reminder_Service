const express = require('express')
const bodyParser = require('body-parser')
const { PORT } = require('./config/server_config')
const { createNoti } = require('./controller/email_controller')
const jobs = require('./utils/job');

const startserver = () => {
    const app = express();

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.post('/api/v1/notis', createNoti);

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
        jobs();
    })
}
startserver()