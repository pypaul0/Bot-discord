module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('Juninho iniciado')
    await client.user.setActivity({
        name: `${client.guilds.cache.size} servidores!`,
        type: 'WATCHING'
    })
    .then(console.log('Status definido'))
    .catch(console.error)

    await client.user.setPresence({
        status: 'dnd'
    })
    .then(console.log('Presença definido'))
    .catch(console.error)
    }
}