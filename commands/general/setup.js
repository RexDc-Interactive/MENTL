const Commando = require('discord.js-commando')

const ownership = require('@utilities/ownership.json')

const Discord = require('discord.js')

//const bot = new Discord.Client()

module.exports = class SetupCommand extends Commando.Command {
    constructor(client) {
        super(client, {
          name: 'setup',
          group: 'general',
          memberName: 'setup',
          description: 'Find out how to setup the bot'
        })
    }   

    async run(message) {
        message.channel.send(
			new Discord.MessageEmbed()
				.setTitle('MENTL Setup')
				.addField('1.','Create "Muted" role and remove "Send Messages" permission')
                .addField('2.','If You Experience Any Issues Run ".support"')
				.setFooter(`Bot by ${ownership.BotOwners}`)
		);
    }
}



