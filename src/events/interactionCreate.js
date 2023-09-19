module.exports = (client, interaction) => {
	if (interaction.isButton()) {
		const actions = {
			abraçar: 'hug',
			beijar: 'kiss',
			matar: 'kill',
			bater: 'punch',
			tapa: 'slap',
		};

		for (const [key, value] of Object.entries(actions)) {
			if (interaction.customId.startsWith(key)) {
				return require('../buttons/' + value)(client, interaction);
			}
		}
		try {
			if (/^\d{19}$/.test(interaction.values[0])) {
				const role = interaction.guild.roles.cache.get(
					interaction.values[0],
				);
				if (interaction.member.roles.cache.has(role.id)) {
					interaction.member.roles.remove(role);
					interaction.reply({
						content: `Removido <@&${role.id}> com sucesso.`,
						ephemeral: true,
					});
				} else {
					interaction.reply({
						content: `Adicionado <@&${role.id}> com sucesso.`,
						ephemeral: true,
					});
					interaction.member.roles.add(role);
				}
			} else
				require('../buttons/' + interaction.customId)(
					client,
					interaction,
				);
		} catch (err) {
			require('../buttons/' + interaction.customId)(client, interaction);
		}
	}
	if (interaction.isChatInputCommand()) {
		const command = client.commands.get(interaction.commandName);
		if (!command) return;
		try {
			command.execute(interaction, client);
		} catch (err) {
			if (err) console.error(err);
			const emberror = new discord.EmbedBuilder()
				.setTitle('Erro encontrado!')
				.setColor(client.cor);
			interaction.reply({ embeds: [emberror] });
		}
	}
};
