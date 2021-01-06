const Commando = require('discord.js-commando')

const Discord = require('discord.js');

const bot = new Discord.Client()

module.exports = class LatencyCommand extends Commando.Command {
    constructor(client) {
        super(client, {
          name: 'latency',
          group: 'info',
          memberName: 'latency',
          description: 'Display the Latacy/Ping of the Bot and the API',
          clientPermissions: ['MANAGE_MESSAGES']
        })
    }   

    async run(message) {
        message.reply('Calculating ping...').then(resultMessage => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp

            resultMessage.edit(`Bot Latency: ${ping}, API Latency: ${message.client.ws.ping}`)

            message.delete()
        })
    }
}