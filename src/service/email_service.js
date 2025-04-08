const sender = require('../config/email_config')
const sendBasicMail = (mailfrom, mailto, mailsubject, mailbody) => {
    sender.sendMail({
        from: mailfrom,
        to: mailto,
        subject: mailsubject,
        text: mailbody
    })
}
module.exports = {
    sendBasicMail
}