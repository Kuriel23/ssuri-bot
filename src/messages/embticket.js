const discord = require('discord.js');

module.exports = async (client, message) => {
	message.delete();
	const row = new discord.ActionRowBuilder().addComponents(
		new discord.ButtonBuilder()
			.setCustomId('ticket')
			.setEmoji('📨')
			.setLabel('Criar ticket')
			.setStyle(discord.ButtonStyle.Secondary),
	);
	const embed = new discord.EmbedBuilder()
		.setColor(client.cor)
		.setTitle('Precisa de ajuda? Abra um ticket no botão abaixo!');
	message.channel.send({ embeds: [embed], components: [row] });
};

