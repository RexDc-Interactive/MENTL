const Commando = require('discord.js-commando')

const Discord = require('discord.js')

//const bot = new Discord.Client()

module.exports = class UnMuteCommand extends Commando.Command {
    constructor(client) {
        super(client, {
          name: 'unmute',
          group: 'moderation',
          memberName: 'unmute',
          description: 'Remove Muted role from a specific member',
          userPermissions: ['MANAGE_ROLES'],
          clientPermissions: ['MANAGE_ROLES']
        })
    }   

    async run(message) {
        var target = message.mentions.members.first();
        var role = message.guild.roles.cache.find(role => role.name === "Muted");
        if (role) {
            target.roles.remove(role).then(
            message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('User Unmuted')
                    .setColor('#37393f')
                    .setDescription(`${target} was Unmuted by ${message.author}`))
            )
            .catch(err => {
                message.reply('I was unable to unmute the member due to insufficient permissions or heirachy limitation');
                console.error(err);
            })
        }
    }
}