const Commando = require('discord.js-commando')

const Discord = require('discord.js')

//const bot = new Discord.Client()

const ownership = require('@utilities/ownership.json')

const banlist = require('@utilities/bans')


module.exports = class ServerInfoCommand extends Commando.Command {
    constructor(client) {
        super(client, {
          name: 'banlist',
          group: 'general',
          memberName: 'banlist',
          description: 'Show list of banned users/ID\'s',
          hidden: true,
        })
    }   

    async run(message) {
        if (
			message.author.id == ownership.BotOwnersIDs[0] ||
			message.author.id == ownership.BotOwnersIDs[1]
        ) {
            message.channel.send(
		        new Discord.MessageEmbed()
		            .setTitle('MENTL Banlist')
			        .setDescription(`List of ID\'s banned:\n ${banlist}`)
                    .addField('Support Invite', 'https://discord.gg/VPEgfjnzrV')
				    .setFooter(`Bot by ${ownership.BotOwners}`)
		    )
        }
    }   
}
