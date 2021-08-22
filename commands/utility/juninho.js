const Discord = require('discord.js')

module.exports = {
    name: 'juninho',
    usage: '',
    execute(message, args, client) {
  
      const { commands } = message.client
      const {embed} = client
      const data = []
      commands.map(c => data.push(c.name))
      
      embed.setTitle('Me conheça melhor!')
      .setThumbnail(client.user.displayAvatarURL())
      .addFields(
        {name: ':family_man_woman_boy: Minha familia:', value: '**Pais:** Weast e Juh\n**Tios:** Mayan, Scott, Neko,\nVegetal e Coffe\n⠀'},
        {name: ':point_right: Traços de personalidade:', value: 'Simpatico, criativo e curioso\n⠀'}
        )
      .addField(`Criado em: 0${client.user.createdAt.getDay()}/0${client.user.createdAt.getMonth()}/${client.user.createdAt.getFullYear()}`, '⠀')
      .addField(`:desktop: Servidores: ${client.guilds.cache.size}`, '⠀', true)
      .addField(`:busts_in_silhouette: Pessoas que me conhecem: ${client.users.cache.size}`, '⠀', true)
      .addField(`:keyboard: Total de comandos: ${data.length}`, '⠀')
      .addFields(
        {name: ':thumbsup: Gosto', value: 'Conversar com os amigos, ler livros, sushi, volei e tetris'},
        {name: ':thumbsdown: Não gosto', value: 'Ficar sozinho, insetos, verde, nanatsu no taizai e calor'},
      )
      message.channel.send(embed)
    }
}
