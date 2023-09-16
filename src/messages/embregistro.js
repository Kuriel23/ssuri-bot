const discord = require('discord.js');

module.exports = async (client, message) => {
	await message.channel.send({
		embeds: [
			{
				title: 'Registro Geral - Toca dos Suricatos',
				description:
					'*__~ Olá Usuário(a), seja bem vindo ao servidor Toca dos Suricatos. ~__*\n\n*__・Antes de explorar a comunidade e se divertir com seus amigos, pedimos para que você realize um breve registro, apenas selecionando cargos de seu interesse, assim deixando seu perfil mais organizado e bonito.__*',
				image: {
					url: 'https://i.imgur.com/aiDrMDi.jpeg',
				},
				fields: [
					{
						name: 'Seleção de Gênero',
						value: '*Por gentileza, pedimos para que você selecione um gênero, sendo eles @Homem ou @Mulher*\n\n**Selecione o emote (:mens:) caso você seja @Homem**\n\n**Selecione o emote (:womens:) caso você seja @Mulher**',
						inline: false,
					},
				],
			},
		],
		components: [
			new discord.ActionRowBuilder().addComponents(
				new discord.ButtonBuilder()
					.setCustomId('1134310024873775135')
					.setEmoji('🚹')
					.setStyle(discord.ButtonStyle.Primary),
				new discord.ButtonBuilder()
					.setCustomId('1134310133271363664')
					.setEmoji('🚺')
					.setStyle(discord.ButtonStyle.Success),
			),
		],
	});
	await message.channel.send({
		embeds: [
			{
				title: '• Sexualidade (Pessoal)',
				description:
					'*Por gentileza, escolha sua sexualidade, sendo elas a comunidade @LGBTQIA+ ou @Hetero :*\n\n*** • Selecione o emote (:axe:) caso sua sexualidade seja @Hetero.*** \n\n***• Selecione o emote (:rainbow_flag:) caso sua sexualidade seja @LGBTQIA+.***',
				image: {
					url: 'https://i.imgur.com/pn7p0BT.jpeg',
				},
			},
		],
		components: [
			new discord.ActionRowBuilder().addComponents(
				new discord.ButtonBuilder()
					.setCustomId('1134310321440444456')
					.setLabel('🏳‍🌈')
					.setStyle(discord.ButtonStyle.Danger),
				new discord.ButtonBuilder()
					.setCustomId('1134310385797828759')
					.setEmoji('🪓')
					.setStyle(discord.ButtonStyle.Secondary),
			),
		],
	});
	await message.channel.send({
		embeds: [
			{
				title: '• Idade (Geral)',
				description:
					'*Por gentileza, escolha sua Idade, sendo elas definidas entre @-18  ou @+18:*\n\n*** • Selecione o emote (:wine_glass:) caso sua idade seja @+18.***\n\n***• Selecione o emote (:milk:) caso sua sexualidade seja @-18 .***',
				image: {
					url: 'https://i.imgur.com/aM0bVol.jpeg',
				},
			},
		],
		components: [
			new discord.ActionRowBuilder().addComponents(
				new discord.ButtonBuilder()
					.setCustomId('1134310262086844507')
					.setEmoji('🍷')
					.setStyle(discord.ButtonStyle.Success),
				new discord.ButtonBuilder()
					.setCustomId('1134310215853031435')
					.setEmoji('🥛')
					.setStyle(discord.ButtonStyle.Danger),
			),
		],
	});
	await message.channel.send({
		embeds: [
			{
				title: '• Estado Civil (Pessoal)',
				description:
					'*Por gentileza, escolha seu estado civil, sendo eles @Solteiro, @Enrolado, @Namorando, @Casado :*\n\n*** • Selecione o emote (:person_standing:) caso seu estado civil seja @Solteiro.***\n\n***• Selecione o emote (:fire:) caso seu estado civil seja @Enrolado.***\n\n ***• Selecione o emote (:couple_with_heart_woman_man:) caso seu estado civil seja @Namorando.***\n\n***• Selecione o emote (:ring:) caso seu estado civil seja @Casado.***',
				image: {
					url: 'https://i.imgur.com/UmOrhQI.jpeg',
				},
			},
		],
		components: [
			new discord.ActionRowBuilder().addComponents(
				new discord.ButtonBuilder()
					.setCustomId('1134310545743417414')
					.setEmoji('🧍')
					.setStyle(discord.ButtonStyle.Primary),
				new discord.ButtonBuilder()
					.setCustomId('1134310464843698236')
					.setEmoji('🔥')
					.setStyle(discord.ButtonStyle.Secondary),
				new discord.ButtonBuilder()
					.setCustomId('1134310576454119525')
					.setEmoji('💑')
					.setStyle(discord.ButtonStyle.Success),
				new discord.ButtonBuilder()
					.setCustomId('1134310489439096832')
					.setEmoji('💍')
					.setStyle(discord.ButtonStyle.Danger),
			),
		],
	});
	message.delete();
};
