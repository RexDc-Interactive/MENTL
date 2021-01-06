const Commando = require('discord.js-commando')

const Discord = require('discord.js')

//const bot = new Discord.Client()

const ownership = require('@utilities/ownership.json')

module.exports = class KickCommand extends Commando.Command {
    constructor(client) {
        super(client, {
          name: 'kick',
          group: 'moderation',
          memberName: 'kick',
          description: 'Kicks mentioned member',
          userPermissions: ['KICK_MEMBERS'],
          clientPermissions: ['KICK_MEMBERS']
        })
    }   

    async run(message) {
        var target = message.mentions.members.first();
        if (!target) {
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('Kick Failed')
                    .setColor('#37393f')
                    .setDescription('You forgot to mention someone, silly!')
            );
        } else if (target.hasPermission('ADMINISTRATOR') || target.hasPermission('KICK_MEMBERS')) {
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('Kick Failed')
                    .setColor('#37393f')
                    .setDescription('Woooah! Why did you try to do that? You can\'t kick Staff, now that would be stupid!')
            );
        } else if (target == message.author) {
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('Kick Failed')
                    .setColor('#37393f')
                    .setDescription('Woooah! Why did you try to do that? You cant kick yourself now that would be stupid!')
            );
        } else if (target == ownership.BotOwnersIDs[0] || target == ownership.BotOwnersIDs[1] && message.guild.id == 527652134452461581) {
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('Kick Failed')
                    .setColor('#37393f')
                    .setDescription('Woooah! Why did you try to do that? You can\'t kick my owners from this discord, now that would be stupid!')
            );
        } else if (target == client.user.id) {
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('Kick Failed')
                    .setColor('#37393f')
                    .setDescription('Woooah! Why did you try to do that? You cant kick me, thats a silly thing to do!')
            );
        } else {
            target.kick().then(() => {
            message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('Member Kicked')
                    .setColor('#37393f')
                    .setDescription(`${target} was kicked by ${message.author}`)
            )
            .catch(err => {           
                message.reply('I was unable to kick the member due to insufficiant permissions or heirachy limitations');
                console.error(err);
            });
            });
        }
    }
}