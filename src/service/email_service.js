const sender = require('../config/email_config')
const NotificationRepo = require('../repository/notification')
const notiRepo = new NotificationRepo();

const sendBasicMail = (mailfrom, mailto, mailsubject, mailbody) => {
    sender.sendMail({
        from: mailfrom,
        to: mailto,
        subject: mailsubject,
        text: mailbody
    })
}

const fetchpendingNoti = async () => {
    try {
        const noti = await notiRepo.getNoti({ status: "PENDING" });
        return noti;
    } catch (error) {
        console.log(error);
        return [];
    }
};


const updateNoti = async (notiID, data) => {
    try {
        const response = await notiRepo.updateNoti(notiID, data);
        return response;
    } catch (error) {
        console.log(error);
    }
}


const createNoti = async (data) => {
    try {
        const response = await notiRepo.createNoti(data);
        return response;
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    sendBasicMail,
    fetchpendingNoti,
    updateNoti,
    createNoti
}