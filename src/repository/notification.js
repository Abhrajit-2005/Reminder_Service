const { Notification } = require('../models/index')
const { Op } = require('sequelize')

class NotificationRepo {

    async createNoti(data) {
        try {
            const response = await Notification.create(data);
            return response;
        } catch (error) {
            console.log(error);
        }

    }

    async getNoti(filter) {
        try {
            const response = await Notification.findAll({
                where: {
                    status: filter.status,
                    notificationTime: {
                        [Op.lte]: new Date()
                    }
                }
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async updateNoti(notiID, data) {
        try {
            const noti = await Notification.findByPk(notiID);
            if (data.status) {
                noti.status = data.status;
            }
            await noti.save();
            return noti;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = NotificationRepo