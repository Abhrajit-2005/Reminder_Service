const express = require('express')
const bodyParser = require('body-parser')
const { PORT } = require('./config/server_config')
const { createNoti } = require('./controller/email_controller')
const jobs = require('./utils/job');
const { subscribe, createChannel } = require('./utils/messageQueue')
const emailService = require('./service/email_service')
const { REMINDER_BINDING_KEY } = require('./config/server_config')

const startserver = async () => {
    const app = express();

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.post('/api/v1/notis', createNoti);


    const channel = await createChannel();
    subscribe(channel, emailService.subscribeEvents, REMINDER_BINDING_KEY);

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
        jobs();
    })
}
startserver()