const { Message } = require("discord.js")

module.exports = {
	name: 'ping',
	usage: '',
	description: 'ping? pong!',
	aliases: ['ping?'],
	execute(message, args) {
		message.channel.send('Pong').then(sent => {
			sent.edit(`Ping: ${sent.createdTimestamp - message.createdTimestamp}ms`);
		});
	}
}