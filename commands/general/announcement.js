const Commando = require('discord.js-commando')

const config = require('@root/config.json')

const Discord = require('discord.js')

const bot = new Discord.Client()

var PrefixLength = config.prefix.length;

module.exports = class AnnouncementCommand extends Commando.Command {
    constructor(client) {
        super(client, {
          name: 'announcement',
          group: 'general',
          memberName: 'announcement',
		  description: 'Send an announcement to current channel',
		  hidden: true,
		  ownerOnly: true
        })
    }   

    async run(message) {
		var announcementContent = message.content.substring(PrefixLength + 13);
		message.delete().then(() => {
			message.channel.send(
				new Discord.MessageEmbed()
					.setTitle('Announcement')
					.setColor('#37393f')
					.setDescription(announcementContent)
					.setFooter(
						`Announcement by ${message.author.username}#${
						message.author.discriminator
						}`
					)
			);
		})
    }
}