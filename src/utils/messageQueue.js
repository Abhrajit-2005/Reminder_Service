const amqplib = require('amqplib');
const { MESSAGE_BROKER_URL, EXCHANGE_NAME, REMINDER_BINDING_KEY } = require('../config/serverConfig');

const createChannel = async () => {
    try {
        const connection = await amqplib.connect(MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME, 'direct', false);
        return channel;
    } catch (error) {
        throw error;
    }
}

const subscribe = async (channel, service, REMINDER_BINDING_KEY) => {
    try {
        const applicationQueue = await channel.assertQueue('REMINDER_QUEUE');

        channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, REMINDER_BINDING_KEY);

        channel.consume(applicationQueue.queue, msg => {
            console.log('received data');
            console.log(msg.content.toString());
            const payload = JSON.parse(msg.content.toString());
            service(payload);
            channel.ack(msg);
        });
    } catch (error) {
        throw error;
    }

}

const publish = async (channel, REMINDER_BINDING_KEY, message) => {
    try {
        await channel.assertQueue('REMINDER_QUEUE');
        await channel.publish(EXCHANGE_NAME, REMINDER_BINDING_KEY, Buffer.from(message));
    } catch (error) {
        throw error;
    }
}

module.exports = {
    subscribe,
    createChannel,
    publish
}