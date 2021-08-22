const Discord= require('discord.js')

module.exports = {
    name: 'help',
    description: 'informa sobre os comandos',
    aliases: ['ajuda', 'commands', 'comandos'],
    usage: '[nome do comando]',
    cooldown: 5,
    execute(message, args, client) {
        const {prefix} = client
        const {embed} = client
        const {commands} = message.client

        if (!args.length) {

            embed.setTitle('Juninho comandos!')
            embed.addField('Estes são todos os meus comandos:', commands.map(command => `**${prefix}${command.name}** ${command.usage}`).join('\n'))
            embed.addField('Juninho aulas:', `\nVoce pode usar\`${prefix}help ${this.usage}\` para saber as informações de um comando especifico!`)

            return message.author.send(embed)
            .then(() => {
                if (message.channel.type == 'dm') return
                message.reply('Enviei meus comandos na sua DM :wink:')
            }).catch(err => {
                console.error(`Não consegui enviar a mensagem pela DM de ${message.author.tag}\n`, err)
                message.reply('Não consegui mandar a mensagem pela DM =/')
            })
        }
        
        const name = args[0].toLowerCase()
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name))

        if (!command) {
            return message.reply(`O comando\`${name}\` não existe =/`)
        }
        
        embed.setTitle(command.name)
        if (command.aliases) embed.addField('**Nomes alternativos:**', command.aliases.join(', '))
        if (command.description) embed.addField('**Descrição:**', command.description)
        if (command.usage) embed.addField('**Como usar:**', `${prefix}${command.name} ${command.usage}`)

        message.channel.send(embed)
    }
}