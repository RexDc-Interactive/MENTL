const Commando = require('discord.js-commando')

const Discord = require('discord.js')

const config = require('@root/config.json')

//const bot = new Discord.Client()

var prefix = config.prefix

var PrefixLength = prefix.length;

const bans = require('@utilities/bans')


module.exports = class UnBanCommand extends Commando.Command {
    constructor(client) {
        super(client, {
          name: 'unban',
          group: 'moderation',
          memberName: 'unban',
          description: 'Unban a user by their ID',
          userPermissions: ['BAN_MEMBERS'],
          clientPermissions: ['BAN_MEMBERS']
        })
    }   

    async run(message) {
        var userid = message.content.substring(PrefixLength + 6);
        if(bans.includes(userid)) {
            message.guild.members.unban(userid).then(() => {
                message.channel.send(
                    new Discord.MessageEmbed()
                        .setTitle('User Unbanned')
                        .setColor('#37393f')
                        .setDescription(`${userid} was unbanned by ${message.author}`)
                )
                .catch(err => {
                    message.reply('I was unable to unban the member due to insufficient permissions or heirachy limitation');
                    console.error(err);
                });
                })

                for( var i = 0; i < bans.length; i++){ 
                    if ( bans[i] === userid) { 
                        bans.splice(i, 1); 
                  }
                }
        }
        else {
            message.reply('The User of the ID you tried to unban isn\'t already banned')
        }
    }
}