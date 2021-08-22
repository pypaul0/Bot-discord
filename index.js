const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()
const {token} = require('./config.json')

client.prefix = '.'
client.cooldowns = new Discord.Collection()
client.commands = new Discord.Collection()

const commandFolders = fs.readdirSync('./commands')
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'))
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`)
        client.commands.set(command.name, command)
    }
}

client.on('message', msg => {
	const familia = {
		mae: '799806036730445835',
		pai: '263003719707262977',
		tios: ['653761620601733131', '478021227328569345'],
		tias: ['869268602409324576', '712443844947345450', '607734898966528002'],
	}	
	if (msg.author.id == familia.mae) {
		msg.channel.send(':dodo:')
	}
	if (msg.content.toLocaleLowerCase() == 'oi juninho') {
		const id = msg.author.id
		msg.channel.startTyping()
		setTimeout(() => {
			
			if (id == familia.mae) {
				msg.channel.send('oi mamãe')
			}
			if (id == familia.pai) {
				msg.channel.send('oi papai')
			}
			if (familia.tios.includes(id)) {
				msg.channel.send(`oi titio ${msg.author.username}`)
			}
			if (familia.tias.includes(id)) {
				msg.channel.send(`oi titia ${msg.author.username}`)
			}
		}, 500)
		msg.channel.stopTyping()
	}
})


client.login(token)