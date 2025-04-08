const express = require('express')
const bodyParser = require('body-parser')
const { PORT } = require('./config/server_config')
const { sendBasicMail } = require('./service/email_service')
const startserver = () => {
    const app = express();

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
        sendBasicMail(
            'support@admin.com',
            'avays1421@gmail.com',
            'Test Mail',
            'HELLO, THIS IS A TEST MAIL'
        )
    })
}
startserver()