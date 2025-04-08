const NotiService = require('../service/email_service')

const createNoti = async (req, res) => {
    try {
        const response = await NotiService.createNoti(req.body);
        return res.status(201).json({
            data: response,
            success: true,
            err: {},
            message: 'Notification registered successfully'
        })
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            err: error,
            message: 'failed to register a notification'
        })
    }
}

module.exports = {
    createNoti,
}