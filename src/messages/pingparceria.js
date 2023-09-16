const discord = require('discord.js');

module.exports = async (client, message) => {
	if (message.author.id === '984046781446914049' && message.embeds.size >= 1)
		return;
	if (message.mentions.members.first() && !message.author.bot) {
		const user = message.mentions.members.first();
		const role = message.guild.roles.cache.find(
			role => role.id === '957691174989209670',
		);
		user.roles.add(role);
	}
	client.channels.cache
		.get('1149699182202982450')
		.send(
			`${
				message.author
			} aceitou uma parceria em **${new Date().toUTCString()}**`,
		);
	const embed = new discord.EmbedBuilder()
		.setColor(client.cor)
		.setImage('https://i.imgur.com/4luLhGU.png');
	message.channel.send({
		content: `<a:1_AAAAA:864033521755357214> ${
			message.author.bot ? '' : '<@&857100606232985640>'
		}`,
		embeds: [embed],
	});
};

