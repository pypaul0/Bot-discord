const Discord = require('discord.js')
module.exports = {
	name: 'message',
	execute(message, client) {
        if (message.author.bot) return
        const {prefix} = client
        const args = message.content.slice(prefix.length).trim().split(/ +/)
        const commandName = args.shift().toLowerCase()
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
        
        if (!command || !message.content.startsWith(prefix)) return
    
        if (command.guildOnly && message.channel.type == 'dm') {
            return message.channel.send('Só posso fazer isso em servidores =/')
        }
    
        if (command.permissions) {
            const authorPerms = message.channel.permissionsFor(message.author)
            if (!authorPerms || !authorPerms.has(command.permissions)) {
                return message.reply('Você não pode fazer isso :angry:')
            } 
        }
    
        if (command.args && !args.length) {
            let reply = `${message.author}, você precisa me dar os arumentos`
        
            if (command.usage) {
                reply += `\nÉ assim que usa esse comando: \`${prefix}${command.name} ${command.usage}\``
            }
        
            return message.channel.send(reply)
        }
        const { cooldowns } = client
    
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection())
        }
        
        const now = Date.now()
        const timestamps = cooldowns.get(command.name)
        const cooldownAmount = (command.cooldown || 3) * 1000
        
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount
    
            if (now < expirationTime) {
    
                const timeLeft = (expirationTime - now) / 1000
                return message.reply(`Por favor espere ${timeLeft.toFixed(0)}s para usar o comando: \`${command.name}\``)
            }
        }
            
        timestamps.set(message.author.id, now)
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

        client.embed = new Discord.MessageEmbed()
            .setColor('#FF6400')
            .setFooter('Criadores: @weaast e @jubstlgd\nIcon: @neko')
            .setTimestamp()
    
        try {
            command.execute(message, args, client, prefix)
        } catch (error) {
            console.error(error)
            message.reply('Algo deu errado =/')
        }
	},
};