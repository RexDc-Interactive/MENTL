const Commando = require('discord.js-commando')

const Discord = require('discord.js')

//const bot = new Discord.Client()

const bans = require('@utilities/bans')

module.exports = class HackBanCommand extends Commando.Command {
    constructor(client) {
        super(client, {
          name: 'hackban',
          group: 'moderation',
          memberName: 'hackban',
          description: 'Ban a user thats not on the server by their ID',
          userPermissions: ['BAN_MEMBERS'],
          clientPermissions: ['BAN_MEMBERS']
        })
    }   

    async run(message) {
        var userID = message.content.substring(PrefixLength + 8);
        if (!userID) {
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('HackBan Failed')
                    .setColor('#37393f')
                    .setDescription('You forgot to mention someone!')
            );
        } else if (userID == message.author.id) {
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('HackBan Failed')
                    .setColor('#37393f')
                    .setDescription('Woooah! Why did you try to do that? You can\'t hackban yourself, now that would be stupid!')
            );
        } else if (userID == client.user.id) {
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('Ban Failed')
                    .setColor('#37393f')
                    .setDescription('Woooah! Why did you try to do that? You can\'t hackban me, I\'m still on the server silly!')
                )
        } else {
            client.users.fetch(userID).then(async user => {
                await message.guild.members.ban(user.id);
                message.channel.send(
                    new Discord.MessageEmbed()
                        .setTitle('Member Hack Banned')
                        .setColor('#37393f')
                        .setDescription(`${user.tag} has been banned from outside this server by ${message.author}`)
                )
                .catch(err => {
                    message.reply('I was unable to ban the user outside the server');
                    console.error(err);
                });
            })
                
            bans.push(userID)
        }
    }
}
