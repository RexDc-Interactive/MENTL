const Commando = require('discord.js-commando')

const Discord = require('discord.js')

const bot = new Discord.Client()

const ownership = require('@utilities/ownership.json')

const bans = require('@utilities/bans')

module.exports = class BanCommand extends Commando.Command {
    constructor(client) {
        super(client, {
          name: 'ban',
          group: 'moderation',
          memberName: 'ban',
          description: 'Bans mentioned member',
          userPermissions: ['BAN_MEMBERS'],
          clientPermissions: ['BAN_MEMBERS']
        })
    }   

    async run(message) {
        var target = message.mentions.members.first();
        if (!target) {
            return message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('Ban Failed')
                .setColor('#37393f')
                .setDescription('You forgot to mention someone, silly!')
            );
        } else if (target.hasPermission('ADMINISTRATOR') || target.hasPermission('BAN_MEMBERS')) {
            return message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('Ban Failed')
                .setColor('#37393f')
                .setDescription('Woooah! Why did you try to do that? You can\'t ban Staff, now that would be stupid!')
            );
        } else if (target == message.author) {
            return message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('Ban Failed')
                .setColor('#37393f')
                .setDescription('Woooah! Why did you try to do that? You can\'t ban yourself now that would be stupid!')
            );
        } else if (target == ownership.BotOwnersIDs[0] || target == ownership.BotOwnersIDs[1] && message.guild.id == 527652134452461581) {
            return message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('Ban Failed')
                .setColor('#37393f')
                .setDescription('Woooah! Why did you try to do that? You can\'t ban my owners from this discord, now that would be stupid!')
            );
        } else if (target == bot.user) {
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('Ban Failed')
                    .setColor('#37393f')
                    .setDescription('Woooah! Why did you try to do that? You can\'t ban me, thats a silly thing to do!')
            );
        } else {
            target.ban().then(() => {
            message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('Member Banned')
                    .setColor('#37393f')
                    .setDescription(`${target} was banned by ${message.author}`)
            )
            .catch(err => {           
                message.reply('I was unable to ban the member due to insufficiant permissions or heirachy limitations');
                console.error(err);
            })
            })

            bans.push(target.id)
        }
    }
}

