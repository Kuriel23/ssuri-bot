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
				title: '<a:re_rubyUTK:1138553903789645925> __TOCA DOS SURICATOS __ <a:re_rubyUTK:1138553903789645925>',
				description:
					'*_<:setavermelha:1138553377727459378> Seja bem-vindo(a) ao nosso servidor, nosso propósito é com a interação entre membros, seu entretenimento e sua diversão. Aqui você pode fazer amigos, parcerias e mais!_*\n\n***⊱─────────⊰ ♡ ⊱─────────⊰***\n\n***<a:Vseta:1138553325734854697> Sobre o servidor:***\n\n<:setavermelha:1138553377727459378>  Leia nossas regras para evitar quaisquer possíveis punições em: <#1134267677498691616>\n*<:setavermelha:1138553377727459378>Nosso chat para conversa entre membros: ⁠<#1134267677788094510>*\n*<:setavermelha:1138553377727459378> Gostaria de ajudar o servidor a crescer e ter benefícios maiores do que o restante dos membros? Passe em: ⁠<#1134267678027157602>*\n\n***─────────⊰ ♡ ⊱─────────***\n\n***<a:F_coracao:1138554379025268798> Gostou do nosso servidor e quer chamar alguém para conhecer também? Utilize o link abaixo;***\n \nhttps://discord.gg/tocadossuricatos\n\n*⁠⠂Caso tenha mais alguma dúvida ou quaisquer sugestões, chame um de nossos administradores. <:ajOGAhriCool:1134515709892886598>*',
				footer: {
					text: 'https://discord.gg/tocadossuricatos',
				},
				author: {
					name: '@Toca dos Suricatos - Apresentação',
				},
				image: {
					url: 'https://i.imgur.com/QQr5zM2.jpeg',
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
