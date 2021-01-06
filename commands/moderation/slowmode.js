const Commando = require('discord.js-commando')

const config = require('@root/config.json')

const Discord = require('discord.js')

//const bot = new Discord.Client()

var PrefixLength = config.prefix.length;

module.exports = class SlowmodeCommand extends Commando.Command {
    constructor(client) {
        super(client, {
          name: 'slowmode',
          group: 'moderation',
          memberName: 'slowmode',
          description: 'Toggle Slowmode on current channel',
          userPermissions: ['MANAGE_CHANNELS'],
          clientPermissions: ['MANAGE_CHANNELS']
        })
    }   

    async run(message) {
        let arg = message.content.substring(PrefixLength + 9);
        if (!arg) {
            message.reply('Enter a ratelimit or \"0\" to turn off slowmode')
        }
        else if (arg != 0) {
            message.channel.setRateLimitPerUser(arg)
            message.channel.send(
                new Discord.MessageEmbed()
                .setTitle('Channel Slowmode Enabled')
                .setColor('#37393f')
                .setDescription(`${message.channel} had slowmode set to ${arg} by ${message.author}`))
        }
        else if (arg == 0){
            message.channel.setRateLimitPerUser(0)
            message.channel.send(
                new Discord.MessageEmbed()
                .setTitle('Channel Slowmode Disabled')
                .setColor('#37393f')
                .setDescription(`${message.channel} had slowmode turned off by ${message.author}`))
        }
    }
}