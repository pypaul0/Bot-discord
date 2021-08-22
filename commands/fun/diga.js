const Discord = require('discord.js')
module.exports = {
    name: 'diga',
    description: 'Ele vai falar o que você quer que ele fale',
    usage: '[messagem]',
    aliases: ['fale'],
    execute(message, args, client) {
        message.delete()
        if (message.mentions.channels.size) {
            const id = message.mentions.channels.first().id
            const channel = client.channels.cache.get(id)
            return channel.send(args.join(' ').slice(args[0].length))
            }
         else {      
            return message.channel.send(`${args.join(' ')}`)
        }
    }
}