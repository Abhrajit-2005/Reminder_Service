const cron = require('node-cron')
const NotiService = require('../service/email_service')
const sender = require('../config/email_config')

const setupjobs = () => {
    cron.schedule('*/1 * * * *', async () => {
        const response = await NotiService.fetchpendingNoti();
        console.log(response);
        response.forEach(email => {
            sender.sendMail({
                to: email.recipientEmail,
                subject: email.subject,
                text: email.content
            }, async (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                    await NotiService.updateNoti(email.id, { status: "SUCCESS" });
                }
            });
        });

    })
}

module.exports = setupjobs