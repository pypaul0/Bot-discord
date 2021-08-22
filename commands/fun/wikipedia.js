module.exports = {
    name: 'wikipedia',
    description: 'Pagina aleatoria da Wikipedia',
    usage: '',
    execute(message, args) {
        const link = `https://pt.wikipedia.org/wiki/${args.join('_')}`
        message.channel.send(link)
    }
}