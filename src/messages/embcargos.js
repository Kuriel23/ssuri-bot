const discord = require('discord.js');

module.exports = async (client, message) => {
	await message.channel.send({
		embeds: [
			{
				image: {
					url: 'https://i.imgur.com/CQuU6yE.gif',
				},
			},
		],
	});
	await message.channel.send({
		embeds: [
			{
				url: 'https://discord.gg/tocadossuricatos',
				title: 'Cargo por Level',
				description:
					'***Nivel 0 - Suricato (atual)***\n\n***Nivel 5 - Nobre***\n\n***Nivel 10 - Explorador***\n\n***Nivel 16 - Assasino***\n\n***Nivel 25 - Espiao***\n\n***Nivel 30 - Guarda Real***\n\n***Nivel 40 - Duque / Duquesa***',
				footer: {
					text: 'https://discord.gg/tocadossuricatos',
				},
				author: {
					name: '@Toca dos Suricatos - Cargo por Level',
				},
			},
		],
	});
	await message.channel.send({
		embeds: [
			{
				image: {
					url: 'https://i.imgur.com/CQuU6yE.gif',
				},
			},
		],
	});
	await message.channel.send({
		embeds: [
			{
				url: 'https://discord.gg/tocadossuricatos',
				title: 'Vantagens',
				description:
					'*Nobre:*\n・*cargo personalizado + ícone*\n\n*Explorador:*\n・*cargo personalizado + ícone*\n\n*Assasino:*\n・*cargo personalizado + ícone*\n・*permissão para alterar apelido*\n\n*Espião:* \n・*cargo personalizado + ícone*\n・1,5x *a mais de xp na loritta*\n・*permissão para mandar arquivo/links no* <#1148200524122947635> \n\n*Guarda Real*\n・*cargo personalizado + ícone*\n・1,9x *a mais de xp na loritta*\n・*permissão para mandar arquivo/links no* <#1148200524122947635> \n・*enviar imagens no* <#1139269495567958066> \n\n*Duque/Duquesa*\n・*cargo personalizado + ícone*\n・2,5x *a mais de xp na loritta*\n・*permissão para mandar arquivo/links no* <#1148200524122947635> \n・*enviar imagens no* <#1139269495567958066>',
				footer: {
					text: 'https://discord.gg/tocadossuricatos',
				},
				author: {
					name: '@Toca dos Suricatos - Cargo por Level',
				},
			},
		],
	});
	await message.channel.send({
		embeds: [
			{
				image: {
					url: 'https://i.imgur.com/CQuU6yE.gif',
				},
			},
		],
	});
	message.delete();
};
