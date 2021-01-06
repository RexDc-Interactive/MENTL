const Commando = require('discord.js-commando')

const Discord = require('discord.js')

//const bot = new Discord.Client()

const ownership = require('@utilities/ownership.json')

module.exports = class CommandsCommand extends Commando.Command {
    constructor(client) {
        super(client, {
          name: 'cmds',
          group: 'general',
          memberName: 'cmds',
          description: 'Shows a list of my commands'
        })
    }   

    async run(message) {
        message.channel.send(
			new Discord.MessageEmbed()
				.setTitle('MENTL Commands')
				.setDescription('These are the commands I can do:')
                .addField('My Prefix', '`.`')
                .addField('cmds', 'Display this menu')
                .addField('support', 'Join our Support server')
                .addField('setup', 'Find out how to setup the bot')
                .addField('announcement', 'Send an announcement to current channel')
                .addField('slowmode', 'Toggle Slowmode on current channel')
                .addField('mute', 'Add Muted role to a specific member')
                .addField('kick','Kick the mentioned member')
                .addField('ban','Ban the mentioned member')
                .addField('unmute', 'Remove Muted role from a specific member')
                .addField('unban','Unban a user by their ID')
                .addField('hackban', 'Ban a user thats not on the server by their ID')
				.setFooter(`Bot by ${ownership.BotOwners}`)
		);
    }
}