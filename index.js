require('module-alias/register')

const path = require('path')

const Commando = require('discord.js-commando')

const config = require('@root/config.json')

const client = new Commando.CommandoClient({
  owners: ['596773775404564481', '587027843301507073'],
  commandPrefix: config.prefix,
})

client.on('ready', () => {
    console.log('The client is ready')

     client.registry
      .registerGroups([
        ['general', 'General Commands'],
        ['info', 'Info Commands'],
        ['moderation', 'Moderation Commands'],
        ['misc', 'Misc Commands']
        
      ])
      .registerDefaults()
      .registerCommandsIn(path.join(__dirname, 'commands'))
})

client.login(config.token)