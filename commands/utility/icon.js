module.exports = {
    name: 'icon',
    description: 'mostra o icon.',
    usage: '@user [opcional]',
    aliases: ['avatar', 'pfp'],
    execute(message, args) {
        if (!args.length){
            return message.channel.send(message.author.displayAvatarURL({
                format: 'png',
                dynamic: true,
                size: 1024
            })
        )}
        const iconList = message.mentions.users.map(user => {
            return `${user.displayAvatarURL({ format: 'png', 
            dynamic: true, 
            size:4096 })}`
        });
        message.channel.send(iconList)
    }
}