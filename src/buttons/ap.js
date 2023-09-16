module.exports = async (client, interaction) => {
	interaction
		.reply({
			content: `Esta parceria foi aceite por <@${interaction.member.id}>!`,
		})
		.then(msg => {
			setTimeout(() => {
				msg.delete();
				interaction.message.delete();
			}, 300000);
		});
	client.channels.cache
		.get('957686890121814076')
		.send(
			interaction.message.content
				.toString()
				.replace(/`+/g, '')
				.replace('<@&857100607030820884>', '') +
				' <@&857100606232985640>',
		);
	client.channels.cache
		.get('1149699182202982450')
		.send(
			`${
				interaction.member
			} aceitou uma parceria em **${new Date().toUTCString()}**`,
		);
	try {
		const idRegex = /<@([0-9]+)>/;
		const id =
			interaction.message.content
				.toString()
				.replace(/`+/g, '')
				.replace('<@&857100607030820884>', '') +
			' <@&857100606232985640>'.match(idRegex)[0];
		const user = interaction.guild.members.fetch({
			id,
			force: true,
			cache: false,
		});
		const role = interaction.guild.roles.cache.find(
			role => role.id === '957691174989209670',
		);
		user.roles.add(role);
	} catch (err) {
		if (err) return 0;
	}
};

