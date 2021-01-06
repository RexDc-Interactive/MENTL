const Commando = require('discord.js-commando')

const Discord = require('discord.js')

//const bot = new Discord.Client()

module.exports = class ServerInfoCommand extends Commando.Command {
    constructor(client) {
        super(client, {
          name: 'serverinfo',
          group: 'info',
          memberName: 'serverinfo',
          description: 'Shows Info about the current server',
          clientPermissions: ['MANAGE_MESSAGES']
        })
    }   

    async run(message) {
        let guild = message.guild
        let roles = guild.roles.cache.map(q => q)
        let roleslist = roles.join(",")
        let embed = new Discord.MessageEmbed()
            .setTitle(`${guild.name}'s Information`)
            .setColor("#985986")  
            .addField("Guild Acryonym", `${guild.nameAcronym}`, true)
            .addField("Guild Name", `${guild.name}`, true) 
            .addField("Full Username of Owner", `${guild.owner.user.tag}`, true) 
            .addField("Nick of Owner", `${guild.owner.nickname}`)
            .addField("Total Number of Members", `${guild.memberCount}`, true)
            .addField("Number of Users", `${guild.memberCount - guild.members.cache.filter(m=>m.user.bot).size}`, true)
            .addField("Number of Bots", `${guild.members.cache.filter(m=>m.user.bot).size}`, true)
            .addField("Name of System Channel", `${guild.systemChannel}`)
            .addField("Roles in Guild", `${roleslist}`)      
            .addField("Rules Channel", guild.rulesChannel, true)
            .addField("Verification Level", guild.verificationLevel, true)
            .setFooter(`Requested by ${message.author.username}`)

        message.delete()
        message.channel.send(embed);

        return;
    }
}