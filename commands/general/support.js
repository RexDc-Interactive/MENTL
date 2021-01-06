const Commando = require('discord.js-commando')

const Discord = require('discord.js')

//const bot = new Discord.Client()

const ownership = require('@utilities/ownership')


module.exports = class SupportCommand extends Commando.Command {
    constructor(client) {
        super(client, {
          name: 'support',
          group: 'general',
          memberName: 'support',
          description: 'Join our Support server'
        })
    }   

    async run(message) {
        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('MENTL Support')
                .setDescription('Reasons To Contact: \n- Permissions \n- Questions')
                .addField('Support Invite', 'https://discord.gg/VPEgfjnzrV')
                .setFooter(`Bot by ${ownership.BotOwners}`)
        );
    }
}


